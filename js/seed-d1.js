// ════════════════════════════════════════════════════════
// REBECCA PORTAL — D1 SEED SCRIPT
// Run this in your browser console at mylifeportal.pages.dev
// Or save as seed-d1.html and open locally
// Seeds all data directly into D1
// ════════════════════════════════════════════════════════

const D1 = 'https://rebecca-portal-api.rebeccaannexo.workers.dev';

async function save(table, data) {
  if (!data.id) data.id = String(Date.now() + Math.random());
  const resp = await fetch(D1, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'upsert', table, data })
  });
  return resp.json();
}

async function seedAll() {
  console.log('🌱 Starting D1 seed...');
  await seedPeople();
  await seedHabits();
  await seedFaith();
  await seedGoals();
  await seedRewards();
  await seedTasks();
  await seedConfig();
  console.log('✅ D1 seed complete!');
}

async function seedPeople() {
  const people = [
    { id: '1', name: 'Seth Peralta', role: 'Husband · common-law · home + life partner', color: '#C2738A', praying: 1, notes: 'Common-law husband · Uber Black driver · 9 months sober from kratom · recovering · finding his way', city: 'Allen', state: 'TX', contact_frequency: 'Daily' },
    { id: '2', name: 'Olivia', role: 'Best friend · Mustard Seed Ministries founder · first year of widowhood', color: '#4A7C6F', praying: 1, notes: 'First year of widowhood · lost her husband · founding Mustard Seed · handle with care · her vision · her anchor', state: 'WA', contact_frequency: 'Weekly' },
    { id: '3', name: 'Cindy', role: 'Friend · co-supporting Olivia on Mustard Seed', color: '#4A7C6F', praying: 0, notes: 'Co-supporting Olivia alongside Rebecca on Mustard Seed Ministries', contact_frequency: 'Monthly' },
    { id: '4', name: 'Kelly', role: 'GBB client · Graphic Arts Print Shop · Missouri', color: '#2D6B6B', praying: 0, notes: 'First GBB client · Facebook only · landing page in progress · waiting to hear back', instagram: '@graphicartsprintshop', facebook: 'Graphic Arts Print Shop', state: 'MO', contact_frequency: 'Weekly' },
  ];
  for (const p of people) await save('people', p);
  console.log('✓ People seeded:', people.length);
}

async function seedHabits() {
  const habits = [
    { id: '1', name: 'Morning walk', emoji: '🚶', freq: 'daily', points: 5, double_points: 0, streak: 0, last_done: '' },
    { id: '2', name: 'Pelvic floor exercises', emoji: '💪', freq: 'daily', points: 10, double_points: 0, streak: 0, last_done: '' },
    { id: '3', name: 'Stretching / mobility', emoji: '🧘', freq: 'daily', points: 5, double_points: 0, streak: 0, last_done: '' },
    { id: '4', name: 'Bible reading', emoji: '📖', freq: 'daily', points: 5, double_points: 0, streak: 0, last_done: '' },
    { id: '5', name: 'Prayer time', emoji: '🙏', freq: 'daily', points: 5, double_points: 0, streak: 0, last_done: '' },
    { id: '6', name: 'Self-care routine', emoji: '✨', freq: 'daily', points: 5, double_points: 0, streak: 0, last_done: '' },
    { id: '7', name: 'Income-generating task', emoji: '💼', freq: 'daily', points: 10, double_points: 1, streak: 0, last_done: '' },
    { id: '8', name: 'Drink enough water', emoji: '💧', freq: 'daily', points: 3, double_points: 0, streak: 0, last_done: '' },
    { id: '9', name: 'Hiking', emoji: '🥾', freq: 'weekly', points: 15, double_points: 0, streak: 0, last_done: '' },
    { id: '10', name: 'Core workout', emoji: '🏋️', freq: 'daily', points: 8, double_points: 0, streak: 0, last_done: '' },
    { id: '11', name: 'Brain dump / journal', emoji: '🧠', freq: 'daily', points: 3, double_points: 0, streak: 0, last_done: '' },
    { id: '12', name: 'Check portal + set priorities', emoji: '📋', freq: 'daily', points: 3, double_points: 0, streak: 0, last_done: '' },
  ];
  for (const h of habits) await save('habits', h);
  console.log('✓ Habits seeded:', habits.length);
}

