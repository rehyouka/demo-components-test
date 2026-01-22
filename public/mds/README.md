# Demo Components 

###### _A Web-Component library designed for MPA_

[![License-MIT](https://img.shields.io/badge/License-MIT-e5eef3)](https://mit-license.org/)&nbsp;
[![Environment-nodejs-22.20.0](https://img.shields.io/badge/Environment-nodejs--22.20.0-268040)](https://mit-license.org/)&nbsp;
[![Builder-Vite-7.2.5](https://img.shields.io/badge/Builder-Vite--7.2.5-B39AFF)](https://vite.dev/)&nbsp;
[![WebComponent-Lit-3.3.1](https://img.shields.io/badge/WebComponent-Lit--3.3.1-6956f7)](https://lit.dev/)&nbsp;
[![Server-Caddy-2.10.2](https://img.shields.io/badge/Server-Caddy--2.10.2-002020)](https://caddyserver.com/)

> A simple practice [demo-components-test](https://github.com/ZEN-william/demo-components-test) that can be referenced.

----------

### Get Know

Here is the recommended **MPA** hierarchy:

```plaintext
project
├── package.json
├── package-lock.json
├── vite.config.js              -> Note: Some configuration needs to be done.
├── public                      -> static resources.
│   ├── avatars
│   ├── configs                 -> component configuration files in form of json.
│   ├── icons
│   └── imgs
├── src                         -> source codes.
│   ├── pages                   -> html files.
│   └── styles                  -> reusable css files.
└── dist                        -> The directory built by Vite will be applied to the production environment.
    ├── assets                  -> processed js, css files.
    ├── avatars
    ├── configs
    ├── icons
    ├── imgs
    └── pages
```
[Configure mappings via vite.config.js.](./docs/1%20-%20vite.config.js%20for%20MPA.md)

### Get Ready
- Install node.js as the development environment.
- [Create a vite project with lit.](./docs/0%20-%20Initialize%20with%20Scaffolding.md)
- Choose **Caddy** as the production server. (optional but recommended)

### Get Start

- Import directly in `html` file, and apply the components you want.

```html
<script type="module">
    import { DemoButton } from '<project>/dist/demo-components.es.js';
</script>

<demo-button bordered rounded>click it</demo-button>
```

- Startup in development environment.
```shell
npm install ; npm run dev
```

### Packaging

- This will automatically generate a `dist` directory.
```shell
npm run build
```

### Deployment (if Caddy)

- Tailor a Caddy profile for you. [You can refer to this one.](https://github.com/ZEN-william/demo-components-test/blob/main/Caddyfile)

- Quickly start the server. (if the `Caddyfile` is in the root of project)
```shell
caddy run
```
[For more commands, please refer to official document.](https://caddyserver.com/docs/api)