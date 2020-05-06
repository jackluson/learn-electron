const { ipcRenderer } = require('electron');
const selectDirBtn = document.getElementById('select-directory')

selectDirBtn.addEventListener('click', () => {
  // ipcRenderer.send('open-file-dialog')
  ipcRenderer.send('save-dialog')
  // ipcRenderer.send('open-error-dialog')
  // ipcRenderer.send('open-file-dialog-sheet')

})

ipcRenderer.on('selected-directory', (event, path) => {
  console.log('path', path);

  document.getElementById('selected-file').innerHTML = `你已选择: ${path}`
})

ipcRenderer.on('saved-file', (event, path) => {
  if (!path) path = '无路径'
  document.getElementById('file-saved').innerHTML = `已选择的路径: ${path}`
})