async function seedFaith() {
  const faith = [
    // Praying for others
    { id: 'f1', type: 'praying_for', text: 'Olivia — first year of widowhood · peace · wisdom for Mustard Seed · that she feels held', status: 'active' },
    { id: 'f2', type: 'praying_for', text: 'Seth — continued sobriety · 9 months in · healing from trauma · clarity on his calling', status: 'active' },
    { id: 'f3', type: 'praying_for', text: 'Fynnlea — that she knows her father loves her · protection from parental alienation', status: 'active' },
    { id: 'f4', type: 'praying_for', text: 'Provision — income · domain · tools · everything needed to build what God placed on my heart', status: 'active' },
    { id: 'f5', type: 'praying_for', text: 'Kelly — GBB client · that her business grows · that this partnership bears fruit', status: 'active' },
    // For myself
    { id: 'f10', type: 'for_myself', text: 'Clarity on next steps · courage to keep going when it feels slow', status: 'active' },
    { id: 'f11', type: 'for_myself', text: 'Physical healing — pelvic floor · energy · body that carries me well', status: 'active' },
    { id: 'f12', type: 'for_myself', text: 'Wisdom on common-law marriage — what honoring God looks like in this season', status: 'active' },
    { id: 'f13', type: 'for_myself', text: 'ADHD — focus · follow-through · grace for myself · systems that work with my brain', status: 'active' },
    { id: 'f14', type: 'for_myself', text: 'Zero income season — peace · trust · knowing this is a season not a sentence', status: 'active' },
    // Answered
    { id: 'f20', type: 'answered', text: 'Articles of Incorporation filed for Mustard Seed — God opened that door for Olivia', status: 'answered' },
    { id: 'f21', type: 'answered', text: 'Seth — 9 months sober. The version of him who hurt me is not who he is. God is doing something real.', status: 'answered' },
    { id: 'f22', type: 'answered', text: 'GBB first client — Kelly found her way to me. Something is moving.', status: 'answered' },
    // Gratitude
    { id: 'f30', type: 'gratitude', text: 'Bruno · Lavender · Shadow — faithful companions through every hard season', status: 'active' },
    { id: 'f31', type: 'gratitude', text: 'The ability to build something from nothing — the skills · the vision · the tools', status: 'active' },
    { id: 'f32', type: 'gratitude', text: 'Olivia — the kind of friendship that tells you the truth and stays anyway', status: 'active' },
    { id: 'f33', type: 'gratitude', text: 'Every tool that exists to help me build — Claude · Cloudflare · GitHub · Google', status: 'active' },
    // Scripture
    { id: 'f40', type: 'scripture', text: 'For I know the plans I have for you — plans to prosper you and not to harm you, plans to give you hope and a future.', reference: 'Jeremiah 29:11 NLT', status: 'active' },
    { id: 'f41', type: 'scripture', text: 'She is clothed with strength and dignity, and she laughs without fear of the future.', reference: 'Proverbs 31:25 NLT', status: 'active' },
    { id: 'f42', type: 'scripture', text: 'And I am certain that God, who began the good work within you, will continue his work until it is finally finished.', reference: 'Philippians 1:6 NLT', status: 'active' },
    { id: 'f43', type: 'scripture', text: 'For God has not given us a spirit of fear and timidity, but of power, love, and self-discipline.', reference: '2 Timothy 1:7 NLT', status: 'active' },
    { id: 'f44', type: 'scripture', text: 'Now all glory to God, who is able to accomplish infinitely more than we might ask or think.', reference: 'Ephesians 3:20 NLT', status: 'active' },
  ];
  for (const f of faith) await save('faith', f);
  console.log('✓ Faith seeded:', faith.length);
}

