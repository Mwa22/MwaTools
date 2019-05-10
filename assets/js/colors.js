// Copy text to clipboard.
function copyToCb(elem) {
    // Create temp input.
    const $temp = $("<input class='hidden-input'>");
    // Add it to body.
    $("body").append($temp);
    // Adding value into it.
    $temp.val($(elem).text()).select();
    // Copy to clipboard.
    document.execCommand("copy");
    $temp.remove();
}

// Display effect when copied.
function copiedSuccessfully(elem) {    
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

// Generate colors.
$.getJSON("js/colors.json", (colors) => {
    for (let i = 0; i < colors.hex.length; i++) {
        // Adding a color.
        $(".colors-container").append(
            // Create div color.
            $(`<div id="color${i}" class="color show-hover">`)
            .css("background-color", `#${colors.hex[i]}`)
            .append(
                // Create div hex.
                $("<div class='hex'>").text(colors.hex[i].toUpperCase())
            )
        );
    };
});

$(document).ready(() => {
    // Copy color to clipboard.
    $(".color").click((event) => {
        // Get the hexadecimal text.
        const hex = $(event.target).children()[0];
        copyToCb(hex);

        // Display effect.
        copiedSuccessfully(event.target);
    });
});