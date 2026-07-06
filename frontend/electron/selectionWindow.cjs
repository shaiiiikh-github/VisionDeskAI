const { BrowserWindow } = require("electron");
const path = require("path");

function createSelectionWindow() {

    const win = new BrowserWindow({

        fullscreen: true,

        transparent: true,

        frame: false,

        alwaysOnTop: true,

        skipTaskbar: true,

        movable: false,

        resizable: false,

        show: false,

        hasShadow: false,

        webPreferences: {

            preload: path.join(__dirname, "preload.cjs"),

            contextIsolation: true,

            nodeIntegration: false

        }

    });

    win.loadFile(path.join(__dirname, "selection.html"));

    return win;

}

module.exports = {
    createSelectionWindow
};