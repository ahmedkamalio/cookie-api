import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import nodeResolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
// @ts-ignore
import multiInput from 'rollup-plugin-multi-input';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

const paths = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  cjsDist: path.join(__dirname, 'dist/cjs'),
  esDist: path.join(__dirname, 'dist/es'),
  umdDist: path.join(__dirname, 'dist/umd'),
};

const plugins = [];

if (isProduction) {
  plugins.push(del({ targets: paths.dist }));
}

plugins.push(multiInput());
plugins.push(external());
plugins.push(nodeResolve());
plugins.push(typescript());
plugins.push(commonjs());

const inputs = [path.join(paths.src, '**/*.ts')];

const outputs = [
  {
    dir: paths.cjsDist,
    format: 'cjs',
    exports: 'named',
    sourcemap: true,
  },
  {
    dir: paths.esDist,
    format: 'es',
    exports: 'named',
    sourcemap: true,
  },
];

export default [
  {
    input: inputs,
    output: outputs,
    plugins,
  },
  {
    input: path.join(paths.src, 'index.ts'),
    output: {
      dir: paths.umdDist,
      format: 'iife',
      name: 'CookieAPI',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    // we don't want to remove the dist directory.
    plugins: plugins.slice(1, plugins.length).concat(terser()),
  },
];
