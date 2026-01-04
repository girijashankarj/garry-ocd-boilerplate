#!/usr/bin/env node

const minimist = require('minimist');
const { Select, Input, Confirm } = require('enquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

function parseArgs(args = process.argv.slice(2)) {
  const argv = minimist(args, {
    boolean: ['non-interactive', 'yes', 'dry-run'],
    string: ['name', 'type', 'path'],
    alias: { n: 'name', t: 'type', p: 'path' },
    default: { 'non-interactive': false },
  });
  return argv;
}

async function promptUser(interactive = true, argv = {}) {
  if (!interactive) {
    if (!argv.name || !argv.type) {
      throw new Error('When running non-interactive, --name and --type are required.');
    }
    return { name: argv.name, type: argv.type, path: argv.path };
  }

  const name = await Input.prompt({ name: 'name', message: 'Project name', initial: 'my-app' });
  const type = await new Select({
    name: 'type',
    message: 'Project type',
    choices: ['frontend', 'backend'],
  }).run();
  const defaultPath = path.resolve(process.cwd(), name);
  const projectPath = await Input.prompt({
    name: 'path',
    message: 'Project directory path',
    initial: defaultPath,
  });
  return { name, type, path: projectPath };
}

async function copyTemplate(outDir, templateName) {
  const templateDir = path.resolve(__dirname, '..', 'templates', templateName);
  await fs.copy(templateDir, outDir);
}

function detectPackageManager(targetDir) {
  // prefer lockfile detection when available
  if (fs.existsSync(path.join(targetDir, 'package-lock.json'))) return 'npm';
  if (fs.existsSync(path.join(targetDir, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(targetDir, 'pnpm-lock.yaml'))) return 'pnpm';
  // fallback to npm
  return 'npm';
}

function runInstall(targetDir, argv) {
  if (argv['dry-run']) {
    console.log(chalk.yellow('Skipping install due to --dry-run flag.'));
    return;
  }
  const pkgManager = detectPackageManager(targetDir);
  console.log(chalk.blue(`Running ${pkgManager} install in ${targetDir}`));
  const { spawnSync } = require('child_process');
  const cmd = pkgManager === 'npm' ? 'npm' : pkgManager;
  const cmdArgs = ['install'];
  const res = spawnSync(cmd, cmdArgs, { cwd: targetDir, stdio: 'inherit' });
  if (res.status !== 0) {
    console.error(chalk.red(`${cmd} install failed with status ${res.status}`));
    process.exit(res.status);
  }
}

async function showSummaryAndConfirm(targetDir, templateDir, argv) {
  const pkgPath = path.join(templateDir, 'package.json');
  const pkg = await fs.readJson(pkgPath);
  const deps = Object.keys(pkg.dependencies || {});
  const devDeps = Object.keys(pkg.devDependencies || {});

  console.log(chalk.cyan('\nScaffold summary'));
  console.log(chalk.cyan('Target path:'), targetDir);
  console.log(chalk.cyan('Template:'), path.basename(templateDir));
  console.log(chalk.cyan('Dependencies:'));
  deps.forEach((dep) => console.log(`  - ${dep}`));
  console.log(chalk.cyan('Dev dependencies:'));
  devDeps.forEach((dep) => console.log(`  - ${dep}`));
  console.log(chalk.cyan('Structure:'));
  [
    'config (theme/client/env JSON, no secrets)',
    'src/common (enums/types/constants/interfaces/messages/fileNames/operations)',
    'src/utils (loggerUtils/lodashUtils)',
    'src/components or src/apis (template-specific)',
    'tests/src mirrors src',
    'tests/mock (test-only data/factories)',
  ].forEach((line) => console.log(`  - ${line}`));
  console.log(chalk.cyan('Scripts:'));
  Object.keys(pkg.scripts || {}).forEach((script) => console.log(`  - ${script}`));

  if (argv['non-interactive'] || argv['yes']) {
    if (!argv.yes && !argv['dry-run']) {
      throw new Error('Use --yes to confirm scaffold in non-interactive mode.');
    }
    return true;
  }

  return Confirm.prompt({
    name: 'confirm',
    message: 'Proceed with project creation?',
    initial: true,
  });
}

async function runTests(targetDir, argv) {
  if (argv['dry-run']) return;
  const { spawnSync } = require('child_process');
  const res = spawnSync('npm', ['test', '--silent'], { cwd: targetDir, stdio: 'inherit' });
  if (res.status !== 0) {
    console.error(chalk.red('Tests failed.'));
    process.exit(res.status);
  }
}

async function main(overrides = {}) {
  console.log(chalk.green('\n🛠  garry-ocd-boilerplate — project initializer\n'));
  try {
    const parseArgsFn = overrides.parseArgs || parseArgs;
    const promptUserFn = overrides.promptUser || promptUser;
    const copyTemplateFn = overrides.copyTemplate || copyTemplate;
    const showSummaryAndConfirmFn = overrides.showSummaryAndConfirm || showSummaryAndConfirm;
    const runInstallFn = overrides.runInstall || runInstall;
    const runTestsFn = overrides.runTests || runTests;

    const argv = parseArgsFn();
    const interactive = !argv['non-interactive'] && !argv['yes'] && !argv.name;
    const answers = await promptUserFn(interactive, argv);
    const targetDir = answers.path
      ? path.resolve(process.cwd(), answers.path)
      : path.resolve(process.cwd(), answers.name);

    if (fs.existsSync(targetDir)) {
      console.error(chalk.red(`Target directory already exists: ${targetDir}`));
      process.exit(1);
    }

    const template =
      answers.type === 'frontend' ? 'garry-frontend-template' : 'garry-backend-template';
    const templateDir = path.resolve(__dirname, '..', 'templates', template);
    const confirmed = await showSummaryAndConfirmFn(targetDir, templateDir, argv);
    if (!confirmed) {
      console.log(chalk.yellow('Aborted by user.'));
      process.exit(0);
    }

    console.log(chalk.blue('Creating project at:'), targetDir);

    // Ensure output dir exists
    await fs.mkdirp(targetDir);

    await copyTemplateFn(targetDir, template);

    // update package.json
    const pkgPath = path.join(targetDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = await fs.readJson(pkgPath);
      const deps = pkg.dependencies || {};
      const devDeps = pkg.devDependencies || {};
      const { ['garry-ocd-boilerplate']: removedDep, ...cleanDeps } = deps;
      const { ['garry-ocd-boilerplate']: removedDev, ...cleanDevDeps } = devDeps;
      void removedDep;
      void removedDev;
      const nextPkg = {
        ...pkg,
        name: answers.name,
        private: true,
        dependencies: cleanDeps,
        devDependencies: cleanDevDeps,
      };

      await fs.writeJson(pkgPath, nextPkg, { spaces: 2 });
    }
    // Auto-install dependencies if requested
    const shouldInstall = argv.yes
      ? true
      : !argv['non-interactive'] &&
        (await Confirm.prompt({
          name: 'install',
          message: 'Run npm install and tests now?',
          initial: true,
        }));

    if (shouldInstall) {
      runInstallFn(targetDir, argv);
      await runTestsFn(targetDir, argv);
    } else if (fs.existsSync(path.join(targetDir, 'node_modules'))) {
      await runTestsFn(targetDir, argv);
    }
    console.log(chalk.green('\n✅ Project scaffolded successfully!'));
    console.log(
      chalk.yellow(`
Next steps:
  cd ${targetDir}
  npm install
  npm run dev (for frontend) or npm run start (for backend)
`)
    );
  } catch (err) {
    console.error(chalk.red('Failed to create project:'), err);
    process.exit(1);
  }
}

/* istanbul ignore next */
if (require.main === module) {
  main();
}

/* eslint-disable functional/immutable-data, immutable/no-mutation */
module.exports = {
  parseArgs,
  promptUser,
  copyTemplate,
  detectPackageManager,
  runInstall,
  showSummaryAndConfirm,
  runTests,
  main,
};
/* eslint-enable functional/immutable-data, immutable/no-mutation */
