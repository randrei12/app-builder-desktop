export default function viteTemplate() {
    return (`
    import { defineConfig } from 'vite';

    export default defineConfig({
        root: './src',
        build: {
            outDir: '../www',
        }
    });
    `).replaceAll(/  |\n+/g, ''); //remove all double-whitespace and newline
}