$(document).ready(() => {
    const remote = require("electron").remote;
    const window = remote.getCurrentWindow();

    // Minimize the app.
    $(".btn-minimize").click(() => {
        window.minimize();
    });

    // Exit the app.
    $(".btn-close").click(() => {
        window.close();
    });
});