/* eslint-env jest */
const fs = require('fs-extra');
const path = require('path');
const { spawnSync, spawn } = require('child_process');

function tmpDir(name) {
  return path.resolve(process.cwd(), 'tmp', name);
}

async function ensureCleanDir(outDir) {
  const root = path.dirname(outDir);
  await fs.mkdirp(root);
  if (fs.existsSync(outDir)) await fs.remove(outDir);
}

async function runCli(args, options = {}) {
  const res = spawnSync('node', ['bin/cli.js', ...args], {
    stdio: 'ignore',
    ...options,
  });
  return res;
}

function loadCliWithMocks({
  selectRuns = [],
  inputPrompts = [],
  confirmPrompt = true,
  spawnStatus = 0,
}) {
  let selectIndex = 0;
  let inputIndex = 0;
  jest.resetModules();
  jest.doMock('enquirer', () => {
    return {
      Select: jest.fn(() => ({
        run: jest.fn(() => Promise.resolve(selectRuns[selectIndex++])),
      })),
      Input: {
        prompt: jest.fn(() => Promise.resolve(inputPrompts[inputIndex++])),
      },
      Confirm: { prompt: jest.fn(() => Promise.resolve(confirmPrompt)) },
    };
  });
  jest.doMock('child_process', () => ({
    spawnSync: jest.fn(() => ({ status: spawnStatus })),
  }));

  let cli;
  jest.isolateModules(() => {
    cli = require('../bin/cli');
  });

  const enquirer = require('enquirer');
  const childProcess = require('child_process');
  return { cli, enquirer, childProcess };
}

