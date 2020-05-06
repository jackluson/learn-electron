const removeBtn = document.getElementById('remove-tray');
const { ipcRenderer } = require('electron');
removeBtn.addEventListener('click', () => {
  ipcRenderer.send('remove-tray')
})

