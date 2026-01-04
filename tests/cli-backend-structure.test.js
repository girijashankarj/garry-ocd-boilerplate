const fs = require( 'fs-extra' );
const path = require( 'path' );
const { spawnSync } = require( 'child_process' );

describe( 'Backend scaffold structure', () => {
    it( 'creates common, api pattern, agents and badge script', async () => {
        const projName = 'tmp-back-struct';
        const outDir = path.resolve( process.cwd(), projName );
        if ( fs.existsSync( outDir ) ) await fs.remove( outDir );

        const args = ['bin/cli.js', '--non-interactive', '--name', projName, '--type', 'backend', '--module', 'ESM', '--db', 'sequelize', '--yes', '--dry-run'];
        const res = spawnSync( 'node', args, { stdio: 'inherit' } );
        expect( res.status ).toBe( 0 );
        expect( fs.existsSync( outDir ) ).toBe( true );

        // common
        expect( fs.existsSync( path.join( outDir, 'src', 'common', 'enums', 'index.ts' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'src', 'common', 'index.ts' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'src', 'common', 'messages', 'index.ts' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'src', 'utils', 'loggerUtils.ts' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'src', 'utils', 'lodashUtils.ts' ) ) ).toBe( true );

        // users API
        expect( fs.existsSync( path.join( outDir, 'src', 'apis', 'users', 'handlers', 'getUser.ts' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'src', 'apis', 'users', 'logic.ts' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'src', 'apis', 'users', 'sql.ts' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'src', 'apis', 'withWrap.ts' ) ) ).toBe( true );

        // agents docs
        expect( fs.existsSync( path.join( outDir, 'docs', 'agents', 'design-agent.md' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'docs', 'agents', 'test-agent.md' ) ) ).toBe( true );

        // badge script
        expect( fs.existsSync( path.join( outDir, 'scripts', 'inject-badge.js' ) ) ).toBe( true );

        // test structure
        expect( fs.existsSync( path.join( outDir, 'tests', 'src', 'apis', 'users', 'logic.test.ts' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'tests', 'mock', 'index.ts' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'scripts', 'verify-tests.js' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'docs', 'PROJECT-DOCS.md' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'config', 'theme.json' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'config', 'client.json' ) ) ).toBe( true );
        expect( fs.existsSync( path.join( outDir, 'config', 'env.json' ) ) ).toBe( true );

        await fs.remove( outDir );
    }, 60000 );
} );
