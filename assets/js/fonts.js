// Enable/disable font color.
function toggleEnableColor(elem) {
    $(elem).toggleClass("font-enable");
}

// Display effect when copied.
function copiedFontSuccessfully() {
    $(".btn-copy .info").text("Copied");
    setTimeout(() => {
        $(".btn-copy .info").text("Click to Copy");
    }, 2000);
}

// Adding default fonts in localstorage.
function createDefaultFonts() {
    if (!localStorage.getItem("fonts")) {
        localStorage.setItem("fonts", [
            "Montserrat",
            "Roboto",
            "Open Sans",
            "Baloo Bhai",
            "Ubuntu"
        ]);
    }
}

// Adding new font to localstorage.
function addFont(font) {
    let fonts = localStorage.getItem("fonts").split(',');
    fonts.push(font);
    localStorage.setItem("fonts", fonts);
}

// Removing font from localstorage.
function removeFont(font) {
    let fonts = localStorage.getItem("font").split(',');

    if (fonts.includes(font)) {
        fonts.splice(fonts.indexOf(font), 1);

        localStorage.setItem("fonts", fonts);
    }
}

// Reset all fonts.
function resetFonts() {
    localStorage.removeItem("fonts");
    createDefaultFonts();

    $(".fonts").empty();
    generateFonts();
}

// Create a new font element.
function createFontElem(font) {
    return $("<div class='font'>").text(font);
}

// Generate fonts elements.
function generateFonts() {
    const fonts = localStorage.getItem("fonts").split(',');
    fonts.forEach(font => {
        // Adding a font.
        $(".fonts").append(
            createFontElem(font)
        );
    });

    addNewFontCreation();
    addPlusButtonFont();
}

// Set import element.
function setImportText(container, fonts) {
    let text = $(container).append(
        $("<span class='import'>").text("@import ")
    ).append(
        $("<span class='url'>").text("url")
    ).append(
        $("<span class='tokens'>").text("('")
    ).append(
        $("<span class='site'>").text("https://fonts.googleapis.com/css?family=")
    );

    if (fonts.length) {
        // First font.
        text.append(
            $("<span class='font-name'>").text(fonts[0])
        );

        // Other fonts.
        for (let i=1; i < fonts.length; i++) {
            text.append(
                $("<span class='tokens'>").text('|')
            ).append(
                $("<span class='font-name'>").text(fonts[i])
            );
        }
    }

    text.append(
        $("<span class='tokens'>").text("');")
    );

    return text;
}

// Get all fonts name.
function getAllFonts() {
    let fonts = $(".font").toArray();
    return fonts.map(font => $(font).text().split(' ').join('+'));
}

// Get enable fonts name.
function getEnableFonts() {
    let fonts = $(".font").toArray();
    // Get enable fonts.
    fonts = fonts.filter(font => $(font).hasClass("font-enable"));
    // Return name of fonts.
    return fonts.map(font => $(font).text().split(' ').join('+'));
}

// Show output.
function showOutputContainer() {
    $(".output-container").css("display", "block");
}

// Hide output.
function HideOutputContainer() {
    $(".output-container").css("display", "none");
}

// Update import text.
function updateImportText() {
    const enableFonts = getEnableFonts();
    $(".output").empty();
    setImportText($(".output"), enableFonts);

    if (enableFonts.length) {
        showOutputContainer();
    }
    else {
        // Hide output when no fonts selected.
        HideOutputContainer();
    }
}

// Set font family to fonts.
function setFontFamily() {
    const fonts = $(".font").toArray();
    fonts.forEach(font => {
        $(font).css("font-family", $(font).text());
    });
}

// Set font family to font element.
function setFontFamilyElem(elem) {
    $(elem).css("font-family", $(elem).text());
}


// Load fonts.
function loadFonts(fonts) {
    let url = "https://fonts.googleapis.com/css?family=";
    if (fonts.length) {
        // First font.
        url += fonts[0]

        // Other fonts.
        for (let i=1; i < fonts.length; i++) {
            url += `|${fonts[i]}`;
        }

        $("head").append(`<link href='${url}' rel='stylesheet'>`);
    }
}

// Add plus button.
function addPlusButtonFont() {
    $(".fonts").append(
        $("<div class='add-font'>").append(
            $("<i class='fas fa-plus'>")
        )
    );
}

// show plus button.
function showPlusButtonFont() {
    $(".add-font").css("display", "flex");
}

// hide plus button.
function hidePlusButtonFont() {
    $(".add-font").css("display", "none");
}

// Add container to create new font.
function addNewFontCreation() {
    $(".fonts").append(
        $("<div class='new-font'>").append(
            $("<i class='fas fa-times'>")
        ).append(
            $("<i class='fas fa-check'>")
        ).append(
            $("<input type='text'>")
        )
    );
}

// show new font creation.
function shoNewFontCreation() {
    $(".new-font").css("display", "flex");

    // Reset.
    $(".new-font input").val("");
    $(".new-font input").focus();
}

// hide new font creation.
function hideNewFontCreation() {
    $(".new-font").css("display", "none");
}

$(document).ready(() => {

    createDefaultFonts();
    generateFonts();
    loadFonts(getAllFonts());
    setFontFamily();

    // Toggle font.
    $(".font").click((event) => {
        toggleEnableColor($(event.target));
        updateImportText();
    });

    // Copy text import in clipboard.
    $(".btn-copy i").click(() => {
        copyToCb($(".output"));
        copiedFontSuccessfully();
    });

    // Display new font creation.
    $(".add-font").click(() => {
        hidePlusButtonFont();
        shoNewFontCreation();
    });

    // Focus on input.
    $(".new-font").click(() => {
        $(".new-font input").focus();
    });

    // Hide new font creation.
    $(".new-font .fa-times").click(() => {
        hideNewFontCreation();
        showPlusButtonFont();
    });

    // Adding new font.
    $(".new-font .fa-check").click(() => {
        let value = $(".new-font input").val();

        if (value) {
            // Save font in localstorage.
            addFont(value);
    
            // Insert in the last color position.
            const fontElem = createFontElem(value).insertBefore(".new-font");

            // Load font.
            loadFonts([value]);
            setFontFamilyElem(fontElem);
    
            // Hide new font creation.
            hideNewFontCreation();
            showPlusButtonFont();
        }
    });
});