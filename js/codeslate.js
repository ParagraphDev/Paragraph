const {dialog} = require('electron')
let mainWindow


console.log(dialog.showOpenDialog({properties: ['openFile'],filters: [{ name: 'Tous les fichiers', extensions: ['*'] }]}))