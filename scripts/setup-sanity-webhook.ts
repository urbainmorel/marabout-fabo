import https from 'node:https';

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'f7gdk3pr';
const deployHookUrl = 'https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/4ed7cf54-8902-421e-9459-2f461cd9bf6c';

if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN in environment');
  process.exit(1);
}

const payload = JSON.stringify({
  type: 'document',
  name: 'Cloudflare Pages Auto Deploy',
  url: deployHookUrl,
  dataset: 'production',
  rule: {
    on: ['create', 'update', 'delete'],
    filter: '_type == "post"'
  },
  httpMethod: 'POST',
  apiVersion: 'v2021-06-07'
});

const options = {
  hostname: 'api.sanity.io',
  path: `/v2021-06-07/hooks/projects/${projectId}`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`DATA: ${data}`);
  });
});

req.on('error', err => console.error(err));
req.write(payload);
req.end();
