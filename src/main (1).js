'use strict'

const electron = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const os = require('os')
const path = require('path')
const config = require(path.join(__dirname, 'package.json'))
const BrowserWindow = electron.BrowserWindow
var kill  = require('tree-kill');

app.setName(config.productName)
var mainWindow = null
app.on('ready', function () {
  mainWindow = new BrowserWindow({
    backgroundColor: 'lightgray',
    title: config.productName,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      defaultEncoding: 'UTF-8'
    }
  })

//  var child = require('child_process').spawn('java', ['-jar', 'electron.jar', '']);
  console.log(__dirname);

  var jarPath = __dirname + '/extraResources/electron.jar';
  var child = require('child_process').spawn(
   'java', ['-jar', jarPath, '']
 );

  child.stdout.on('data', (d) => {
    console.log(d.toString())
  })

  setTimeout(function() {
    mainWindow.loadURL(`file://${__dirname}/app/html/dash.html`)
  }, 15000);


  mainWindow.once('ready-to-show', () => {
    mainWindow.setMenu(null)
    mainWindow.maximize()
    mainWindow.show()
  })

  mainWindow.onbeforeunload = (e) => {
    // Prevent Command-R from unloading the window contents.
    e.returnValue = false
  }

  mainWindow.on('closed', function () {
    kill(child.pid);
    mainWindow = null;
    app.quit();
  })
})

app.on('window-all-closed', () => { app.quit() })
