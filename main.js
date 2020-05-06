// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
let mainWindow = null
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      sandbox: false,
      nodeIntegrationInSubFrames: true,
      nodeIntegrationInWorker: true,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow)

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('emitOpen', (event, arg) => {
  // console.log(event, arg) // prints "ping"
  const modalPath = path.join(__dirname, 'includes/modal.html');
  // event.reply('asynchronous-reply', 'pong')
  newwin = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    parent: mainWindow, //win是主窗口
    nodeIntegration: true,
  })
  newwin.webContents.openDevTools();
  // newwin.loadURL('https://github.com'); //new.html是新开窗口的渲染进程
  newwin.loadURL(`file://${modalPath}`); //new.html是新开窗口的渲染进程
  newwin.on('show', () => {
    event.reply('opened', 'pong')
  })
  newwin.on('closed', () => { newwin = null })
})

// ipcMain.on('synchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.returnValue = 'pong'
// })
