import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { multiPagesEntriesRollupOptions } from './buildings/multi-pages-entries-rollupOptions.js';
import { mdsConfigGenerationPlugin } from './buildings/mds-config-generation-plugin.js';
import { homepageBannerPlugin } from './buildings/homepage-banner-plugin.js';

const __root_dir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    root: resolve(__root_dir, 'src'),
    publicDir: resolve(__root_dir, 'public'),
    build: {
        outDir: resolve(__root_dir, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: multiPagesEntriesRollupOptions(__root_dir),
        },
    },
    plugins: [
        // mdsConfigGenerationPlugin(),
        homepageBannerPlugin(),
    ],
});
