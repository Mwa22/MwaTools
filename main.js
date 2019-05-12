const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let window;

app.on("ready", () => {
    // Create window.
    window = new BrowserWindow({
        width: 800,
        height: 600,
        maximizable: false,
        show: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load a URL in the window to the local index.html path
    window.loadURL(url.format({
        pathname: path.join(__dirname, "/assets/index.html"),
        protocol: "file:",
        slashes: true
    }));

    // window.webContents.openDevTools();

    // Show window when page is ready
    window.once("ready-to-show", () => {
        window.show();
    });

    // Close window.
    window.on("closed", () => {
        app.quit();
    });
});