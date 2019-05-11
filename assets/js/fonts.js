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

// Get fonts name.
function getEnableFonts() {
    let fonts = $(".fonts .font").toArray();
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

$(document).ready(() => {

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
});