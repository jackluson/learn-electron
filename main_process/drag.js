const { ipcMain } = require('electron')
const path = require('path')

ipcMain.on('ondragstart', (event, filepath) => {
  const iconName = 'codeIcon.png'
  console.log(__dirname, `/assets/img/${iconName}`);

  event.sender.startDrag({
    file: filepath,
    icon: path.join(__dirname, `/img/${iconName}`)
  })
})
