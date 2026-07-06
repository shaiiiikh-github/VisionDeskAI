const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {

    hideWindow: () => ipcRenderer.send("hide-window"),

    regionSelected: (region) =>
        ipcRenderer.send("region-selected", region),

    onRegionSelected: (callback) =>
        ipcRenderer.on("selected-region", (event, region) => callback(region))

});