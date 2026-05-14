const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev = !!process.env.ELECTRON_START_URL;
const startURL = process.env.ELECTRON_START_URL || "https://coches-consumo-api-dp26.vercel.app/";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL(startURL);

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
