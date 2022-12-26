export default function capacitorTemplate({ appId =  "com.example.project", name = "project" }) {
    return (`
    {
        "appId": "${appId}",
        "appName": "${name}",
        "webDir": "www",
        "bundledWebRuntime": false
    }
    `).replaceAll(/  |\n+/g, ''); //remove all double-whitespace and newline
} 
