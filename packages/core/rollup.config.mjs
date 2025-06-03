import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
    preserveModules: true
  },
  plugins: [
    typescript({ tsconfig: './tsconfig.json' })
  ]
};
