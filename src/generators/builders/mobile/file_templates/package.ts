export default function npmPackageTemplate({ name = "project", version = "1.0.0", packages = [] }) {
    return (`
    {
        "name": "${name}",
        "private": true,
        "version": "${version}",
        "type": "module",
        "dependencies": {
            "@capacitor/android": "*",
            "@capacitor/core": "*",
            "@capacitor/ios": "*"
            ${packages.map(e => `,"${e}": "*"`).join("")}
        },
        "scripts": {
            "start": "vite build"
        },
        "devDependencies": {
            "@capacitor/cli": "*",
            "vite": "*"
        }
    }
    `).replaceAll(/  |\n+/g, ''); //remove all double-whitespace and newline
}