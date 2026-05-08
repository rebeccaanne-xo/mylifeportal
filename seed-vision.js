const D1 = 'https://rebecca-portal-api.rebeccaannexo.workers.dev';

async function run(){
  const tasks = [
    {
      id: 'vis1',
      text: 'Write the vision document — land, community, what God\'s work looks like when it\'s real',
      section: 'vision',
      status: 'backlog',
      priority: 'high',
      priority_flag: '',
      done: 0,
      description: 'Not tasks and projects — the actual vision. What the land looks like, who is there, what a Tuesday morning feels like, what it means to the people who come through. This document lives in the portal and orients everything else back to the why.'
    },
    {
      id: 'vis2',
      text: 'Name the land + community project',
      section: 'vision',
      status: 'backlog',
      priority: 'med',
      priority_flag: '',
      done: 0,
      description: 'The community is for anyone — family, friends, people in transition, people who want to work the land. Mustard Seed feeds into it but the community is its own thing. Needs a name.'
    },
    {
      id: 'vis3',
      text: 'Research aging farmland stewardship arrangements',
      section: 'vision',
      status: 'backlog',
      priority: 'med',
      priority_flag: '',
      done: 0,
      description: 'Some landowners want people who will work and care for the land rather than sell. Research land trusts, stewardship agreements, lease-to-own arrangements, aging owners open to community caretakers.'
    },
    {
      id: 'vis4',
      text: 'Define first financial milestone toward land acquisition',
      section: 'vision',
      status: 'backlog',
      priority: 'med',
      priority_flag: '',
      done: 0,
      description: 'What does the number look like? Down payment, land cost in target areas, monthly carrying costs. GBB income feeds this directly.'
    },
    {
      id: 'vis5',
      text: 'Find AI + security person — equity or rev share, learning',
      section: 'vision',
      status: 'backlog',
      priority: 'med',
      priority_flag: '',
      done: 0,
      description: 'Someone learning AI who knows security. Works for equity or low cost while learning. Helps keep infrastructure secure and self-hosted. Discord, GitHub, local colleges, WTC community.'
    },
    {
      id: 'vis6',
      text: 'Build vision section in portal — the why behind everything',
      section: 'vision',
      status: 'backlog',
      priority: 'med',
      priority_flag: '',
      done: 0,
      description: 'A dedicated section in the portal that holds the vision document. AI knows this context and orients everything back to it when helping Rebecca prioritize.'
    },
    {
      id: 'vis7',
      text: 'Research self-hosted infrastructure — first server purchase',
      section: 'vision',
      status: 'backlog',
      priority: 'low',
      priority_flag: '',
      done: 0,
      description: 'Intel NUC or mini PC ~$500. Self-host Gitea, n8n, Nextcloud. Own the stack, stop paying subscriptions. Phase 1 of infrastructure independence.'
    },
    {
      id: 'vis8',
      text: 'Map all subscription costs — identify what can be self-hosted',
      section: 'vision',
      status: 'backlog',
      priority: 'med',
      priority_flag: '',
      done: 0,
      description: 'Audit every subscription. Flag what can be replaced with self-hosted open source. Build toward subscription freedom.'
    }
  ];

  for(const t of tasks){
    const r = await fetch(D1, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({action: 'upsert', table: 'tasks', data: t})
    });
    const j = await r.json();
    console.log('✓', t.id, t.text.slice(0,40), j.action||j.error||'');
  }
  localStorage.removeItem('pb_tasks');
  console.log('✅ Vision project seeded — reloading...');
  setTimeout(()=>location.reload(), 800);
}

run().catch(console.error);
