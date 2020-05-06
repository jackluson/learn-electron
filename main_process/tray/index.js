const { Menu, Tray, ipcMain } = require('electron')
const path = require('path');
let tray = null
const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
const iconPath = path.join(__dirname, iconName)
tray = new Tray(iconPath);
const contextMenu = Menu.buildFromTemplate([
  { label: 'Item1', type: 'radio' },
  { label: 'Item2', type: 'radio' },
  { label: 'Item3', type: 'radio', checked: true },
  { label: 'Item4', type: 'radio' }
])
console.log('tray', tray);

tray.setToolTip('This is my application.')
tray.setContextMenu(contextMenu);

ipcMain.on('remove-tray', () => {
  tray.destroy();
})
