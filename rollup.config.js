import copy from 'rollup-plugin-copy-assets';
import resolve from 'rollup-plugin-node-resolve';

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
  ]
};
