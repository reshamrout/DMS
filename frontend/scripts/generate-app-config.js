const fs = require('fs');
const path = require('path');

const frontendRoot = path.resolve(__dirname, '..');
const envPath = path.join(frontendRoot, '.env');
const outputPath = path.join(frontendRoot, 'src', 'assets', 'app-config.json');

const defaults = {
  apiUrl: '/api',
};

function parseEnv(content) {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .reduce((acc, line) => {
      const equalIndex = line.indexOf('=');
      if (equalIndex === -1) return acc;

      const key = line.slice(0, equalIndex).trim();
      const value = line.slice(equalIndex + 1).trim().replace(/^['"]|['"]$/g, '');
      if (key) acc[key] = value;
      return acc;
    }, {});
}

function normalizeApiUrl(apiUrl) {
  return (apiUrl || defaults.apiUrl).replace(/\/+$/, '') || defaults.apiUrl;
}

let envVars = {};
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envVars = parseEnv(envContent);
}

const config = {
  apiUrl: normalizeApiUrl(
    process.env.FRONTEND_API_URL || envVars.FRONTEND_API_URL
  ),
};


fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(config, null, 2) + '\n', 'utf8');

console.log(`Generated ${outputPath} with apiUrl=${config.apiUrl}`);
