const fs = require( 'fs-extra' );
const path = require( 'path' );
const { spawnSync } = require( 'child_process' );

describe( 'CLI presets', () => {
    it( 'applies frontend-full preset to generated project', async () => {
        const projName = 'tmp-preset-front';
        const outDir = path.resolve( process.cwd(), projName );
        if ( fs.existsSync( outDir ) ) await fs.remove( outDir );

        const args = [
            'bin/cli.js',
            '--non-interactive',
            '--name', projName,
            '--preset', 'frontend-full',
            '--module', 'ESM',
            '--yes',
            '--dry-run'
        ];
        const res = spawnSync( 'node', args, { stdio: 'inherit' } );
        expect( res.status ).toBe( 0 );
        expect( fs.existsSync( outDir ) ).toBe( true );

        const pkg = await fs.readJson( path.join( outDir, 'package.json' ) );
        expect( ( pkg.devDependencies || {} )['tailwindcss'] ).toBeDefined();
        expect( ( pkg.dependencies || {} )['@reduxjs/toolkit'] ).toBeDefined();
        // lottie example file should exist in template
        expect( fs.existsSync( path.join( outDir, 'src', 'components', 'LottieExample.tsx' ) ) ).toBe( true );

        await fs.remove( outDir );
    }, 30000 );

    it( 'applies backend-db preset to generated project', async () => {
        const projName = 'tmp-preset-back';
        const outDir = path.resolve( process.cwd(), projName );
        if ( fs.existsSync( outDir ) ) await fs.remove( outDir );

        const args = [
            'bin/cli.js',
            '--non-interactive',
            '--name', projName,
            '--preset', 'backend-db',
            '--module', 'ESM',
            '--yes',
            '--dry-run'
        ];
        const res = spawnSync( 'node', args, { stdio: 'inherit' } );
        expect( res.status ).toBe( 0 );
        expect( fs.existsSync( outDir ) ).toBe( true );

        const pkg = await fs.readJson( path.join( outDir, 'package.json' ) );
        expect( ( pkg.dependencies || {} )['sqlite3'] ).toBeDefined();
        expect( ( pkg.scripts || {} )['db:sync'] ).toBeDefined();

        // files present
        expect( fs.existsSync( path.join( outDir, 'src', 'db', 'index.ts' ) ) ).toBe( true );

        await fs.remove( outDir );
    }, 30000 );

} );