describe('CLI unit functions', () => {
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(async () => {
    await fs.remove(path.resolve(process.cwd(), 'tmp'));
    logSpy.mockRestore();
    errorSpy.mockRestore();
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('parseArgs reads argv defaults and values', () => {
    const { cli } = loadCliWithMocks({});
    const argv = cli.parseArgs([
      '--name',
      'app',
      '--type',
      'frontend',
      '--path',
      '/tmp/app',
      '--non-interactive',
    ]);

    expect(argv.name).toBe('app');
    expect(argv.type).toBe('frontend');
    expect(argv.path).toBe('/tmp/app');
    expect(argv['non-interactive']).toBe(true);
  });

  it('promptUser returns non-interactive input', async () => {
    const { cli } = loadCliWithMocks({});
    const res = await cli.promptUser(false, { name: 'app', type: 'frontend', path: '/x' });
    expect(res).toEqual({ name: 'app', type: 'frontend', path: '/x' });
  });

  it('promptUser throws when non-interactive missing args', async () => {
    const { cli } = loadCliWithMocks({});
    await expect(cli.promptUser(false, { name: 'app' })).rejects.toThrow('non-interactive');
  });

  it('promptUser interactive uses enquirer prompts', async () => {
    const { cli } = loadCliWithMocks({
      selectRuns: ['frontend'],
      inputPrompts: ['my-app', '/tmp/my-app'],
    });

    const res = await cli.promptUser(true, {});
    expect(res).toEqual({ name: 'my-app', type: 'frontend', path: '/tmp/my-app' });
  });

  it('detectPackageManager returns based on lockfile', async () => {
    const { cli } = loadCliWithMocks({});
    const base = tmpDir('lock-detect');
    await fs.mkdirp(base);
    await fs.writeFile(path.join(base, 'package-lock.json'), '');
    expect(cli.detectPackageManager(base)).toBe('npm');

    await fs.remove(path.join(base, 'package-lock.json'));
    await fs.writeFile(path.join(base, 'yarn.lock'), '');
    expect(cli.detectPackageManager(base)).toBe('yarn');

    await fs.remove(path.join(base, 'yarn.lock'));
    await fs.writeFile(path.join(base, 'pnpm-lock.yaml'), '');
    expect(cli.detectPackageManager(base)).toBe('pnpm');
  });

  it('copyTemplate copies template contents', async () => {
    const { cli } = loadCliWithMocks({});
    const outDir = tmpDir('copy-template');
    await cli.copyTemplate(outDir, 'garry-frontend-template');
    expect(await fs.pathExists(path.join(outDir, 'package.json'))).toBe(true);
  });

  it('runInstall runs install and exits on failure', () => {
    const { cli, childProcess } = loadCliWithMocks({ spawnStatus: 1 });
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });

    expect(() => cli.runInstall('/tmp', { 'dry-run': false })).toThrow('exit');
    expect(childProcess.spawnSync).toHaveBeenCalled();
    exitSpy.mockRestore();
  });

  it('runInstall skips when dry-run is set', () => {
    const { cli, childProcess } = loadCliWithMocks({});
    cli.runInstall('/tmp', { 'dry-run': true });
    expect(childProcess.spawnSync).not.toHaveBeenCalled();
  });

  it('showSummaryAndConfirm returns true when --yes', async () => {
    const { cli } = loadCliWithMocks({});
    const template = tmpDir('summary-template');
    await fs.mkdirp(template);
    await fs.writeJson(path.join(template, 'package.json'), {
      dependencies: { lodash: '^1.0.0' },
      devDependencies: { jest: '^1.0.0' },
      scripts: { lint: 'eslint .', test: 'jest' },
    });

    const res = await cli.showSummaryAndConfirm('/target', template, {
      yes: true,
      'non-interactive': true,
    });
    expect(res).toBe(true);
  });

  it('showSummaryAndConfirm throws when non-interactive without --yes', async () => {
    const { cli } = loadCliWithMocks({});
    const template = tmpDir('summary-template-2');
    await fs.mkdirp(template);
    await fs.writeJson(path.join(template, 'package.json'), {
      dependencies: {},
      devDependencies: {},
      scripts: {},
    });

    await expect(
      cli.showSummaryAndConfirm('/target', template, { 'non-interactive': true })
    ).rejects.toThrow('Use --yes');
  });

  it('showSummaryAndConfirm uses Confirm for interactive flow', async () => {
    const { cli } = loadCliWithMocks({ confirmPrompt: true });
    const template = tmpDir('summary-template-3');
    await fs.mkdirp(template);
    await fs.writeJson(path.join(template, 'package.json'), {
      dependencies: {},
      devDependencies: {},
      scripts: {},
    });

    const res = await cli.showSummaryAndConfirm('/target', template, {});
    expect(res).toBe(true);
  });

  it('runTests skips when dry-run is set', async () => {
    const { cli, childProcess } = loadCliWithMocks({});
    await cli.runTests('/tmp', { 'dry-run': true });
    expect(childProcess.spawnSync).not.toHaveBeenCalled();
  });

  it('runTests exits on failure', async () => {
    const { cli } = loadCliWithMocks({ spawnStatus: 1 });
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });

    await expect(cli.runTests('/tmp', { 'dry-run': false })).rejects.toThrow('exit');
    exitSpy.mockRestore();
  });

  it('main creates project and updates package.json', async () => {
    const { cli } = loadCliWithMocks({});
    const target = tmpDir('main-project');
    const parseArgs = () => ({ name: 'main-project', type: 'frontend', yes: true, path: target });
    const promptUser = async () => ({ name: 'main-project', type: 'frontend', path: target });
    const showSummaryAndConfirm = async () => true;
    const copyTemplate = async (outDir) => {
      await fs.mkdirp(outDir);
      await fs.writeJson(path.join(outDir, 'package.json'), {
        name: 'template',
        dependencies: { 'garry-ocd-boilerplate': '^1.0.0' },
        devDependencies: { 'garry-ocd-boilerplate': '^1.0.0' },
      });
    };
    const runInstall = () => {};
    const runTests = async () => {};

    await cli.main({
      parseArgs,
      promptUser,
      showSummaryAndConfirm,
      copyTemplate,
      runInstall,
      runTests,
    });

    const pkg = await fs.readJson(path.join(target, 'package.json'));
    expect(pkg.name).toBe('main-project');
    expect(pkg.dependencies['garry-ocd-boilerplate']).toBeUndefined();
  });

  it('main exits when target dir exists', async () => {
    const { cli } = loadCliWithMocks({});
    const target = tmpDir('main-existing');
    await fs.mkdirp(target);

    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });

    const parseArgs = () => ({ name: 'main-existing', type: 'frontend', yes: true, path: target });
    const promptUser = async () => ({ name: 'main-existing', type: 'frontend', path: target });

    await expect(cli.main({ parseArgs, promptUser })).rejects.toThrow('exit');
    exitSpy.mockRestore();
  });

  it('main aborts when user rejects confirmation', async () => {
    const { cli } = loadCliWithMocks({});
    const target = tmpDir('main-abort');
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });

    const parseArgs = () => ({ name: 'main-abort', type: 'frontend', yes: false, path: target });
    const promptUser = async () => ({ name: 'main-abort', type: 'frontend', path: target });
    const showSummaryAndConfirm = async () => false;

    await expect(cli.main({ parseArgs, promptUser, showSummaryAndConfirm })).rejects.toThrow(
      'exit'
    );
    exitSpy.mockRestore();
  });

  it('main runs tests when install is skipped and node_modules exists', async () => {
    const { cli } = loadCliWithMocks({ confirmPrompt: false });
    const target = tmpDir('main-node-modules');
    await fs.remove(target);

    const parseArgs = () => ({ name: 'main-node-modules', type: 'frontend', path: target });
    const promptUser = async () => ({ name: 'main-node-modules', type: 'frontend', path: target });
    const showSummaryAndConfirm = async () => true;
    const copyTemplate = async (outDir) => {
      await fs.mkdirp(outDir);
      await fs.mkdirp(path.join(outDir, 'node_modules'));
      await fs.writeJson(path.join(outDir, 'package.json'), { name: 'x' });
    };
    const runInstall = () => {
      throw new Error('runInstall should not be called');
    };
    const runTests = jest.fn(async () => {});

    await cli.main({
      parseArgs,
      promptUser,
      showSummaryAndConfirm,
      copyTemplate,
      runInstall,
      runTests,
    });

    expect(runTests).toHaveBeenCalled();
  });
});

