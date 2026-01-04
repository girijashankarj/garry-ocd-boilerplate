#!/usr/bin/env node

const minimist = require( 'minimist' );
const { Select, Input, Confirm } = require( 'enquirer' );
const fs = require( 'fs-extra' );
const path = require( 'path' );
const chalk = require( 'chalk' );

function parseArgs() {
    const argv = minimist( process.argv.slice( 2 ), {
        boolean: ['non-interactive', 'yes', 'git', 'lottie', 'redux', 'dry-run'],
        string: ['name', 'type', 'module', 'favicon', 'css', 'db', 'preset', 'path'],
        alias: { n: 'name', t: 'type', m: 'module' },
        default: { 'non-interactive': false }
    } );
    return argv;
}

function applyPreset( argv ) {
    if ( !argv.preset ) return;
    const p = argv.preset;
    if ( p === 'frontend-full' ) {
        argv.type = argv.type || 'frontend';
        argv.css = argv.css || 'tailwind';
        argv.redux = true;
        argv.lottie = true;
    } else if ( p === 'backend-db' ) {
        argv.type = argv.type || 'backend';
        argv.db = argv.db || 'sequelize';
    } else {
        throw new Error( 'Unknown preset: ' + p );
    }
}

async function promptUser( interactive = true, argv = {} ) {
    if ( !interactive ) {
        if ( !argv.name || !argv.type ) {
            throw new Error( 'When running non-interactive, --name and --type are required.' );
        }
        return { name: argv.name, type: argv.type, module: argv.module || 'ESM', path: argv.path };
    }

    const name = await Input.prompt( { name: 'name', message: 'Project name', initial: 'my-app' } );
    const type = await new Select( { name: 'type', message: 'Project type', choices: ['frontend', 'backend'] } ).run();
    const module = await new Select( { name: 'module', message: 'Module system', choices: ['CJS', 'ESM'] } ).run();
    const defaultPath = path.resolve( process.cwd(), name );
    const projectPath = await Input.prompt( { name: 'path', message: 'Project directory path', initial: defaultPath } );
    return { name, type, module, path: projectPath };
}

async function copyTemplate( outDir, templateName ) {
    const templateDir = path.resolve( __dirname, '..', 'templates', templateName );
    await fs.copy( templateDir, outDir );
}

function detectPackageManager( targetDir ) {
    // prefer lockfile detection when available
    if ( fs.existsSync( path.join( targetDir, 'package-lock.json' ) ) ) return 'npm';
    if ( fs.existsSync( path.join( targetDir, 'yarn.lock' ) ) ) return 'yarn';
    if ( fs.existsSync( path.join( targetDir, 'pnpm-lock.yaml' ) ) ) return 'pnpm';
    // fallback to npm
    return 'npm';
}

function runInstall( targetDir, argv ) {
    if ( argv['dry-run'] ) {
        console.log( chalk.yellow( 'Skipping install due to --dry-run flag.' ) );
        return;
    }
    const pkgManager = detectPackageManager( targetDir );
    console.log( chalk.blue( `Running ${pkgManager} install in ${targetDir}` ) );
    const { spawnSync } = require( 'child_process' );
    const cmd = pkgManager === 'npm' ? 'npm' : pkgManager;
    const cmdArgs = ['install'];
    const res = spawnSync( cmd, cmdArgs, { cwd: targetDir, stdio: 'inherit' } );
    if ( res.status !== 0 ) {
        console.error( chalk.red( `${cmd} install failed with status ${res.status}` ) );
        process.exit( res.status );
    }
}

