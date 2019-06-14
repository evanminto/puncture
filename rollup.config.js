import copy from 'rollup-plugin-copy-assets';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/pattern-punch.js',
  output: {
    file: 'dist/pattern-punch.js',
    format: 'esm',
  },
  plugins: [
    resolve(),
    copy({
      assets: [
        'src/css/pattern-punch.css',
      ],
    }),
    production && terser(),
  ]
};
