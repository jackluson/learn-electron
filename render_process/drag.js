const { ipcRenderer } = require('electron')

const dragFileLink = document.getElementById('drag-file-link')

dragFileLink.addEventListener('dragstart', (event) => {
  event.preventDefault();
  console.log('filename', __filename);

  ipcRenderer.send('ondragstart', __filename)
})
