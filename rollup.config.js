import { babel } from '@rollup/plugin-babel';
import { dts } from 'rollup-plugin-dts';
const pkg = require('./package.json');
const config = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true
    },
    external: Object.keys(pkg.dependencies),
    plugins: [babel({
      babelHelpers: 'bundled'
    })]
},
{
  input: 'src/index.js',
  output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
  },
  external: Object.keys(pkg.dependencies),
  plugins: [babel({
    babelHelpers: 'bundled'
  })]
},
{
  input: 'src/index.d.ts',
  output: [{ file: 'dist/index.d.ts', format: 'es' }],
  plugins: [dts({
    compilerOptions: {
      removeComments: true
    }
  })],
},
{
  input: 'platform-server/src/index.js',
  output: {
      dir: 'platform-server/dist',
      format: 'cjs',
      sourcemap: true
  },
  external: Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies)),
  plugins: [babel({
    babelHelpers: 'bundled'
  })]
},
{
  input: 'platform-server/src/index.js',
  output: {
      file: 'platform-server/dist/index.esm.js',
      format: 'esm',
      sourcemap: true
  },
  external: Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies)).concat(
      [ '@themost/remoting' ]
  ),
  plugins: [babel({
    babelHelpers: 'bundled'
  })]
},
{
  input: 'platform-server/src/index.d.ts',
  output: [
      {
          file: 'platform-server/dist/index.d.ts'
      }
  ],
  external: Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies)).concat(
      [ '@themost/remoting' ]
  ),
  plugins: [dts({
    compilerOptions: {
      removeComments: true
    }
  })],
}
];

export default config;