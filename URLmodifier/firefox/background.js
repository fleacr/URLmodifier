document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.altKey) {
        event.preventDefault();
        const newUrl = window.location.href + "details/experience";
        window.location.href = newUrl;
    }
});


// Polyfill para compatibilidad entre navegadores
if (typeof browser === "undefined") {
    var browser = chrome;
}

// Listener para atajo de teclado
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey) {
        browser.tabs.executeScript({
            file: "highlightNet.js"
        });
    }
});
