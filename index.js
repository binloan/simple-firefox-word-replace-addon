var self = require("sdk/self");
var buttons = require('sdk/ui/button/toggle');
var tabs = require("sdk/tabs");
var replaceText = "Wixxer";
var enabled = true;

var button = buttons.ToggleButton({
  id: "ibm",
  label: "Kennst du den Wixxer?",
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
     worker.port.emit("replace", replaceText);
   }
});

var popup = require("sdk/panel").Panel({
  contentURL: self.data.url("popup.html"),
  contentScriptFile: self.data.url("popup.js"),
  onHide: handleHide
});

popup.port.on("save", function(text) {
  replaceText = text;
  popup.hide();
  tabs.activeTab.reload();
});

popup.port.on("state", function(state) {
  enabled = state;
  console.log(state);
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
