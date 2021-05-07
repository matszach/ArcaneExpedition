const { app, BrowserWindow } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1200,
    minWidth: 600,
    height: 800,
    minHeight: 400,
    icon: path.join(__dirname, 'assets/img/favicon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'js/preload.js')
    },
  })
  // win.removeMenu(); // to enable dev tools uncomment this
  // win.setResizable(false); // resizing should be an option in-app
  win.loadFile('index.html')
});
