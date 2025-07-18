import screeps from 'rollup-plugin-screeps';
import typescript from '@rollup/plugin-typescript';

// noinspection JSUnusedGlobalSymbols
export default {
    input: 'src/main.ts',

    output: {
        file: 'dist/main.js',
        format: 'cjs',
        sourcemap: true,
    },

    plugins: [
        typescript(),
        screeps({configFile: './screeps.json'}),
    ],
}
