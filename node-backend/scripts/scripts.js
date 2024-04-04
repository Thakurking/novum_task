/* eslint-disable new-cap */
import { build } from 'esbuild';

(async () => {
  try {
    await build({
      entryPoints: ['index.ts'],
      bundle: true,
      platform: 'node',
      outfile: `build/index.js`,
      // external: [],
      // plugins: [],
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();