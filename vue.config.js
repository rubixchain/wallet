module.exports = {
    devServer: {
        port: 8081
     },
    publicPath: '/',
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                productName: "RubiX Wallet",
                appId: 'test.com',
                win: {
                    "target": [
                        "nsis"
                    ],
                //   icon: 'favicon.ico',
                  "requestedExecutionLevel": "requireAdministrator"
                },
                "nsis": {
                    // "installerIcon": "favicon.ico",
                    // "uninstallerIcon": "favicon.ico",
                    "uninstallDisplayName": "RubiX Wallet",
                    "license": "license.txt",
                    "oneClick": false,
                    "allowToChangeInstallationDirectory": true
                }
            },
        },
    },
};