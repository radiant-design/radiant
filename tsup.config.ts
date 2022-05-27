import { defineConfig, Options } from 'tsup'

const baseConfig: Options = {
  entry: [
    'src/**/*.ts*'
  ],
  outDir: 'build',
  treeshake: true,
  target: 'es2020',
  platform: 'browser',
  format: ['esm'],
  splitting: true,
  shims: false,
  dts: true,
  plugins: [{
    name: 'esbuild-plugin-svgr'
  }],
  onSuccess: 'node scripts/prepare.mjs'
}

export default defineConfig([
  {
    ...baseConfig,
    outDir: 'build',
    minify: false,
    sourcemap: false,
    clean: true,
    bundle: false
  }
])