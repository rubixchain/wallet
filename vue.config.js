module.exports = {
    devServer: {
        port: 8081
     },
    publicPath: '/',
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                extraFiles: {
                from: 'src/extraResources/rubix_api.jar',
                to: './resources/app.asar.unpacked/rubix_api.jar',
                filter: ["**/*"]
                },
                productName: "RubiX Wallet",
                appId: 'rubix.network',
                win: {
                    "target": [
                        "nsis"
                    ],
                    icon: 'public/favicond.png',
                  "requestedExecutionLevel": "requireAdministrator"
                },
                "nsis": {
                    // "installerIcon": "favicon.ico",
                    // "uninstallerIcon": "favicon.ico",
                    "uninstallDisplayName": "RubiX Wallet",
                    "license": "license.txt",
                    "oneClick": false,
                    "allowToChangeInstallationDirectory": false
                }
            },
        },
    },
};