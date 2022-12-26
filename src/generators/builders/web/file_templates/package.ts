export default function npmPackageTemplate({ name = "project", version = "1.0.0", packages = [] }) {
    return (`
        {
            "name": "${name}",
            "version": "${version}",
            "description": "",
            "main": "index.js",
            "scripts": {
                "start": "electron .",
                "windows": "electron-packager . --platform=win32 --arch=x64 --overwrite --out=dist",
                "linux": "electron-packager . --platform=linux --arch=x64 --overwrite --out=dist",
                "macos": "electron-packager . --platform=darwin --arch=x64 --overwrite --out=dist"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "dependencies": {
                "@capacitor/android": "^4.6.1",
                "@capacitor/core": "^4.6.1",
                "@capacitor/ios": "^4.6.1"
                ${packages.map(e => `,"${e}": "*"`).join("")}
            },
            "devDependencies": {
                "electron": "*"
            }
        }
    `).replaceAll(/  |\n+/g, ''); //remove all double-whitespace and newline
}