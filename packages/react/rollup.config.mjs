import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      entryFileNames: '[name].cjs.js',
      chunkFileNames: '[name]-[hash].cjs.js', 
    },
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].esm.js',
      chunkFileNames: '[name]-[hash].esm.js',
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    postcss({
      extract: true,
    }),
  ],
  external: ['react', 'react-dom'],
  preserveEntrySignatures: 'strict',
  inlineDynamicImports: true,
};
