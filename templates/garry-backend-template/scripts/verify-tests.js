import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcRoot = path.join(root, 'src');
const testRoot = path.join(root, 'tests', 'src');

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
};

function expectedTestPath(srcFile) {
  const rel = path.relative(srcRoot, srcFile);
  const ext = path.extname(rel);
  const base = rel.slice(0, -ext.length);
  const testExt = ext === '.tsx' ? '.test.tsx' : '.test.ts';
  return path.join(testRoot, `${base}${testExt}`);
}

const srcFiles = walk(srcRoot)
  .filter((file) => file.endsWith('.ts') || file.endsWith('.tsx'))
  .filter((file) => !file.endsWith('.d.ts'));

const missing = srcFiles.filter((file) => !fs.existsSync(expectedTestPath(file)));

if (missing.length > 0) {
  console.error('Missing tests for src files:');
  for (const file of missing) console.error(`- ${path.relative(root, file)}`);
  process.exit(1);
}

console.log('Test structure OK');
