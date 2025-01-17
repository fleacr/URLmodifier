// Función para resaltar palabras clave
function highlightText(searchTerm) {
    const body = document.body;
    const regex = new RegExp(`(${searchTerm})`, 'gi'); // Case-insensitive
    const markClass = 'highlighted-text';

    // Elimina marcas previas
    const existingMarks = document.querySelectorAll(`.${markClass}`);
    existingMarks.forEach(mark => {
        const parent = mark.parentNode;
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
    });

    // Recorrer nodos y aplicar el resaltado
    const walkDOM = (node) => {
        if (node.nodeType === 3) { // Text node
            const matches = node.nodeValue.match(regex);
            if (matches) {
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                matches.forEach(match => {
                    const index = node.nodeValue.indexOf(match, lastIndex);
                    if (index > lastIndex) {
                        fragment.appendChild(document.createTextNode(node.nodeValue.substring(lastIndex, index)));
                    }
                    const mark = document.createElement('mark');
                    mark.className = markClass;
                    mark.textContent = match;
                    fragment.appendChild(mark);
                    lastIndex = index + match.length;
                });
                if (lastIndex < node.nodeValue.length) {
                    fragment.appendChild(document.createTextNode(node.nodeValue.substring(lastIndex)));
                }
                node.parentNode.replaceChild(fragment, node);
            }
        } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
            Array.from(node.childNodes).forEach(walkDOM);
        }
    };

    walkDOM(body);
}

// Ejecutar al detectar la combinación de teclas
highlightText('.net');
alert('Resaltado .net completado!');
