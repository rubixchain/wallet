module.exports = {
    devServer: {
        port: 8081
    },
    publicPath: '/',
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                extraFiles: {
                    from: 'src/extraResources/delta.jar',
                    to: './resources/app.asar.unpacked/delta.jar',
                    filter: ["**/*"]
                },
                productName: "Rubix Wallet",
                appId: 'rubix.network',
                win: {
                    "target": [
                        "nsis"
                    ],
                    icon: 'public/favicon.png',
                    "requestedExecutionLevel": "requireAdministrator"
                },
                "nsis": {
                    // "installerIcon": "favicon.ico",
                    // "uninstallerIcon": "favicon.ico",
                    "uninstallDisplayName": "Rubix Wallet",
                    "license": "license.txt",
                    "oneClick": false,
                    "allowToChangeInstallationDirectory": false
                }
            },
        },
    },
};