#!/usr/bin/env node

const { Select, Input, Confirm } = require('enquirer');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function promptUser() {
  const name = await Input.prompt({
    name: 'name',
    message: 'Project name',
    initial: 'my-app',
  });
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

function runInstall(targetDir) {
  console.log(chalk.blue(`Running npm install in ${targetDir}`));
  const { spawnSync } = require('child_process');
  const res = spawnSync('npm', ['install'], { cwd: targetDir, stdio: 'inherit' });
  if (res.status !== 0) {
    console.error(chalk.red(`npm install failed with status ${res.status}`));
    process.exit(res.status);
  }
}

async function showSummaryAndConfirm(targetDir, templateDir) {
  const pkgPath = path.join(templateDir, 'package.json');
  const pkg = await fs.readJson(pkgPath);
  const deps = Object.keys(pkg.dependencies || {}).sort();
  const devDeps = Object.keys(pkg.devDependencies || {}).sort();
  const scripts = Object.keys(pkg.scripts || {}).sort();

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
  scripts.forEach((script) => console.log(`  - ${script}`));

  return Confirm.prompt({
    name: 'confirm',
    message: 'Proceed with project creation?',
    initial: true,
  });
}

async function runTests(targetDir) {
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
    const promptUserFn = overrides.promptUser || promptUser;
    const copyTemplateFn = overrides.copyTemplate || copyTemplate;
    const showSummaryAndConfirmFn = overrides.showSummaryAndConfirm || showSummaryAndConfirm;
    const runInstallFn = overrides.runInstall || runInstall;
    const runTestsFn = overrides.runTests || runTests;

    const answers = await promptUserFn();
    const targetDir = path.resolve(process.cwd(), answers.path || answers.name);

    if (fs.existsSync(targetDir)) {
      console.error(chalk.red(`Target directory already exists: ${targetDir}`));
      process.exit(1);
    }

    const template =
      answers.type === 'frontend' ? 'garry-frontend-template' : 'garry-backend-template';
    const templateDir = path.resolve(__dirname, '..', 'templates', template);
    const confirmed = await showSummaryAndConfirmFn(targetDir, templateDir);
    if (!confirmed) {
      console.log(chalk.yellow('Aborted by user.'));
      process.exit(0);
    }

    console.log(chalk.blue('Creating project at:'), targetDir);

    await fs.mkdirp(targetDir);
    await copyTemplateFn(targetDir, template);

    const pkgPath = path.join(targetDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = await fs.readJson(pkgPath);
      const deps = pkg.dependencies || {};
      const devDeps = pkg.devDependencies || {};
      const cleanDeps = Object.fromEntries(
        Object.entries(deps).filter(([name]) => name !== 'garry-ocd-boilerplate')
      );
      const cleanDevDeps = Object.fromEntries(
        Object.entries(devDeps).filter(([name]) => name !== 'garry-ocd-boilerplate')
      );
      const nextPkg = {
        ...pkg,
        name: answers.name,
        private: true,
        dependencies: cleanDeps,
        devDependencies: cleanDevDeps,
      };

      await fs.writeJson(pkgPath, nextPkg, { spaces: 2 });
    }

    const shouldInstall = await Confirm.prompt({
      name: 'install',
      message: 'Run npm install and tests now?',
      initial: true,
    });

    if (shouldInstall) {
      runInstallFn(targetDir);
      await runTestsFn(targetDir);
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

module.exports = {
  promptUser,
  copyTemplate,
  showSummaryAndConfirm,
  runInstall,
  runTests,
  main,
};
