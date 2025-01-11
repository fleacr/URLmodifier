document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.altKey) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let currentUrl = tabs[0].url;
            let newUrl = currentUrl + "details/experience";
            chrome.tabs.update(tabs[0].id, {url: newUrl});
        });
    }
});