import https from 'node:https';

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'f7gdk3pr';

if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN in environment');
  process.exit(1);
}

const originsToAdd = [
  'https://www.marabout-fabo.com',
  'https://marabout-fabo.com',
  'https://marabout-fabo.pages.dev',
];

function addCorsOrigin(origin: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      origin,
      allowCredentials: true,
    });

    const options = {
      hostname: 'api.sanity.io',
      path: `/v2021-06-07/projects/${projectId}/cors`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log(`Ajout des origines CORS pour le projet ${projectId}...`);
  for (const origin of originsToAdd) {
    try {
      const res = await addCorsOrigin(origin);
      console.log(`Origine ${origin} -> Status: ${res.status}`, res.data);
    } catch (err) {
      console.error(`Erreur sur ${origin}:`, err);
    }
  }
}

run();
