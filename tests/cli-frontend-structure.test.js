const fs = require('fs-extra');
const path = require('path');
const { spawnSync } = require('child_process');

describe('Frontend scaffold structure', () => {
  it('creates tests/src hierarchy and verify script', async () => {
    const projName = 'tmp-front-struct';
    const outDir = path.resolve(process.cwd(), projName);
    if (fs.existsSync(outDir)) await fs.remove(outDir);

    const args = ['bin/cli.js', '--non-interactive', '--name', projName, '--type', 'frontend', '--module', 'ESM', '--yes', '--dry-run'];
    const res = spawnSync('node', args, { stdio: 'inherit' });
    expect(res.status).toBe(0);
    expect(fs.existsSync(outDir)).toBe(true);

    expect(fs.existsSync(path.join(outDir, 'tests', 'src', 'App.test.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'tests', 'src', 'common', 'messages', 'info.test.ts'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'tests', 'mock', 'index.ts'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'scripts', 'verify-tests.js'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'config', 'theme.json'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'config', 'client.json'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'config', 'env.json'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'docs', 'PROJECT-DOCS.md'))).toBe(true);

    await fs.remove(outDir);
  }, 60000);
});
