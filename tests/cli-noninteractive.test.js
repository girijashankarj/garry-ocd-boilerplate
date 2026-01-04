const fs = require( 'fs-extra' );
const path = require( 'path' );
const { spawnSync } = require( 'child_process' );

describe( 'CLI non-interactive', () => {
    it( 'creates a project folder using flags', async () => {
        const projName = 'tmp-noninteractive-test';
        const outDir = path.resolve( process.cwd(), projName );
        if ( fs.existsSync( outDir ) ) await fs.remove( outDir );

        const args = ['bin/cli.js', '--non-interactive', '--name', projName, '--type', 'frontend', '--module', 'ESM', '--yes', '--dry-run'];
        const res = spawnSync( 'node', args, { stdio: 'inherit' } );
        expect( res.status ).toBe( 0 );
        expect( fs.existsSync( outDir ) ).toBe( true );
        await fs.remove( outDir );
    }, 20000 );
} );
