/*
 * Desc: 菜单的学习
 * File: /main_process/application_menus.js
 * Project: electron-quick-start
 * File Created: Wednesday, 6th May 2020 11:03:03 pm
 * Author: luxuemin2108@gmail.com
 * -----
 * Copyright (c) 2020 Camel Lu
 */
const { app, Menu, dialog, shell } = require('electron');

const isMac = process.platform === 'darwin'
let template = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
    ]
  },
  {
    label: '快捷操作',
    submenu: [
      {
        label: '切换全屏',
        accelerator: (() => {
          if (isMac) {
            return 'Ctrl+Command+F'
          } else {
            return 'F11'
          }
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
          }
        }
      },
      {
        label: '切换开发者工具',
        accelerator: (() => {
          if (isMac) {
            return 'Alt+Command+I'
          } else {
            return 'Ctrl+Shift+I'
          }
        })(),
        click: (item, focusedWindow) => {
          console.log('focusedWindow', focusedWindow)
          if (focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        }
      }, {
        type: 'separator'
      },
      {
        label: '打开弹窗',
        accelerator: (() => {
          return 'Alt+CmdOrCtrl+O'
        })(),
        click: (item, focusedWindow) => {
          console.log('focusedWindow', focusedWindow);
          if (focusedWindow) {
            const option = {
              type: 'info',
              title: 'dialog Title',
              buttons: ['好的', '取消'],
              message: '此演示用于 "菜单" 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'
            };
            dialog.showMessageBox(focusedWindow, option, function (...arg) {
              console.log(arg);
            })
          }
        }
      }

    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
          { role: 'close' }
        ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  },

  {
    label: '学习菜单',
    submenu: [
      {
        label: '重做',
        accelerator: 'Shift+CmdOrCtrl+z',
        relo: 'redo'
      },
      {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
    ]
  },
  {
    role: 'help', // 自带搜索框
    label: 'help_label',
    submenu: [
      {
        label: '去谷歌',
        click: async () => {
          await shell.openExternal('https://google.com')

        }
      }

    ]

  },
]

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu)
