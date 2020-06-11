const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const keytar = require("keytar");
const path = require("path");
const url = require("url");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, enableRemoteModule: true }
  });
  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  );
  //mainWindow.webContents.openDevTools();
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  if (mainWindow === null) createWindow();
});

ipcMain.on("set-password", function(event, service, username, password) {
  keytar
    .setPassword(service, username, password)
    .then(() => {
      event.returnValue = true;
    })
    .catch(() => {
      event.returnValue = false;
    });
});

ipcMain.on("get-service-passwords", function(event, service) {
  keytar
    .findCredentials(service)
    .then(res => {
      event.returnValue = res;
    })
    .catch(() => {
      event.returnValue = [];
    });
});

ipcMain.on("delete-service-passwords", function(event, service) {
  const promises = [];
  keytar
    .findCredentials(service)
    .then(res => res.forEach(user => promises.push(keytar.deletePassword(service, user.account))))
    .catch(() => {
      event.returnValue = false;
    });
  return Promise.all(promises)
    .then(() => {
      event.returnValue = true;
    })
    .catch(() => {
      event.returnValue = false;
    });
});