async function showSummaryAndConfirm( targetDir, templateDir, argv ) {
    const pkgPath = path.join( templateDir, 'package.json' );
    const pkg = await fs.readJson( pkgPath );
    const deps = Object.keys( pkg.dependencies || {} ).sort();
    const devDeps = Object.keys( pkg.devDependencies || {} ).sort();

    console.log( chalk.cyan( '\nScaffold summary' ) );
    console.log( chalk.cyan( 'Target path:' ), targetDir );
    console.log( chalk.cyan( 'Template:' ), path.basename( templateDir ) );
    console.log( chalk.cyan( 'Dependencies:' ) );
    deps.forEach( ( dep ) => console.log( `  - ${dep}` ) );
    console.log( chalk.cyan( 'Dev dependencies:' ) );
    devDeps.forEach( ( dep ) => console.log( `  - ${dep}` ) );
    console.log( chalk.cyan( 'Structure:' ) );
    [
        'config (theme/client/env JSON, no secrets)',
        'src/common (enums/types/constants/interfaces/messages/fileNames/operations)',
        'src/utils (loggerUtils/lodashUtils)',
        'src/components or src/apis (template-specific)',
        'tests/src mirrors src',
        'tests/mock (test-only data/factories)'
    ].forEach( ( line ) => console.log( `  - ${line}` ) );

    if ( argv['non-interactive'] || argv['yes'] ) {
        if ( !argv.yes && !argv['dry-run'] ) {
            throw new Error( 'Use --yes to confirm scaffold in non-interactive mode.' );
        }
        return true;
    }

    return Confirm.prompt( { name: 'confirm', message: 'Proceed with project creation?', initial: true } );
}

async function runTests( targetDir, argv ) {
    if ( argv['dry-run'] ) return;
    const { spawnSync } = require( 'child_process' );
    const res = spawnSync( 'npm', ['test', '--silent'], { cwd: targetDir, stdio: 'inherit' } );
    if ( res.status !== 0 ) {
        console.error( chalk.red( 'Tests failed.' ) );
        process.exit( res.status );
    }
}