async function seedGoals() {
  const goals = [
    // Monthly
    { id: 'g1', text: 'Get first paying GBB client', period: 'monthly', done: 0, points_earned: 0 },
    { id: 'g2', text: 'Complete Aligned Life Q2 merge and make available for sale', period: 'monthly', done: 0, points_earned: 0 },
    { id: 'g3', text: 'Register getbookednbranded.com domain', period: 'monthly', done: 0, points_earned: 0 },
    { id: 'g4', text: 'Set up Cloudflare Zero Trust on mylifeportal.pages.dev', period: 'monthly', done: 0, points_earned: 0 },
    { id: 'g5', text: 'Get Anthropic API key connected to brain dump processor', period: 'monthly', done: 0, points_earned: 0 },
    { id: 'g6', text: 'Send at least 10 GBB prospect snapshots', period: 'monthly', done: 0, points_earned: 0 },
    { id: 'g7', text: 'Complete Galatians series through chapter 6', period: 'monthly', done: 0, points_earned: 0 },
    // Weekly
    { id: 'g20', text: 'Pelvic floor exercises 5 days this week', period: 'weekly', done: 0, points_earned: 0 },
    { id: 'g21', text: 'Go on at least one hike', period: 'weekly', done: 0, points_earned: 0 },
    { id: 'g22', text: 'Send at least 3 GBB prospect outreach messages', period: 'weekly', done: 0, points_earned: 0 },
    { id: 'g23', text: 'Check in with Olivia', period: 'weekly', done: 0, points_earned: 0 },
    { id: 'g24', text: 'Update project board with weekly progress', period: 'weekly', done: 0, points_earned: 0 },
    // Daily
    { id: 'g30', text: 'Morning walk', period: 'daily', done: 0, points_earned: 0 },
    { id: 'g31', text: 'At least one income-generating task', period: 'daily', done: 0, points_earned: 0 },
    { id: 'g32', text: 'Bible reading and prayer', period: 'daily', done: 0, points_earned: 0 },
    { id: 'g33', text: 'Drink enough water', period: 'daily', done: 0, points_earned: 0 },
    { id: 'g34', text: 'Pelvic floor exercises', period: 'daily', done: 0, points_earned: 0 },
    { id: 'g35', text: 'Open portal and set 3 priorities', period: 'daily', done: 0, points_earned: 0 },
  ];
  for (const g of goals) await save('goals', g);
  console.log('✓ Goals seeded:', goals.length);
}

async function seedRewards() {
  const rewards = [
    { id: 'r1', name: 'Steam mop', points_required: 500, redeemed: 0 },
    { id: 'r2', name: 'New hiking shoes', points_required: 750, redeemed: 0 },
    { id: 'r3', name: 'A full day off — no building, no tasks, just rest', points_required: 300, redeemed: 0 },
    { id: 'r4', name: 'Nice dinner with Seth', points_required: 400, redeemed: 0 },
    { id: 'r5', name: 'Something special for the dogs', points_required: 200, redeemed: 0 },
    { id: 'r6', name: 'A hike somewhere new', points_required: 600, redeemed: 0 },
    { id: 'r7', name: 'New journal or planner supplies', points_required: 250, redeemed: 0 },
  ];
  for (const r of rewards) await save('rewards', r);
  console.log('✓ Rewards seeded:', rewards.length);
}

