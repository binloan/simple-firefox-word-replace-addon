var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "ibm",
  label: "Kennst du den Wixxer?",
  icon: {
    "16": "./icon16.png",
    "48": "./icon48.png",
    "64": "./icon64.png"
  },
  onClick: handleClick
});

tabs.on('ready', function(tab) {
  tab.attach({
     contentScriptFile: self.data.url("wixxer.js")
   });
});

function handleClick(state) {
  tabs.open("https://de.wikipedia.org/wiki/IBM");
}
