chrome.commands.onCommand.addListener((command) => {
    if (command === "navigateToDetails") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          const currentUrl = tabs[0].url;
          const newUrl = currentUrl + "details/experience";
          chrome.tabs.update(tabs[0].id, { url: newUrl });
        }
      });
    }
  
    if (command === "highlightDotNet") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: highlightDotNetWords
          });
        }
      });
    }
  });
  
  // Función inyectada en la página para resaltar las palabras ".net".
  function highlightDotNetWords() {
    const regex = /\.net/gi; // Busca ".net" (insensible a mayúsculas).
    const body = document.body;
  
    // Función para envolver el texto que coincide con el regex.
    function replaceText(node) {
      const text = node.nodeValue;
      const span = document.createElement("span");
      span.innerHTML = text.replace(regex, (match) => `<mark>${match}</mark>`);
      node.replaceWith(span);
    }
  
    // Itera por todos los nodos de texto y aplica el resaltado.
    function traverseNodes(node) {
      if (node.nodeType === Node.TEXT_NODE && regex.test(node.nodeValue)) {
        replaceText(node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
        Array.from(node.childNodes).forEach(traverseNodes);
      }
    }
  
    traverseNodes(body);
  }
  