import fs from 'node:fs';
import path from 'node:path';

const PLUGIN_NAME = 'mds-config-generation-plugin';

export function mdsConfigGenerationPlugin() {
    return {
        name: PLUGIN_NAME,
        buildStart() {
            const rootDir = process.cwd();
            // const rootDir = process.cwd();
            if (!rootDir?.length) {
                console.warn(`[${PLUGIN_NAME}] skip: rootDir[${rootDir}] not found`);
                return;
            }

            const mdsDir = path.join(rootDir, 'public', 'mds');
            const outputDir = path.join(rootDir, 'public', 'configs');
            const outputFile = path.join(outputDir, 'mds.json');

            if (!fs.existsSync(mdsDir)) {
                console.warn(`[${PLUGIN_NAME}] skip: mdsDir[${mdsDir}] not found`);
                return;
            }

            const mdFiles = [];

            function walk(dir) {
                const entries = fs.readdirSync(dir, { withFileTypes: true });
                for (const entry of entries) {
                    const fullPath = path.join(dir, entry.name);

                    if (entry.isDirectory()) {
                        walk(fullPath);
                        continue;
                    }

                    if ( entry.isFile() && entry.name.toLowerCase().endsWith('.md') ) {
                        const relativePath = path.relative(mdsDir, fullPath);
                        const noExt = relativePath
                            .replace(/\\/g, '/')
                            .replace(/\.md$/i, '');
                        mdFiles.push(noExt);
                    }
                }
            }

            walk(mdsDir);

            const result = [];
            for (const file of mdFiles) {
                const segments = file.split('/');
                insertNode(result, segments, 0);
            }

            fs.mkdirSync(outputDir, { recursive: true });
            fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf8');

            console.log(`[${PLUGIN_NAME}] generated ${outputFile}`);
        }
    };
}

function insertNode(container, segments, idx) {
    if (idx === segments.length - 1) {
        container.push(MdNode.ofFile(segments));
        return;
    }

    let node = container.find( aNode => aNode.name === segments[idx] );
    if (!node) {
        node = MdNode.ofDir(segments, idx);
        container.push(node);
    }

    insertNode(node.list, segments, idx+1);
}

class MdNode {
    constructor(segments, idx, isDir) {
        this.key = segments.slice(0, idx+1).join('/');
        this.name = segments[idx];
        this.isDir = isDir;
        this.list = isDir ? [] : undefined;
    }
    static ofFile(segments) {
        return new MdNode(segments, segments.length-1, false);
    }
    static ofDir(segments, idx) {
        return new MdNode(segments, idx, true);
    }
}