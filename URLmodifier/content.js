document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.altKey) {
        event.preventDefault();
        const newUrl = window.location.href + "details/experience";
        window.location.href = newUrl;
    }
});