async function seedTasks() {
  const tasks = [
    // GBB
    { id: 't1', text: 'Complete Kelly welcome landing page', section: 'business', done: 0, priority: 'high' },
    { id: 't2', text: 'Formalize GBB offer structure + pricing', section: 'business', done: 0, priority: 'high' },
    { id: 't3', text: 'Build public GBB website', section: 'business', done: 0, priority: 'high' },
    { id: 't4', text: 'Register getbookednbranded.com domain at Cloudflare (~$9-10)', section: 'business', done: 0, priority: 'high' },
    { id: 't5', text: 'Connect Google Places API key to prospecting audit tool', section: 'business', done: 0, priority: 'high' },
    { id: 't6', text: 'Set up GBB admin portal repo + Cloudflare Pages', section: 'business', done: 0, priority: 'med' },
    { id: 't7', text: 'Get Anthropic API key (~$5) for brain dump processor', section: 'business', done: 0, priority: 'high' },
    // WTC
    { id: 't20', text: 'Set up Supabase project for WTC backend', section: 'mission_wtc', done: 0, priority: 'high' },
    { id: 't21', text: 'Convert WTC to PWA — manifest.json + service worker', section: 'mission_wtc', done: 0, priority: 'high' },
    { id: 't22', text: 'Build WTC user auth — email + Google login via Supabase', section: 'mission_wtc', done: 0, priority: 'high' },
    { id: 't23', text: 'Build WTC admin panel', section: 'mission_wtc', done: 0, priority: 'high' },
    { id: 't24', text: 'Complete Galatians Ch 4 pages + discussion questions', section: 'mission_wtc', done: 0, priority: 'high' },
    { id: 't25', text: 'Complete Galatians Ch 5 pages + discussion questions', section: 'mission_wtc', done: 0, priority: 'high' },
    { id: 't26', text: 'Complete Galatians Ch 6 pages + discussion questions', section: 'mission_wtc', done: 0, priority: 'high' },
    // Aligned Life
    { id: 't30', text: '"What God Says About You" section → Workbook Part 1', section: 'mission_aligned', done: 0, priority: 'high' },
    { id: 't31', text: 'Values / True Aim / Anti-Vision → Life Plan (Aligned_Life.odt)', section: 'mission_aligned', done: 0, priority: 'high' },
    { id: 't32', text: 'Merge Q2 files → master PDF + separate daily pages PDF', section: 'mission_aligned', done: 0, priority: 'high' },
    { id: 't33', text: 'GoHighLevel setup + 3 business emails (hold trial until assets ready)', section: 'mission_aligned', done: 0, priority: 'high' },
    { id: 't34', text: 'Rebuild Life Wheel in correct pillar colors', section: 'mission_aligned', done: 0, priority: 'med' },
    // Mustard Seed
    { id: 't40', text: 'Articles of Incorporation filed — WA SOS ✓', section: 'mission_mustard', done: 1, priority: 'high' },
    { id: 't41', text: '501c3 filing — Washington State', section: 'mission_mustard', done: 0, priority: 'high' },
    { id: 't42', text: 'Set up donation acceptance', section: 'mission_mustard', done: 0, priority: 'high' },
    { id: 't43', text: 'Write mission statement + founding documents', section: 'mission_mustard', done: 0, priority: 'high' },
    // Portal
    { id: 't50', text: 'Set up Cloudflare Zero Trust on mylifeportal.pages.dev', section: 'portal', done: 0, priority: 'high' },
    { id: 't51', text: 'Connect WTC app to portal Faith tab', section: 'portal', done: 0, priority: 'med' },
    { id: 't52', text: 'Connect GBB admin to portal Business tab', section: 'portal', done: 0, priority: 'med' },
    { id: 't53', text: 'Build Morning Alignment Agent', section: 'portal', done: 0, priority: 'med' },
    { id: 't54', text: 'Connect Google Calendar API to appointments', section: 'portal', done: 0, priority: 'med' },
  ];
  for (const t of tasks) await save('tasks', t);
  console.log('✓ Tasks seeded:', tasks.length);
}

async function seedConfig() {
  const config = [
    { key: 'portal_version', value: '2.0' },
    { key: 'owner', value: 'Rebecca Holka' },
    { key: 'legal_entity', value: 'Rebecca Holka LLC · Florida' },
    { key: 'location', value: 'Allen, Texas' },
    { key: 'business_email', value: 'rebeccaannexo@gmail.com' },
    { key: 'github', value: 'rebeccaanne-xo' },
    { key: 'portal_url', value: 'https://mylifeportal.pages.dev' },
    { key: 'gbb_url', value: 'https://getbookednbranded.pages.dev' },
    { key: 'wtc_url', value: 'https://wethechurch.pages.dev' },
    { key: 'sheets_id', value: '1hsUIV99MoU9p8fAoZiX4igf8oxpQmwGXJPF0JFj_eTg' },
    { key: 'd1_database_id', value: '10cd4914-4514-403c-9a1d-d76fc60399c9' },
  ];
  for (const c of config) {
    await fetch(D1, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'upsert', table: 'config', data: c })
    });
  }
  console.log('✓ Config seeded:', config.length);
}

// Run it
seedAll().catch(console.error);
