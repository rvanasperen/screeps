import resolve from '@rollup/plugin-node-resolve';
import screeps from 'rollup-plugin-screeps';
import typescript from '@rollup/plugin-typescript';

// noinspection JSUnusedGlobalSymbols
export default {
    input: 'src/main.ts',

    output: {
        file: 'dist/main.js',
        format: 'cjs',
        sourcemap: false,
    },

    plugins: [resolve(), typescript(), screeps({ configFile: './screeps.json' })],
};
