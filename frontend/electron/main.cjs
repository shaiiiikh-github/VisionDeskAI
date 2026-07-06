const {
    app,
    BrowserWindow,
    globalShortcut,
    ipcMain,
    screen
} = require("electron");

const path = require("path");

const { createSelectionWindow } = require("./selectionWindow.cjs");

let mainWindow;
let selectionWindow;

function createWindow() {

    mainWindow = new BrowserWindow({

        width: 420,
        height: 260,

        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false,
        movable: true,
        show: false,
        hasShadow: false,
        autoHideMenuBar: true,

        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false
        }

    });

    mainWindow.loadURL("http://localhost:5173");

    mainWindow.once("ready-to-show", () => {

        const display = screen.getPrimaryDisplay();
        const { width } = display.workAreaSize;

        mainWindow.setPosition(width - 440, 30);

    });

}

/*
|--------------------------------------------------------------------------
| React -> Electron
|--------------------------------------------------------------------------
*/

ipcMain.on("hide-window", () => {

    if (mainWindow) {

        mainWindow.hide();

    }

});

/*
|--------------------------------------------------------------------------
| Selection -> Electron
|--------------------------------------------------------------------------
*/

ipcMain.on("region-selected", (event, region) => {

    console.log("Selected Region:", region);

    selectionWindow.hide();

    mainWindow.show();

    mainWindow.focus();

    mainWindow.webContents.send("selected-region", region);

});

/*
|--------------------------------------------------------------------------
| App Ready
|--------------------------------------------------------------------------
*/

app.whenReady().then(() => {

    createWindow();

    selectionWindow = createSelectionWindow();

    globalShortcut.register("Alt+Space", () => {

        selectionWindow.show();

    });

});

/*
|--------------------------------------------------------------------------
| Cleanup
|--------------------------------------------------------------------------
*/

app.on("will-quit", () => {

    globalShortcut.unregisterAll();

});