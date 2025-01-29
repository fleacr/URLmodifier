chrome.commands.onCommand.addListener((command) => {

    switch (command) {
        case "navigateToDetails":
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                  const currentUrl = tabs[0].url;
                  const newUrl = currentUrl + "details/experience";
                  chrome.tabs.update(tabs[0].id, { url: newUrl });
                }
              });

        break;

        case "highlightDotNet":
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                  chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: highlightDotNetWords
                  });
                }
              });
        break;

        case "highlightJava":
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                  chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: highlightJavaWords
                  });
                }
              });  
        break;

        case "highlightPython":
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              if (tabs[0]) {
                chrome.scripting.executeScript({
                  target: { tabId: tabs[0].id },
                  func: highlightPythonWords
                });
              }
            });  
      break;

      case "removeHighlights":
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: removeHighlights
            });
          }
        });  
    break; 

        default:
        break;
    }

  });
  
  function highlightDotNetWords() {
    const regex = /\.net/gi; // Busca ".net" (insensible a mayúsculas).
  
    function replaceText(node) {
      const text = node.nodeValue;
      const span = document.createElement("span");
      span.innerHTML = text.replace(regex, (match) => `<mark>${match}</mark>`);
      node.replaceWith(span);
    }
  
    function traverseNodes(node) {
      if (node.nodeType === Node.TEXT_NODE && regex.test(node.nodeValue)) {
        replaceText(node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
        Array.from(node.childNodes).forEach(traverseNodes);
      }
    }
  
    traverseNodes(document.body);
  }
  
  // Espera a que el DOM esté completamente cargado
  document.addEventListener("DOMContentLoaded", highlightDotNetWords);
  
  

  function highlightJavaWords() {
    
    const regex = /java/gi; // Busca "java" (insensible a mayúsculas).
    
    const body = document.body;
  
    function replaceText(node) {
      const text = node.nodeValue;
      const span = document.createElement("span");
      span.innerHTML = text.replace(regex, (match) => `<mark>${match}</mark>`);
      node.replaceWith(span);
    }
  
    function traverseNodes(node) {
      if (node.nodeType === Node.TEXT_NODE && regex.test(node.nodeValue)) {
        replaceText(node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
        Array.from(node.childNodes).forEach(traverseNodes);
      }
    }
    traverseNodes(body);
  }

  function highlightPythonWords() {
    
    const regex = /python/gi; // Busca "aws" (insensible a mayúsculas).
    
    const body = document.body;
  
    function replaceText(node) {
      const text = node.nodeValue;
      const span = document.createElement("span");
      span.innerHTML = text.replace(regex, (match) => `<mark>${match}</mark>`);
      node.replaceWith(span);
    }
  
    function traverseNodes(node) {
      if (node.nodeType === Node.TEXT_NODE && regex.test(node.nodeValue)) {
        replaceText(node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
        Array.from(node.childNodes).forEach(traverseNodes);
      }
    }
    traverseNodes(body);
  }


  function removeHighlights() {
    const marks = document.querySelectorAll("mark"); // Selecciona todos los elementos <mark>.
  
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        // Reemplaza el <mark> con su contenido de texto.
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
      }
    });
  }
  