describe('CLI integration flows', () => {
  afterEach(async () => {
    await fs.remove(path.resolve(process.cwd(), 'tmp'));
  });

  it('creates a project folder', async () => {
    const projName = 'tmp-test-project';
    const outDir = tmpDir(projName);
    await ensureCleanDir(outDir);

    const args = [
      '--non-interactive',
      '--name',
      projName,
      '--type',
      'frontend',
      '--yes',
      '--dry-run',
      '--path',
      outDir,
    ];
    const res = spawn('node', ['bin/cli.js', ...args], { stdio: 'ignore' });

    await new Promise((resolve, reject) => {
      res.on('close', (code) => {
        try {
          expect(code).toBe(0);
          expect(fs.existsSync(outDir)).toBe(true);
          fs.removeSync(outDir);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  }, 20000);

  it('creates frontend test hierarchy and verify script', async () => {
    const projName = 'tmp-front-struct';
    const outDir = tmpDir(projName);
    await ensureCleanDir(outDir);

    const res = await runCli([
      '--non-interactive',
      '--name',
      projName,
      '--type',
      'frontend',
      '--yes',
      '--dry-run',
      '--path',
      outDir,
    ]);

    expect(res.status).toBe(0);
    expect(fs.existsSync(outDir)).toBe(true);

    expect(fs.existsSync(path.join(outDir, 'tests', 'src', 'App.test.tsx'))).toBe(true);
    expect(
      fs.existsSync(path.join(outDir, 'tests', 'src', 'common', 'messages', 'info.test.ts'))
    ).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'tests', 'mock', 'index.ts'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'scripts', 'verify-tests.js'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'config', 'theme.json'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'config', 'client.json'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'config', 'env.json'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'docs', 'PROJECT-DOCS.md'))).toBe(true);
  }, 60000);

  it('creates backend structure and api pattern', async () => {
    const projName = 'tmp-back-struct';
    const outDir = tmpDir(projName);
    await ensureCleanDir(outDir);

    const res = await runCli([
      '--non-interactive',
      '--name',
      projName,
      '--type',
      'backend',
      '--yes',
      '--dry-run',
      '--path',
      outDir,
    ]);

    expect(res.status).toBe(0);
    expect(fs.existsSync(outDir)).toBe(true);

    expect(fs.existsSync(path.join(outDir, 'src', 'common', 'enums', 'index.ts'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'src', 'common', 'index.ts'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'src', 'common', 'messages', 'index.ts'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'src', 'utils', 'loggerUtils.ts'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'src', 'utils', 'lodashUtils.ts'))).toBe(true);

    expect(fs.existsSync(path.join(outDir, 'src', 'apis', 'users', 'handlers', 'getUser.ts'))).toBe(
      true
    );
    expect(fs.existsSync(path.join(outDir, 'src', 'apis', 'users', 'logic.ts'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'src', 'apis', 'users', 'sql.ts'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'src', 'apis', 'withWrap.ts'))).toBe(true);

    expect(fs.existsSync(path.join(outDir, 'scripts', 'inject-badge.js'))).toBe(true);

    expect(fs.existsSync(path.join(outDir, 'tests', 'src', 'apis', 'users', 'logic.test.ts'))).toBe(
      true
    );
    expect(fs.existsSync(path.join(outDir, 'tests', 'mock', 'index.ts'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'scripts', 'verify-tests.js'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'docs', 'PROJECT-DOCS.md'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'config', 'theme.json'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'config', 'client.json'))).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'config', 'env.json'))).toBe(true);
  }, 60000);

  it('runs in dry-run mode and skips install (frontend)', async () => {
    const projName = 'tmp-autoinstall-dry';
    const outDir = tmpDir(projName);
    await ensureCleanDir(outDir);

    const res = await runCli(
      [
        '--non-interactive',
        '--name',
        projName,
        '--type',
        'frontend',
        '--yes',
        '--dry-run',
        '--path',
        outDir,
      ],
      { encoding: 'utf8' }
    );

    expect(res.status).toBe(0);
    expect(fs.existsSync(outDir)).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'node_modules'))).toBe(false);
  }, 30000);

  it('runs in dry-run mode and skips install (backend)', async () => {
    const projName = 'tmp-autoinstall-dry-back';
    const outDir = tmpDir(projName);
    await ensureCleanDir(outDir);

    const res = await runCli(
      [
        '--non-interactive',
        '--name',
        projName,
        '--type',
        'backend',
        '--yes',
        '--dry-run',
        '--path',
        outDir,
      ],
      { encoding: 'utf8' }
    );

    expect(res.status).toBe(0);
    expect(fs.existsSync(outDir)).toBe(true);
    expect(fs.existsSync(path.join(outDir, 'node_modules'))).toBe(false);
  }, 30000);

  it('creates a project folder using non-interactive flags', async () => {
    const projName = 'tmp-noninteractive-test';
    const outDir = tmpDir(projName);
    await ensureCleanDir(outDir);

    const res = await runCli([
      '--non-interactive',
      '--name',
      projName,
      '--type',
      'frontend',
      '--yes',
      '--dry-run',
      '--path',
      outDir,
    ]);

    expect(res.status).toBe(0);
    expect(fs.existsSync(outDir)).toBe(true);
  }, 20000);

  it('does not leave generator package in dependencies', async () => {
    const projName = 'tmp-cleanup-test';
    const outDir = tmpDir(projName);
    await ensureCleanDir(outDir);

    const templatePkg = path.resolve(
      process.cwd(),
      'templates/garry-frontend-template/package.json'
    );
    const original = await fs.readJson(templatePkg);
    const modified = {
      ...original,
      devDependencies: { ...(original.devDependencies || {}), 'garry-ocd-boilerplate': '^0.0.0' },
    };
    await fs.writeJson(templatePkg, modified, { spaces: 2 });

    const res = await runCli([
      '--non-interactive',
      '--name',
      projName,
      '--type',
      'frontend',
      '--yes',
      '--dry-run',
      '--path',
      outDir,
    ]);

    expect(res.status).toBe(0);
    const pkg = await fs.readJson(path.join(outDir, 'package.json'));
    expect(pkg.devDependencies && pkg.devDependencies['garry-ocd-boilerplate']).toBeUndefined();

    await fs.writeJson(templatePkg, original, { spaces: 2 });
  }, 20000);
});

