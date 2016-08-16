var self = require("sdk/self");
var buttons = require('sdk/ui/button/toggle');
var tabs = require("sdk/tabs");
var ss = require("sdk/simple-storage");
var replaceText = "Wixxer";
var regText = "ibm";
var enabled = true;

var popup = require("sdk/panel").Panel({
  contentURL: self.data.url("popup.html"),
  contentScriptFile: self.data.url("popup.js"),
  onHide: handleHide
});

if (typeof ss.storage.replaceText != 'undefined'){
  replaceText = ss.storage.replaceText;
}

if (typeof ss.storage.regexText != 'undefined'){
  regText = ss.storage.regexText;
}

if (typeof ss.storage.replaceEnabled != 'undefined'){
  enabled = ss.storage.replaceEnabled;
}

popup.port.emit("text", {
  regex: regText,
  replace: replaceText
});
popup.port.emit("set", enabled);

var button = buttons.ToggleButton({
  id: "ibm",
  label: "Simple Replace Addon",
  icon: {
    "16": "./icon16.png",
    "48": "./icon48.png",
    "64": "./icon64.png"
  },
  onChange: function(state) {
      handleClick(state);
  }
});

tabs.on('ready', function(tab) {
  if(enabled){
    var worker = tab.attach({
       contentScriptFile: self.data.url("wixxer.js")
     });
     worker.port.emit("replace", {
       regex: regText,
       replace: replaceText
     });
   }
});

popup.port.on("save", function(texts) {
  replaceText = texts.replace;
  regText = texts.regex;
  ss.storage.replaceText = texts.replace;
  ss.storage.regexText = texts.regex;
  popup.hide();
  tabs.activeTab.reload();
});

popup.port.on("state", function(state) {
  enabled = state;
  ss.storage.replaceEnabled = state;
  tabs.activeTab.reload();
});

function handleClick(state) {
  if(state.checked){
    popup.show({
      position: button
    });
    return;
  }
  popup.hide();
}

function handleHide() {
  button.state('window', {checked: false});
}
