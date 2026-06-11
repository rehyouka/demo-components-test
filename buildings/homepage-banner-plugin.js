const PLUGIN_NAME = 'homepage-banner-plugin';

export function homepageBannerPlugin() {
    return {
        name: PLUGIN_NAME,
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
                        `[${PLUGIN_NAME}]  ${bold}${cyan}➜  Homepage${reset}  ${bold}${entry}${reset}`
                    );
                    console.log(line);
                    console.log('');

                }, 100);
            });
        },
    };
}