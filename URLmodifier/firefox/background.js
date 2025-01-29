chrome.commands.onCommand.addListener(function(command) {
    if (command === "add-text-to-url") {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let tab = tabs[0];
        let newUrl = tab.url + "details/experience";
        chrome.tabs.update(tab.id, { url: newUrl });
      });
    } else if (command === "highlight-dotnet") {
      chrome.tabs.executeScript({
        file: "content.js"
      });
    }
  });