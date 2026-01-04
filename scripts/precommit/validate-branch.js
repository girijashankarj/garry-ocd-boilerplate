const { execSync } = require('child_process');

function currentBranch() {
  const out = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' });
  return out.trim();
}

const branch = currentBranch();
const allowed =
  branch === 'main' ||
  branch === 'qa' ||
  branch === 'develop' ||
  /^feature\/.+/.test(branch) ||
  /^fix\/.+/.test(branch) ||
  /^hotfix\/.+/.test(branch) ||
  /^release\/[0-9]{2}-[0-9]{2}-[0-9]{4}.*/.test(branch);

if (!allowed) {
  console.error(`Invalid branch name: ${branch}`);
  console.error('Allowed: main, qa, develop, feature/*, fix/*, hotfix/*, release/DD-MM-YYYY');
  process.exit(1);
}
