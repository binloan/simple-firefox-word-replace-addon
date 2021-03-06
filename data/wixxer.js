var textContent = "Wixxer";
var regText = "ibm";
// Our walker function
function walk(node) {
  var child, next;

  switch (node.nodeType) {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;
    case 3: // Text node
      handleText(node);
      break;
  }
}

function handleText(textNode) {
  textNode.nodeValue = textNode.nodeValue.replace(new RegExp(regText, "gi"), textContent);
}

self.port.on("replace", function(texts) {
  regText = texts.regex;
  textContent = texts.replace;
  // Walk the dom looking for the given text in text nodes
  walk(document);
});
