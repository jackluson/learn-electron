const { ipcMain, dialog, BrowserWindow } = require('electron');
ipcMain.on('open-file-dialog', (event) => {
  // const window = BrowserWindow.fromWebContents(event.sender)
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory', 'multiSelections']
  }).then(result => {
    console.log(result.canceled)
    console.log(result.filePaths)
    event.sender.send('selected-directory', result.filePaths.join('、'))

  }).catch(err => {
    console.log(err)
  })
})

// 窗口打开
ipcMain.on('open-file-dialog-sheet', function (event) {
  const window = BrowserWindow.fromWebContents(event.sender)
  const files = dialog.showOpenDialogSync(window, { properties: ['openFile'] })
  console.log('files', files);
})

// 错误 dialog
ipcMain.on('open-error-dialog', (event) => {
  dialog.showErrorBox('一条错误信息', '错误消息演示.')
})

// 保存
ipcMain.on('save-dialog', (event) => {
  const options = {
    title: '保存图像',
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
    ]
  };
  dialog.showSaveDialog(options).then(result => {
    console.log(result);
    event.sender.send('saved-file', result.filePath);
  }).catch(err => {
    console.log(err)
  })
})
