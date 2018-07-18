// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  Menu
} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: './preload.js'
    }
  })
  mainWindow.webContents.openDevTools()

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000/')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  const template = [
    {
      label: '编辑',
      submenu: [
        {role: 'zoomin', label: '放大'},
        {role: 'zoomout', label: '缩小'},
        {role: 'resetzoom', label: '原始大小'},
        {type: 'separator'},
        {role: 'togglefullscreen', label: '全屏'}
        // { role: 'undo', label: '撤销' },
        // { role: 'redo', label: '重复' },
        // { type: 'separator' },
        // { role: 'cut', label: '剪切' },
        // { role: 'copy', label: '复制' },
        // { role: 'paste', label: '粘贴' },
        // { role: 'pasteandmatchstyle', label: '选择性粘贴' },
        // { role: 'delete', label: '删除' },
        // { role: 'selectall', label: '全选' }
      ]
    },
    {
      label: '工具',
      submenu: [
        {role: 'reload', label: '刷新'},
        {role: 'forcereload', label: '强制刷新'},
        {role: 'toggledevtools', label: '调试'}
      ]
    }
  ]
  if (process.platform === 'darwin') {
    template.unshift({
      label: 'XX管理系统',
      submenu: [
        {role: 'about', label: '关于'},
        {type: 'separator'},
        {role: 'services', label: '服务', submenu: []},
        {type: 'separator'},
        {role: 'hide', label: '隐藏'},
        {role: 'unhide', label: '显示'},
        {type: 'separator'},
        {role: 'quit', label: '退出'}
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
