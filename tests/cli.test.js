/* eslint-env jest */
const fs = require('fs-extra');
const path = require('path');

function tmpDir(name) {
  return path.resolve(process.cwd(), 'tmp', name);
}

async function ensureCleanDir(outDir) {
  const root = path.dirname(outDir);
  await fs.mkdirp(root);
  if (fs.existsSync(outDir)) {
    await fs.remove(outDir);
  }
}

function loadCliWithMocks({
  selectRuns = [],
  inputPrompts = [],
  confirmPrompts = [true],
  spawnStatus = 0,
} = {}) {
  let selectIndex = 0;
  let inputIndex = 0;
  let confirmIndex = 0;

  jest.resetModules();
  jest.doMock('enquirer', () => {
    return {
      Select: jest.fn(() => ({
        run: jest.fn(() => Promise.resolve(selectRuns[selectIndex++])),
      })),
      Input: {
        prompt: jest.fn(() => Promise.resolve(inputPrompts[inputIndex++])),
      },
      Confirm: {
        prompt: jest.fn(() => Promise.resolve(confirmPrompts[confirmIndex++])),
      },
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

  it('promptUser uses enquirer prompts', async () => {
    const { cli, enquirer } = loadCliWithMocks({
      selectRuns: ['frontend'],
      inputPrompts: ['my-app', '/tmp/my-app'],
    });

    const res = await cli.promptUser();
    expect(res).toEqual({ name: 'my-app', type: 'frontend', path: '/tmp/my-app' });
    expect(enquirer.Input.prompt).toHaveBeenCalledTimes(2);
    expect(enquirer.Select).toHaveBeenCalledTimes(1);
  });

  it('showSummaryAndConfirm reads template package.json and confirms', async () => {
    const { cli } = loadCliWithMocks({ confirmPrompts: [true] });
    const template = tmpDir('summary-template');
    await fs.mkdirp(template);
    await fs.writeJson(path.join(template, 'package.json'), {
      dependencies: { lodash: '^1.0.0' },
      devDependencies: { jest: '^1.0.0' },
      scripts: { lint: 'eslint .', test: 'jest' },
    });

    const res = await cli.showSummaryAndConfirm('/target', template);
    expect(res).toBe(true);
  });

  it('runInstall exits on failure', () => {
    const { cli, childProcess } = loadCliWithMocks({ spawnStatus: 1 });
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });

    expect(() => cli.runInstall('/tmp')).toThrow('exit');
    expect(childProcess.spawnSync).toHaveBeenCalled();
    exitSpy.mockRestore();
  });

  it('runTests exits on failure', async () => {
    const { cli } = loadCliWithMocks({ spawnStatus: 1 });
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });

    await expect(cli.runTests('/tmp')).rejects.toThrow('exit');
    exitSpy.mockRestore();
  });

  it('main creates frontend project and updates package.json', async () => {
    const { cli } = loadCliWithMocks({ confirmPrompts: [true, false] });
    const target = tmpDir('main-frontend');
    const promptUser = async () => ({ name: 'main-frontend', type: 'frontend', path: target });
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
      promptUser,
      showSummaryAndConfirm,
      copyTemplate,
      runInstall,
      runTests,
    });

    const pkg = await fs.readJson(path.join(target, 'package.json'));
    expect(pkg.name).toBe('main-frontend');
    expect(pkg.dependencies['garry-ocd-boilerplate']).toBeUndefined();
  });

  it('main creates backend project with real template copy', async () => {
    const { cli } = loadCliWithMocks({ confirmPrompts: [true, false] });
    const target = tmpDir('main-backend');
    const promptUser = async () => ({ name: 'main-backend', type: 'backend', path: target });
    const showSummaryAndConfirm = async () => true;
    const runInstall = () => {};
    const runTests = async () => {};

    await cli.main({
      promptUser,
      showSummaryAndConfirm,
      runInstall,
      runTests,
    });

    expect(fs.existsSync(path.join(target, 'src', 'apis', 'routes.ts'))).toBe(true);
    expect(
      fs.existsSync(
        path.join(target, 'src', 'apis', 'handlers', 'get-user', 'schema', 'requestSchema.json')
      )
    ).toBe(true);
  });

  it('main exits when target dir exists', async () => {
    const { cli } = loadCliWithMocks({ confirmPrompts: [true] });
    const target = tmpDir('main-existing');
    await fs.mkdirp(target);

    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });

    const promptUser = async () => ({ name: 'main-existing', type: 'frontend', path: target });

    await expect(cli.main({ promptUser })).rejects.toThrow('exit');
    exitSpy.mockRestore();
  });

  it('main aborts when user rejects confirmation', async () => {
    const { cli } = loadCliWithMocks({ confirmPrompts: [false] });
    const target = tmpDir('main-abort');
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('exit');
    });

    const promptUser = async () => ({ name: 'main-abort', type: 'frontend', path: target });
    const showSummaryAndConfirm = async () => false;

    await expect(cli.main({ promptUser, showSummaryAndConfirm })).rejects.toThrow('exit');
    exitSpy.mockRestore();
  });
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
