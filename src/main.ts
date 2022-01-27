import { app, BrowserView, BrowserWindow } from "electron";
import * as path from "path";

const framelessOptions = {
  thickFrame: false,
  frame: false,
  transparent: true
};

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 600,
    ...framelessOptions
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../drag-region.html"));
  return mainWindow;
}

function createUndraggableFramelessWindow() {
  const window = createWindow();
  const view = new BrowserView();
  view.webContents.loadURL("https://electronjs.org");
  window.addBrowserView(view);
  view.setBounds({ x: 0, y: 0, width: 300, height: 300 });
}

function createDraggableFramelessWindow() {
  const window = createWindow();
  const view = new BrowserView();
  view.webContents.loadURL("https://electronjs.org");
  window.addBrowserView(view);
  view.setBounds({ x: 50, y: 50, width: 300, height: 300 });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      createUndraggableFramelessWindow();
      createDraggableFramelessWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
