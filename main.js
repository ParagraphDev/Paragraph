// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog} = require('electron')
const url=require('url')
const path=require('path')
const { ipcMain } = require('electron')
let fs = require('fs')

  
//electron application codes
ipcMain.on('ondragstart', (event, filePath) => {
    
    readFile(filePath);

    function readFile(filepath) { 
      fs.readFile(filepath, 'utf-8', (err, data) => { 
         
         if(err){ 
            console.log("An error ocurred reading the file " + err.message) 
            return 
         } 
         
         // handle the file content 
         event.sender.send('fileData', data) 
      }) 
   } 

  })

  ipcMain.on('open-file-dialog-for-file', function (event) {
    console.log('ok-2')
       dialog.showOpenDialog({
           properties: ['openFile']
       }, function (files) {
          if (files) event.sender.send('selected-file', files[0]);
       });

       dialog.showOpenDialog({
           properties: ['openFile', 'openDirectory']
       }, function (files) {
           if (files) event.sender.send('selected-file', files[0]);
       });
  })

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920, 
    height: 1080, 
    icon: './img/logo.png', 
    frame:false,
    background: "#323a44",
    webPreferences: {
      nodeIntegration: true
  }
  });

  mainWindow.loadURL(url.format({
    pathname:path.join(__dirname,'/index.html'),
    protocol:'file:',
    slashes:true
  }))


  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
app.on('ready', () => {
  createWindow()
  mainWindow.openDevTools();
})


function quitApp() {
    remote.getCurrentWindow().close()
}
