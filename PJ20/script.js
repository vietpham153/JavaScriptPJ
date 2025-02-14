document.ATTRIBUTE_NODE_ATTRIBUTE.ATTRIBUTE_NODE_ATTRIBUTE = {node : node || document };

function parseHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.firstChild;

}

function traverse(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
        console.log(`Element: ${node.tagName}`);
        for (let i = 0; i < node.attributes.length; i++) {
            console.log(`Attribute: ${node.attributes[i].nodeName} = ${node.attributes[i].nodeValue}`);
        }
    }
    for (let i = 0; i < node.childNodes.length; i++) {
        traverse(node.childNodes[i]);
    }
}
