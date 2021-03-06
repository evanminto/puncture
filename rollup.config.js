import copy from 'rollup-plugin-copy-assets';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/puncture.js',
  output: {
    file: 'dist/puncture.js',
    format: 'esm',
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    copy({
      assets: [
        'src/css/puncture.css',
      ],
    }),
    production && terser(),
  ]
};
