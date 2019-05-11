// Copy text to clipboard.
function copyToCb(elem) {
    // Create temp input.
    const $temp = $("<input class='hidden-input'>");
    // Add it to body.
    $("body").append($temp);
    // Adding value into it.
    $temp.val($(elem).text().trim()).select();
    // Copy to clipboard.
    document.execCommand("copy");
    $temp.remove();
}

// Display effect when copied.
function copiedColorSuccessfully(elem) {    
    // Display copied.
    $(elem).toggleClass("clicked-effect");
    // Disable ::before.
    $(elem).toggleClass("show-hover");

    setTimeout(() => {
        // Remove copied effect.
        $(elem).toggleClass("clicked-effect");
        // Enable ::before.
        $(elem).toggleClass("show-hover");
    }, 500);
}

// Adding default colors in localstorage.
function createDefaultColors() {
    if (!localStorage.getItem("colors")) {
        localStorage.setItem("colors", [
            "202225",
            "A6A7A8",
            "4CA1AF",
            "C4E0E5",
            "E74C3C"
        ]);
    }
}

// Adding new color to localstorage.
function addColor(color) {
    let colors = localStorage.getItem("colors").split(',');
    colors.push(color.toUpperCase());
    localStorage.setItem("colors", colors);
}

// Removing color from localstorage.
function removeColor(color) {
    let colors = localStorage.getItem("colors").split(',');

    if (colors.includes(color)) {
        colors.splice(colors.indexOf(color), 1);

        localStorage.setItem("colors", colors);
    }
}

// Create a new color element.
function createColorElem(color) {
    // Create div color.
    return $("<div class='color show-hover'>")
        .css("background-color", `#${color}`)
        .append("<i class='fas fa-times'>")
        .append(
            // Create div hex.
            $("<div class='hex'>").text(color.toUpperCase())
        );
}

// Generate colors.
async function generateColors() {
    const colors = localStorage.getItem("colors").split(',');
    colors.forEach(color => {
        // Adding a color.
        $(".colors-container").append(
            createColorElem(color)
        );
        
    });

    addNewColorCreation();
    addPlusButton();
}

// Adding new color in json.
function addColorInJson(colors, newColor) {
    return colors.hex.append(newColor);
}

// Add plus button.
function addPlusButton() {
    $(".colors-container").append(
        $("<div class='add-color'>").append(
            $("<i class='fas fa-plus'>")
        )
    );
}

// show plus button.
function showPlusButton() {
    $(".add-color").css("display", "flex");
}

// hide plus button.
function hidePlusButton() {
    $(".add-color").css("display", "none");
}

// Add container to create new color.
function addNewColorCreation() {
    $(".colors-container").append(
        $("<div class='new-color'>").append(
            $("<i class='fas fa-times'>")
        ).append(
            $("<i class='fas fa-check'>")
        ).append(
            $("<input type='text' value='#ffffff' maxlength='7'>")
        )
    );
}

// show new color creation.
function shoNewColorCreation() {
    $(".new-color").css("display", "flex");

    // Reset.
    $(".new-color input").val("#ffffff");
    $(".new-color").css("background-color", "white");
}

// hide new color creation.
function hideNewColorCreation() {
    $(".new-color").css("display", "none");
}

// Handle hex text.
function setHexText(value) {
    return (value.startsWith('#'))? value : '#' + value.slice(0, 6);
}

// Handle new color input.
function handleNewColorInput() {
    const hexValue = $(".new-color input").val();
    $(".new-color input").val(setHexText(hexValue));
    $(".new-color").css("background-color", setHexText(hexValue.toUpperCase()));
}

// Rgb to hex.
function rgbToHex(rgb) {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
};

// Full rgb color to hex.
function fullColorHex(rgb) {
    let red = rgbToHex(rgb[0]);
    let green = rgbToHex(rgb[1]);
    let blue = rgbToHex(rgb[2]);
    return red+green+blue;
};

// Copy color to clipboard event.
function colorCopyEvent(colorElem) {
    $(colorElem).click((event) => {
        // Get the hexadecimal text.
        const hex = $(event.target).children()[1];
        copyToCb(hex);

        // Display effect.
        copiedColorSuccessfully(event.target);
    });
}

// Remove color element event.
function removeColorEvent(colorElem) {
    $(colorElem).find(".fa-times").click((event) => {

        // Get color hex.
        const colorHex = $(event.target).parent().find(".hex").text();
        removeColor(colorHex);

        $(event.target).parent().remove();
    }); 
}

$(document).ready(async () => {
    createDefaultColors();
    await generateColors();

    // Color copy event.
    colorCopyEvent($(".color"));
    // Remove color event.
    removeColorEvent($(".color"));

    // Display new color creation.
    $(".add-color").click(() => {
        hidePlusButton();
        shoNewColorCreation();
    });

    // Handle new color input.
    $(".new-color input").keyup(handleNewColorInput);
    // Select text when focus.
    $(".new-color input").focus(() => $(".new-color input").select());

    // Hide new color creation.
    $(".new-color .fa-times").click(() => {
        hideNewColorCreation();
        showPlusButton();
    });

    // Adding new color.
    $(".new-color .fa-check").click(() => {
        let value = $(".new-color").css("background-color");

        // Get rgb array.
        value = value.slice(4).split(')')[0].split(',');
        // Get hex string.
        value = fullColorHex(value);

        // Save color in localstorage.
        addColor(value);

        // Insert in the last color position.
        let colorElem = createColorElem(value).insertBefore(".new-color");

        // Load events.
        colorCopyEvent(colorElem);
        removeColorEvent(colorElem);

        // Hide new color creation.
        hideNewColorCreation();
        showPlusButton();
    });
});