const { BrowserWindow } = require('electron').remote;
const { ipcRenderer } = require('electron');
const path = require('path');

const syncMsgBtn = document.getElementById('sync-msg')

syncMsgBtn.addEventListener('click', () => {
  const reply = ipcRenderer.sendSync('synchronous-message', 'ping')
  const message = `同步消息回复: ${reply}`
  document.getElementById('sync-reply').innerHTML = message
})

const invisMsgBtn = document.getElementById('invis-msg')
const invisReply = document.getElementById('invis-reply')

invisMsgBtn.addEventListener('click', (clickEvent) => {
  const windowID = BrowserWindow.getFocusedWindow().id;
  console.log('__dirname', path.join(__dirname, '/render_process/section/invisible.html'));

  const invisPath = `file://${path.join(__dirname, '/render_process/section/invisible.html')}`
  let win = new BrowserWindow({
    width: 400,
    height: 400,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL(invisPath)

  win.webContents.on('did-finish-load', () => {
    const input = 100
    win.webContents.send('compute-factorial', input, windowID)
  })
})

ipcRenderer.on('factorial-computed', (event, input, output) => {
  const message = `${input} 的阶乘是 ${output}`
  invisReply.textContent = message
})
