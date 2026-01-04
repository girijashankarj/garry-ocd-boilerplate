const fs = require( 'fs-extra' );
const path = require( 'path' );
const { spawnSync } = require( 'child_process' );

describe( 'CLI auto-install', () => {
    it( 'runs in dry-run mode and skips install', async () => {
        const projName = 'tmp-autoinstall-dry';
        const outDir = path.resolve( process.cwd(), projName );
        if ( fs.existsSync( outDir ) ) await fs.remove( outDir );

        const args = [
            'bin/cli.js',
            '--non-interactive',
            '--name', projName,
            '--type', 'frontend',
            '--module', 'ESM',
            '--yes',
            '--dry-run'
        ];
        const res = spawnSync( 'node', args, { encoding: 'utf8' } );
        // Process should succeed
        expect( res.status ).toBe( 0 );
        expect( fs.existsSync( outDir ) ).toBe( true );

        // node_modules should not exist due to dry-run
        expect( fs.existsSync( path.join( outDir, 'node_modules' ) ) ).toBe( false );

        // cleanup
        await fs.remove( outDir );
    }, 30000 );

    it( 'runs backend dry-run mode and skips install', async () => {
        const projName = 'tmp-autoinstall-dry-back';
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
        const res = spawnSync( 'node', args, { encoding: 'utf8' } );
        // Process should succeed
        expect( res.status ).toBe( 0 );
        expect( fs.existsSync( outDir ) ).toBe( true );

        // node_modules should not exist due to dry-run
        expect( fs.existsSync( path.join( outDir, 'node_modules' ) ) ).toBe( false );

        // cleanup
        await fs.remove( outDir );
    }, 30000 );
} );
