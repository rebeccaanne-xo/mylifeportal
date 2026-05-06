/**
 * REBECCA PORTAL — Cloudflare Worker
 * Real-time database using D1
 * Backs up all writes to Google Sheets automatically
 */

// Google Sheets backup URL
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbynyi3DsQZDwOHZg_Ue0HBdlMJtQ2BN4JeBPRMAW6vBBETAm_TuJNV48602D8snAQVJ/exec';

// CORS headers — allows your portal to talk to this Worker
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

export default {
  async fetch(request, env) {

    // Handle preflight CORS requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    const method = request.method;

    try {

      // ══ GET requests — read data from D1 ══
      if (method === 'GET') {
        const table = url.searchParams.get('table');
        const id = url.searchParams.get('id');
        const filter = url.searchParams.get('filter');
        const value = url.searchParams.get('value');

        if (!table) return json({ error: 'table parameter required' }, 400);

        // Validate table name to prevent SQL injection
        const validTables = ['tasks','habits','habit_log','people','person_notes','prayers',
          'appointments','priorities','faith','shopping','inventory','brain_dumps','daily_log',
          'exercise_log','goals','rewards','points_ledger','bills','reminders','money_owed',
          'notes','finance','seth','dogs','config','schedule_blocks','schedule_items','faith'];
        if (!validTables.includes(table)) {
          return json({ error: 'Invalid table: ' + table }, 400);
        }

        let query = 'SELECT * FROM ' + table;
        let params = [];

        if (id) {
          query += ' WHERE id = ?';
          params.push(id);
        } else if (filter && value) {
          query += ' WHERE ' + filter + ' = ?';
          params.push(value);
        }

        query += ' ORDER BY rowid DESC';

        const result = await env.DB.prepare(query).bind(...params).all();
        return json({ success: true, data: result.results, count: result.results.length });
      }

      // ══ POST requests — write to D1 + backup to Sheets ══
      if (method === 'POST') {
        const body = await request.json();
        const { action, table, data, id } = body;

        let d1Result = null;
        let sheetsBackup = null;

        switch (action) {

          case 'insert': {
            d1Result = await insertRow(env.DB, table, data);
            // Backup to Sheets — awaited so we know it happened
            sheetsBackup = await backupToSheets(data, table, 'insert', env);
            return json({ success: true, d1: true, sheets: sheetsBackup });
          }

          case 'update': {
            d1Result = await updateRow(env.DB, table, id, data);
            sheetsBackup = await backupToSheets({ ...data, id }, table, 'update', env);
            return json({ success: true, d1: true, sheets: sheetsBackup });
          }

          case 'delete': {
            await env.DB.prepare('DELETE FROM ' + table + ' WHERE id = ?').bind(id).run();
            sheetsBackup = await backupToSheets({ id }, table, 'delete', env);
            return json({ success: true, deleted: id, sheets: sheetsBackup });
          }

          case 'upsert': {
            // Handle tables with non-standard primary keys
            const pkField = (table === 'config') ? 'key' : 'id';
            const pkValue = data[pkField];

            if (!pkValue) {
              return json({ error: 'Missing primary key: ' + pkField }, 400);
            }

            // Get actual columns in this table to avoid inserting unknown columns
            let tableInfo;
            try {
              tableInfo = await env.DB.prepare(`PRAGMA table_info(${table})`).all();
            } catch(e) {
              tableInfo = { results: [] };
            }
            const validCols = tableInfo.results.map(col => col.name);

            // Filter data to only valid columns
            const filteredData = {};
            for (const [k, v] of Object.entries(data)) {
              if (validCols.length === 0 || validCols.includes(k)) {
                filteredData[k] = v;
              }
            }

            // Check if row exists
            let existing = null;
            try {
              existing = await env.DB.prepare(
                `SELECT ${pkField} FROM ${table} WHERE ${pkField} = ?`
              ).bind(pkValue).first();
            } catch(e) {}

            if (existing) {
              // Update — exclude pk field from SET clause
              const updateKeys = Object.keys(filteredData).filter(k => k !== pkField);
              if (updateKeys.length > 0) {
                const setClause = updateKeys.map(k => `${k} = ?`).join(', ');
                const values = updateKeys.map(k => filteredData[k]);
                const query = `UPDATE ${table} SET ${setClause} WHERE ${pkField} = ?`;
                d1Result = await env.DB.prepare(query).bind(...values, pkValue).run();
              }
              sheetsBackup = await backupToSheets(filteredData, table, 'update', env);
              return json({ success: true, action: 'updated', d1: true });
            } else {
              // Insert
              const insertKeys = Object.keys(filteredData);
              const placeholders = insertKeys.map(() => '?').join(', ');
              const values = insertKeys.map(k => filteredData[k]);
              const query = `INSERT INTO ${table} (${insertKeys.join(', ')}) VALUES (${placeholders})`;
              d1Result = await env.DB.prepare(query).bind(...values).run();
              sheetsBackup = await backupToSheets(filteredData, table, 'insert', env);
              return json({ success: true, action: 'inserted', d1: true });
            }
          }

          case 'bulk_insert': {
            const results = [];
            for (const row of data) {
              results.push(await insertRow(env.DB, table, row));
            }
            // Backup all rows to Sheets
            await backupToSheets({ rows: data, count: results.length }, table, 'bulk', env);
            return json({ success: true, count: results.length });
          }

          case 'backup': {
            // Direct Sheets backup call from portal
            sheetsBackup = await backupToSheets(data, table, 'direct', env);
            return json({ success: true, sheets: sheetsBackup });
          }

          default:
            return json({ error: 'Unknown action: ' + action }, 400);
        }
      }

      return json({ error: 'Method not allowed' }, 405);

    } catch (err) {
      console.error('Worker error:', err.message);
      return json({ error: err.message }, 500);
    }
  }
};

// ══ HELPER — Insert a row ══
async function insertRow(db, table, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');
  const cols = keys.join(', ');

  const query = `INSERT INTO ${table} (${cols}) VALUES (${placeholders})`;
  return await db.prepare(query).bind(...values).run();
}

// ══ HELPER — Update a row ══
async function updateRow(db, table, id, data, pkField) {
  pkField = pkField || 'id';
  const keys = Object.keys(data).filter(k => k !== 'id');
  const values = keys.map(k => data[k]);
  const setClause = keys.map(k => `${k} = ?`).join(', ');

  const query = `UPDATE ${table} SET ${setClause}, updated_at = datetime('now') WHERE id = ?`;
  return await db.prepare(query).bind(...values, id).run();
}

// ══ HELPER — Backup to Google Sheets ══
// Apps Script requires requests to follow redirects and accept the final response
// Cloudflare Workers can make these requests server-side without CORS issues
async function backupToSheets(data, table, operation, env) {
  const payload = {
    action: 'portalBackup',
    table,
    operation,
    data,
    timestamp: new Date().toISOString()
  };

  try {
    // Use redirect: 'follow' so Cloudflare follows Google's auth redirects
    const resp = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    // Google Apps Script returns 200 even for errors, check body
    const text = await resp.text();
    let result;
    try { result = JSON.parse(text); } catch(e) { result = { raw: text }; }

    if (resp.ok) {
      console.log('Sheets backup success for table:', table);
      return { success: true, result };
    } else {
      console.log('Sheets backup failed:', resp.status, text.substring(0, 100));
      return { success: false, status: resp.status };
    }
  } catch (e) {
    // Network error — D1 data is safe, Sheets is backup only
    console.log('Sheets backup network error:', e.message);
    return { success: false, error: e.message };
  }
}

// ══ HELPER — JSON response ══
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: CORS
  });
}
