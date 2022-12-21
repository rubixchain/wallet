module.exports = {
  devServer: {
      port: 8081
  },
  publicPath: '/',
  pluginOptions: {
      electronBuilder: {
          builderOptions: {
              extraFiles: {
                  from: 'src/extraResources/rubix.jar',
                  to: './resources/app.asar.unpacked/rubix.jar',
                  filter: ["**/*"]
              },
              productName: "Rubix Wallet - Yamato",
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
                  "oneClick": true,
                  "allowToChangeInstallationDirectory": true
              }
          },
      },
  },
};