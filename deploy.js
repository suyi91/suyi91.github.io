require('dotenv').config();
const { execSync, exec } = require('child_process');

const GH_TOKEN = process.env.GH_TOKEN;

if (!GH_TOKEN) {
  console.error('Missing GH_TOKEN');
  process.exit(1);
}

execSync(`gh-pages -d dist -b master -r \"https://${GH_TOKEN}@github.com/suyi91/suyi91.github.io.git\" -m \"Auto-generated commit\"`)