( async function main() {
    console.log( chalk.green( '\n🛠  garry-ocd-boilerplate — project initializer\n' ) );
    try {
        const argv = parseArgs();
        applyPreset( argv );
        const interactive = !argv['non-interactive'] && !argv['yes'] && !argv.name;
        const answers = await promptUser( interactive, argv );
        const targetDir = answers.path
            ? path.resolve( process.cwd(), answers.path )
            : path.resolve( process.cwd(), answers.name );

        if ( fs.existsSync( targetDir ) ) {
            console.error( chalk.red( `Target directory already exists: ${targetDir}` ) );
            process.exit( 1 );
        }

        const template = answers.type === 'frontend' ? 'garry-frontend-template' : 'garry-backend-template';
        const templateDir = path.resolve( __dirname, '..', 'templates', template );
        const confirmed = await showSummaryAndConfirm( targetDir, templateDir, argv );
        if ( !confirmed ) {
            console.log( chalk.yellow( 'Aborted by user.' ) );
            process.exit( 0 );
        }

        console.log( chalk.blue( 'Creating project at:' ), targetDir );

        // Ensure output dir exists
        await fs.mkdirp( targetDir );

        await copyTemplate( targetDir, template );
        // Apply feature flags: css, redux, db, favicon
        await applyFlagsToProject( targetDir, argv, template );

        async function applyFlagsToProject( targetDir, argv, template ) {
            const pkgPath = path.join( targetDir, 'package.json' );
            if ( !fs.existsSync( pkgPath ) ) return;

            const pkg = await fs.readJson( pkgPath );

            // CSS frameworks
            const css = argv.css || null; // tailwind | bulma
            if ( css === 'tailwind' ) {
                pkg.devDependencies = pkg.devDependencies || {};
                pkg.devDependencies['tailwindcss'] = '^4.0.0';
                pkg.devDependencies['postcss'] = '^8.0.0';
                pkg.devDependencies['autoprefixer'] = '^10.0.0';
                // add basic tailwind config
                await fs.writeFile( path.join( targetDir, 'tailwind.config.cjs' ), "module.exports = { content: ['./src/**/*.{html,js,ts,tsx}'], theme: { extend: {} }, plugins: [] }\n" );
                await fs.writeFile( path.join( targetDir, 'postcss.config.cjs' ), "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }\n" );
                // prepend tailwind base to styles.css
                const stylesPath = path.join( targetDir, 'src', 'styles.css' );
                if ( fs.existsSync( stylesPath ) ) {
                    const existing = await fs.readFile( stylesPath, 'utf8' );
                    const newContent = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${existing}`;
                    await fs.writeFile( stylesPath, newContent );
                }
            } else if ( css === 'bulma' ) {
                pkg.dependencies = pkg.dependencies || {};
                pkg.dependencies['bulma'] = '^0.9.0';
                const stylesPath = path.join( targetDir, 'src', 'styles.css' );
                if ( fs.existsSync( stylesPath ) ) {
                    const newContent = `@import 'bulma/css/bulma.css';\n\n` + ( await fs.readFile( stylesPath, 'utf8' ) );
                    await fs.writeFile( stylesPath, newContent );
                }
            }

            // Redux
            if ( argv.redux ) {
                pkg.dependencies = pkg.dependencies || {};
                pkg.dependencies['@reduxjs/toolkit'] = '^2.11.2';
                pkg.dependencies['react-redux'] = '^8.0.0';
                // add sample store file
                const storePath = path.join( targetDir, 'src', 'store' );
                await fs.mkdirp( storePath );
                const storeFile = `import { configureStore } from '@reduxjs/toolkit';\nexport default configureStore({ reducer: {} });\n`;
                await fs.writeFile( path.join( storePath, 'index.ts' ), storeFile );
            }

            // Database
            if ( argv.db === 'sequelize' ) {
                pkg.dependencies = pkg.dependencies || {};
                pkg.dependencies['sequelize'] = pkg.dependencies['sequelize'] || '^6.32.1';
                pkg.dependencies['sqlite3'] = pkg.dependencies['sqlite3'] || '^5.1.6';
                pkg.devDependencies = pkg.devDependencies || {};
                pkg.devDependencies['ts-node'] = pkg.devDependencies['ts-node'] || '^10.9.1';
                pkg.scripts = pkg.scripts || {};
                pkg.scripts['db:sync'] = pkg.scripts['db:sync'] || 'ts-node ./scripts/db/sync.ts';
                pkg.scripts['db:seed'] = pkg.scripts['db:seed'] || 'ts-node ./scripts/db/seed.ts';
            }

            // Favicon selection
            if ( argv.favicon === 'flaticon' ) {
                // copy alternative favicon if exists in templates
                const alt = path.resolve( __dirname, '..', 'templates', template, 'public', 'favicon-flaticon.svg' );
                if ( fs.existsSync( alt ) ) {
                    await fs.copy( alt, path.join( targetDir, 'public', 'favicon.svg' ) );
                }
            }

            await fs.writeJson( pkgPath, pkg, { spaces: 2 } );
        }

        // update package.json
        const pkgPath = path.join( targetDir, 'package.json' );
        if ( fs.existsSync( pkgPath ) ) {
            const pkg = await fs.readJson( pkgPath );
            // Basic updates
            pkg.name = answers.name;
            pkg.private = true;
            pkg.type = answers.module === 'CJS' ? 'commonjs' : 'module';

            // CLEANUP: Remove any reference to the generator package so the generated project does not keep the scaffold as a dependency
            if ( pkg.dependencies && pkg.dependencies['garry-ocd-boilerplate'] ) {
                delete pkg.dependencies['garry-ocd-boilerplate'];
            }
            if ( pkg.devDependencies && pkg.devDependencies['garry-ocd-boilerplate'] ) {
                delete pkg.devDependencies['garry-ocd-boilerplate'];
            }

            await fs.writeJson( pkgPath, pkg, { spaces: 2 } );
        }
        // Auto-install dependencies if requested
        let ranInstall = false;
        if ( argv.yes ) {
            runInstall( targetDir, argv );
            await runTests( targetDir, argv );
            ranInstall = true;
        } else if ( !argv['non-interactive'] ) {
            const shouldInstall = await Confirm.prompt( {
                name: 'install',
                message: 'Run npm install and tests now?',
                initial: true
            } );
            if ( shouldInstall ) {
                runInstall( targetDir, argv );
                await runTests( targetDir, argv );
                ranInstall = true;
            }
        }

        if ( !ranInstall && fs.existsSync( path.join( targetDir, 'node_modules' ) ) ) {
            await runTests( targetDir, argv );
        }
        console.log( chalk.green( '\n✅ Project scaffolded successfully!' ) );
        console.log( chalk.yellow( `
Next steps:
  cd ${targetDir}
  npm install
  npm run dev (for frontend) or npm run start (for backend)
`) );
    } catch ( err ) {
        console.error( chalk.red( 'Failed to create project:' ), err );
        process.exit( 1 );
    }
} )();
