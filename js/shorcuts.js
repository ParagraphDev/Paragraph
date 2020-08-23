var $ = require('jquery');
var fs = require('fs'); 

var dragFile= document.querySelector('body');
var open = document.getElementById('open')

const ipc = require('electron').ipcRenderer;

open.addEventListener('click', function (event) {
    ipc.send('open-file-dialog-for-file')
    console.log('ok-1')
});

dragFile.addEventListener('drop', function (e) {
      e.preventDefault();
      e.stopPropagation();
  
      for (let f of e.dataTransfer.files) {
        console.log('The file(s) you dragged: ', f)
        ipc.send('ondragstart', f.path)
        }
    });

dragFile.addEventListener('dragover', function (e) {
  e.preventDefault();
  e.stopPropagation();
});

ipc.on('fileData', (event, data) => { 
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/nord_dark");
  editor.setFontSize(17)
  editor.session.setMode("ace/mode/javascript");
  editor.setValue(data); 
})
