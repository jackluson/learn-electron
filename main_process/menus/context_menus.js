const {
  BrowserWindow,
  Menu,
  MenuItem,
  ipcMain,
  app
} = require('electron')
require('./shortcut')
const menu = new Menu()
menu.append(new MenuItem({ label: 'Hello' }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Electron', type: 'checkbox', checked: true }))

app.on('browser-window-created', (event, win) => {
  win.webContents.on('context-menu', (e, params) => {
    menu.popup(win, params.x, params.y)
  })
})

ipcMain.on('show-context-menu', (event, params) => {
  console.log('params', params);
  const win = BrowserWindow.fromWebContents(event.sender)
  //  鼠标位置设置无效
  menu.popup(win)
})
