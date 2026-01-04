const fs = require( 'fs-extra' );
const path = require( 'path' );
const { spawnSync } = require( 'child_process' );

describe( 'CLI flags', () => {
    it( 'applies tailwind and redux flags to generated project', async () => {
        const projName = 'tmp-flags-test';
        const outDir = path.resolve( process.cwd(), projName );
        if ( fs.existsSync( outDir ) ) await fs.remove( outDir );

        const args = [
            'bin/cli.js',
            '--non-interactive',
            '--name', projName,
            '--type', 'frontend',
            '--module', 'ESM',
            '--yes',
            '--dry-run',
            '--css', 'tailwind',
            '--redux',
            '--favicon', 'flaticon'
        ];
        const res = spawnSync( 'node', args, { stdio: 'inherit' } );
        expect( res.status ).toBe( 0 );
        expect( fs.existsSync( outDir ) ).toBe( true );

        const pkg = await fs.readJson( path.join( outDir, 'package.json' ) );
        expect( ( pkg.devDependencies || {} )['tailwindcss'] ).toBeDefined();
        expect( ( pkg.dependencies || {} )['@reduxjs/toolkit'] ).toBeDefined();

        // favicon should be replaced
        const fav = path.join( outDir, 'public', 'favicon.svg' );
        expect( fs.existsSync( fav ) ).toBe( true );

        await fs.remove( outDir );
    }, 30000 );

    it( 'applies sequelize db flag to backend project', async () => {
        const projName = 'tmp-db-flags-test';
        const outDir = path.resolve( process.cwd(), projName );
        if ( fs.existsSync( outDir ) ) await fs.remove( outDir );

        const args = [
            'bin/cli.js',
            '--non-interactive',
            '--name', projName,
            '--type', 'backend',
            '--module', 'ESM',
            '--yes',
            '--dry-run',
            '--db', 'sequelize'
        ];
        const res = spawnSync( 'node', args, { stdio: 'inherit' } );
        expect( res.status ).toBe( 0 );
        expect( fs.existsSync( outDir ) ).toBe( true );

        const pkg = await fs.readJson( path.join( outDir, 'package.json' ) );
        expect( ( pkg.dependencies || {} )['sqlite3'] ).toBeDefined();
        expect( ( pkg.scripts || {} )['db:sync'] ).toBeDefined();
        expect( ( pkg.scripts || {} )['db:seed'] ).toBeDefined();

        // files present
        expect( fs.existsSync( path.join( outDir, 'src', 'db', 'index.ts' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'src', 'models', 'user.ts' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'scripts', 'db', 'sync.ts' ) ) ).toBe( true );

        await fs.remove( outDir );
    }, 30000 );
} );