describe('precommit scripts', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('ensure-changeset exits when missing changeset', () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });
    jest.spyOn(console, 'error').mockImplementation(() => {});

    jest.doMock('child_process', () => ({
      execSync: jest.fn(() => 'src/index.ts\n'),
    }));

    expect(() => {
      jest.isolateModules(() => {
        require('../scripts/precommit/ensure-changeset');
      });
    }).toThrow('exit');

    exitSpy.mockRestore();
  });

  it('ensure-changeset passes when changeset staged', () => {
    jest.doMock('child_process', () => ({
      execSync: jest.fn(() => '.changeset/test.md\n'),
    }));

    expect(() => {
      jest.isolateModules(() => {
        require('../scripts/precommit/ensure-changeset');
      });
    }).not.toThrow();
  });

  it('validate-branch exits on invalid branch name', () => {
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });
    jest.spyOn(console, 'error').mockImplementation(() => {});

    jest.doMock('child_process', () => ({
      execSync: jest.fn(() => 'bad-branch\n'),
    }));

    expect(() => {
      jest.isolateModules(() => {
        require('../scripts/precommit/validate-branch');
      });
    }).toThrow('exit');

    exitSpy.mockRestore();
  });

  it('validate-branch passes for allowed branch', () => {
    jest.doMock('child_process', () => ({
      execSync: jest.fn(() => 'feature/test\n'),
    }));

    expect(() => {
      jest.isolateModules(() => {
        require('../scripts/precommit/validate-branch');
      });
    }).not.toThrow();
  });
});
