const { execSync } = require('child_process');

function getStagedFiles() {
  const out = execSync('git diff --cached --name-only', { encoding: 'utf8' });
  return out
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

const files = getStagedFiles();
const hasChangeset = files.some((file) => file.startsWith('.changeset/') && file.endsWith('.md'));

if (!hasChangeset) {
  console.error('Missing changeset file. Run `npx changeset` and stage the file before commit.');
  process.exit(1);
}
