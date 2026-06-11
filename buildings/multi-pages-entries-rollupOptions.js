import { resolve } from "node:path";
import { readdirSync, statSync } from 'fs';

export function multiPagesEntriesRollupOptions(rootDir) {
    const entries = {};
    const pagesDir = resolve(rootDir, 'src/pages');

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