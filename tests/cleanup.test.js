const fs = require( 'fs-extra' );
const path = require( 'path' );
const { spawn } = require( 'child_process' );

describe( 'Generated project cleanup', () => {
    it( 'does not leave generator package in dependencies', async () => {
        const projName = 'tmp-cleanup-test';
        const outDir = path.resolve( process.cwd(), projName );
        if ( fs.existsSync( outDir ) ) await fs.remove( outDir );

        // Create a template copy and intentionally add garry-ocd-boilerplate to template package.json to simulate bad template
        const templatePkg = path.resolve( process.cwd(), 'templates/garry-frontend-template/package.json' );
        const original = await fs.readJson( templatePkg );
        const modified = { ...original, devDependencies: { ...( original.devDependencies || {} ), 'garry-ocd-boilerplate': '^0.0.0' } };
        await fs.writeJson( templatePkg, modified, { spaces: 2 } );

        const proc = spawn( 'node', ['./bin/cli.js'], { stdio: ['pipe', 'pipe', 'pipe'] } );
        proc.stdin.write( `${projName}\n` );
        proc.stdin.write( `frontend\n` );
        proc.stdin.write( `ESM\n` );
        proc.stdin.write( `${outDir}\n` );
        proc.stdin.write( `y\n` );
        proc.stdin.end();

        await new Promise( ( resolve, reject ) => {
            proc.on( 'close', async ( code ) => {
                try {
                    expect( code ).toBe( 0 );
                    const pkg = await fs.readJson( path.join( outDir, 'package.json' ) );
                    expect( pkg.devDependencies && pkg.devDependencies['garry-ocd-boilerplate'] ).toBeUndefined();
                    // cleanup
                    await fs.remove( outDir );
                    // restore template
                    await fs.writeJson( templatePkg, original, { spaces: 2 } );
                    resolve();
                } catch ( err ) {
                    // restore template
                    await fs.writeJson( templatePkg, original, { spaces: 2 } );
                    reject( err );
                }
            } );
        } );
    }, 20000 );
} );
