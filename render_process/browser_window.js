const path = require('path');
const fs = require('fs')
const { ipcRenderer, remote: { BrowserWindow } } = require('electron')


console.log('here')
const newWindowBtn = document.getElementById('new-window');
console.log(newWindowBtn)
const focusModalBtn = document.getElementById('focus-on-modal-window');

newWindowBtn.addEventListener('click', () => {
  const modalPath = path.join(__dirname, 'includes/modal.html');
  let win = new BrowserWindow({
    width: 600,
    height: 480,
    nodeIntegration: true,
    // parent: 
    // frame: false, // 创建一个无边框或者任意形状的透明窗口
  })
  win.webContents.openDevTools();
  const updateReply = () => {
    console.log(win.id);
    console.log(win.getSize(), win.getPosition());
  }
  const hideFocusBtn = () => {
    focusModalBtn.classList.add('disappear');
    focusModalBtn.classList.remove('smooth-appear');
    focusModalBtn.removeEventListener('click', clickHandler)
  }
  const showFocusBtn = () => {
    focusModalBtn.classList.add('smooth-appear');
    focusModalBtn.classList.remove('disappear');
    focusModalBtn.addEventListener('click', clickHandler)
  }
  win.on('focus', (evt) => {
    // console.log(evt);
    // evt.sender.closeDevTools();
    // if
    // console.log(evt.sender.isDevToolsOpened())
    // evt.sender.toggleDevTools();
    hideFocusBtn();
  })
  win.on('blur', showFocusBtn)
  win.on('resize', updateReply);
  win.on('move', updateReply)
  win.on('close', () => {
    win = null;
  })
  win.once('ready-to-show', () => {
    win.show();
  })
  const clickHandler = () => { win.focus() }
  win.loadURL(`file://${modalPath}`);

})

// loadFile
const loadBtn = document.getElementById('loadBtn');
const dataContainer = document.getElementById('showData');
loadBtn.addEventListener('click', () => {
  fs.readFile(__dirname + '/includes/readme.md', (err, data) => {
    if (err) return;
    dataContainer.innerHTML = data;
  })

})

// 渲染进程和主线程的通行
const addBtn = document.getElementById('add');
addBtn.addEventListener('click', () => {
  // console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

  ipcRenderer.on('opened', (event, arg) => {
    console.log(arg) // prints "pong"
  })
  ipcRenderer.send('emitOpen', 'ping')
})
