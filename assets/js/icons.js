// Display effect when copied.
function copiedIconSuccessfully(elem) {    
    $(elem).css("animation-name", "copyIconEffect");

    setTimeout(() => {
        $(elem).css("animation-name", "none");
    }, 800);
}

// Adding default icons in localstorage.
function createDefaultIcons() {
    if (!localStorage.getItem("icons")) {
        localStorage.setItem("icons", [
            "fas fa-plus",
            "fas fa-minus",
            "fas fa-check",
            "fas fa-times",
            "fas fa-cog",
            "fas fa-bars"
        ]);
    }
}

// Adding new icon to localstorage.
function addIcon(icon) {
    let icons = localStorage.getItem("icons").split(',');
    icons.push(icon);
    localStorage.setItem("icons", icons);
}

// Removing icons from localstorage.
function removeIcon(icon) {
    let icons = localStorage.getItem("icons").split(',');

    if (icons.includes(icon)) {
        icons.splice(icons.indexOf(icon), 1);
        localStorage.setItem("icons", icons);
    }
}

// Reset all icons.
function resetIcons() {
    localStorage.removeItem("icons");
    createDefaultIcons();

    $(".icons-container").empty();
    generateIcons();
}

// Create a new icon element.
function createIconElem(icon) {
    // Create div icon.
    return $("<div class='icon'>")
        .append(`<i class='${icon}'>`)
        .append("<i class='close fas fa-times'>");
}

// Generate icons.
function generateIcons() {
    const icons = localStorage.getItem("icons").split(',');
    icons.forEach(icon => {
        // Adding a icon.
        $(".icons-container").append(
            createIconElem(icon)
        );
    });

    addNewIconCreation();
    addPlusButtonIcon();

    // Icon copy event.
    iconCopyEvent($(".icon > i"));
    // Remove icon event.
    removeIconEvent($(".icon"));

    // Display new icon creation.
    $(".add-icon").click(() => {
        hidePlusButtonIcon();
        showNewIconCreation();
    });

    // Hide new icon creation.
    $(".new-icon .fa-times").click(() => {
        hideNewIconCreation();
        showPlusButtonIcon();
    });

    // Adding new icon.
    $(".new-icon .fa-check").click(() => {

        let value = $(".new-icon input").val();

        if (value) {
            // Save icon in localstorage.
            addIcon(value);

            // Insert in the last icon position.
            const iconElem = createIconElem(value).insertBefore(".new-icon");

            // Load events.
            iconCopyEvent(iconElem);
            removeIconEvent(iconElem);
    
            // Hide new icon creation.
            hideNewIconCreation();
            showPlusButtonIcon();
        }
    });
}

// Add plus button.
function addPlusButtonIcon() {
    $(".icons-container").append(
        $("<div class='add-icon'>").append(
            $("<i class='fas fa-plus'>")
        )
    );
}

// show plus button.
function showPlusButtonIcon() {
    $(".add-icon").css("display", "flex");
}

// hide plus button.
function hidePlusButtonIcon() {
    $(".add-icon").css("display", "none");
}

// Add container to create new icon.
function addNewIconCreation() {
    $(".icons-container").append(
        $("<div class='new-icon'>").append(
            $("<i class='fas fa-times'>")
        ).append(
            $("<i class='fas fa-check'>")
        ).append(
            $("<input type='text'>")
        )
    );
}

// show new icon creation.
function showNewIconCreation() {
    $(".new-icon").css("display", "flex");

    // Reset.
    $(".new-icon input").val("");
    $(".new-icon input").focus();
}

// hide new icon creation.
function hideNewIconCreation() {
    $(".new-icon").css("display", "none");
}

// Copy icon to clipboard event.
function iconCopyEvent(iconElem) {
    $(iconElem).click(event => {
        
        const iconClasses = $(event.target).attr("class");
        const iElem = `<i class="${iconClasses}"></i>`;
        copyToCbText(iElem);

        // Display effect.
        copiedIconSuccessfully($(event.target));
    });
}

// Remove icon element event.
function removeIconEvent(iconElem) {
    $(iconElem).find(".fa-times").click((event) => {

        // Get classes.
        const iconClasses = $(event.target).parent().find("i:not(.close)").attr("class");
        removeIcon(iconClasses);

        $(event.target).parent().remove();
    }); 
}

$(document).ready(async () => {
    createDefaultIcons();
    generateIcons();
});