const { ipcRenderer } = require('electron');
const contextBtn = document.getElementById('context-menu');
contextBtn.addEventListener('click', (e) => {
  console.log('e', e);
  const { x, screenX, y, screenY } = e;

  ipcRenderer.send('show-context-menu', {
    x: screenX,
    y: screenY
  })
})
