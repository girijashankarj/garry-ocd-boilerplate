const fs = require( 'fs-extra' );
const path = require( 'path' );
const { spawn } = require( 'child_process' );

describe( 'CLI basic flow', () => {
    it( 'creates a project folder', async () => {
        const projName = 'tmp-test-project';
        const outDir = path.resolve( process.cwd(), projName );
        if ( fs.existsSync( outDir ) ) await fs.remove( outDir );

        // Spawn the CLI and provide minimal inputs via stdin
        const proc = spawn( 'node', ['./bin/cli.js'], { stdio: ['pipe', 'pipe', 'pipe'] } );

        // collect output (not asserted here but useful for debugging)
        let out = '';
        proc.stdout.on( 'data', ( d ) => ( out += d.toString() ) );

        // Send answers – project name, project type (frontend), module (ESM), path, confirm
        proc.stdin.write( `${projName}\n` );
        proc.stdin.write( `frontend\n` );
        proc.stdin.write( `ESM\n` );
        proc.stdin.write( `${outDir}\n` );
        proc.stdin.write( `y\n` );
        proc.stdin.write( `n\n` );
        proc.stdin.end();

        await new Promise( ( resolve, reject ) => {
            proc.on( 'close', ( code ) => {
                try {
                    expect( code ).toBe( 0 );
                    expect( fs.existsSync( outDir ) ).toBe( true );
                    // cleanup
                    fs.removeSync( outDir );
                    resolve();
                } catch ( err ) {
                    reject( err );
                }
            } );
        } );
    }, 20000 );
} );
