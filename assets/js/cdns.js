// Adding default cdns in localstorage.
function createDefaultCDNs() {
    if (!localStorage.getItem("cdns")) {
        localStorage.setItem("cdns", JSON.stringify({
            "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js",
            "fontawesome": "https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        }));
    }
}

// Adding new cdn to localstorage.
function addCDN(cdnName, cdn) {
    let cdns = getAllCDNs();
    cdns[cdnName] = cdn;
    localStorage.setItem("cdns", JSON.stringify(cdns));
}

// Removing cdn from localstorage.
function removeCDN(cdnName) {
    let cdns = getAllCDNs();

    if (cdns.includes(cdnName)) {
        cdns[cdnName] = undefined;

        localStorage.setItem("cdns", JSON.stringify(cdns));
    }
}

// Reset all fonts.
function resetCDNs() {
    localStorage.removeItem("cdns");
    createDefaultCDNs();

    $(".cdn-container").empty();
    generateCDNs();
}


// Get all cdns from localstorage.
function getAllCDNs() {
    return JSON.parse(localStorage.getItem("cdns"));
}

// Create CDN element.
function createCDNElem(name, url) {

    let cdn;

    if (isCSS(url)) {
        cdn = createLink($("<div class='cdn-url'>"), url);
    }
    else {
        cdn = createScript($("<div class='cdn-url'>"), url);
    }

    return $("<div class='cdn'>")
        .append(
            $("<div class='cdn-name'>").text(name)
        )
        .append(cdn)
        .append(
            $("<button class='cdn-copy'>").text("Click to Copy")
        );
}

// Load CDNs.
function generateCDNs() {
    let cdns = getAllCDNs();
    for (const name in cdns) {
        const elem = createCDNElem(name, cdns[name]);
        $(".cdn-container").append(elem);
    }
}

// Test if url is a css file.
function isCSS(url) {
    const lastLetters = url.slice(url.length-3);
    // Check 3 last letters.
    return lastLetters === "css";
}

// Create script html element.
function createScript(container, url) {
    return $(container).append(
        $("<span class='tokens'>").text("<")
    ).append(
        $("<span class='balise'>").text("script ")
    ).append(
        $("<span class='attr'>").text("src")
    ).append(
        $("<span class='tokens'>").text("='")
    ).append(
        $("<span class='attrVal'>").text(url)
    ).append(
        $("<span class='tokens'>").text("'></")
    ).append(
        $("<span class='balise'>").text("script")
    ).append(
        $("<span class='tokens'>").text(">")
    );
}

// Create link html element.
function createLink(container, url) {
    return $(container).append(
        $("<span class='tokens'>").text("<")
    ).append(
        $("<span class='balise'>").text("link ")
    ).append(
        $("<span class='attr'>").text("rel")
    ).append(
        $("<span class='tokens'>").text("='")
    ).append(
        $("<span class='attrVal'>").text("stylesheet")
    ).append(
        $("<span class='tokens'>").text("' ")
    ).append(
        $("<span class='attr'>").text("href")
    ).append(
        $("<span class='tokens'>").text("='")
    ).append(
        $("<span class='attrVal'>").text(url)
    ).append(
        $("<span class='tokens'>").text("'>")
    );
}

// Display effect when copied.
function copiedCDNSuccessfully(btn) {
    $(btn).text("Copied");
    setTimeout(() => {
        $(btn).text("Click to Copy");
    }, 2000);
}

$(document).ready(() => {
    createDefaultCDNs();
    generateCDNs();

    $(".cdn-copy").click(event => {
        copyToCb($(event.target).parent().find(".cdn-url"));
        copiedCDNSuccessfully($(event.target));
    });
});