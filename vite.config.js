import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { readdirSync, statSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

function computePageEntries() {
    const entries = {};
    const pagesDir = resolve(__dirname, 'src/pages');

    for (const dir of readdirSync(pagesDir)) {
        const fullDir = resolve(pagesDir, dir);
        if (!statSync(fullDir).isDirectory()) continue;

        const files = readdirSync(fullDir);
        for (const file of files) {
            if (!file.endsWith('.html')) continue;

            const name = file.replace('.html', '');
            const key = `/${dir}/${name}`;
            const value = `pages/${dir}/${file}`;
            entries[key] = value;
        }
    }

    return entries;
}

export default defineConfig({
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'public'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: computePageEntries(),
        },
    },
    plugins: [
        {
            name: 'logging-startup-homepage',
            configureServer(server) {
                server.httpServer?.once('listening', () => {
                    setTimeout(() => {

                        const url = server.resolvedUrls?.local?.[0];
                        if (!url) return;

                        const entry = `${url}pages/home/index.html`;

                        // ANSI styles
                        const bold = '\x1b[1m';
                        const cyan = '\x1b[36m';
                        const reset = '\x1b[0m';

                        const width = 56;
                        const line = '─'.repeat(width);

                        console.log('');
                        console.log(line);
                        console.log(
                            `  ${bold}${cyan}➜  Homepage${reset}  ${bold}${entry}${reset}`
                        );
                        console.log(line);
                        console.log('');

                    }, 100);
                });
            },
        }
    ],
});
