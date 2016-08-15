var textInput = document.getElementById("textInput");
var submitBtn = document.getElementById("submitBtn");
var enabledSwitch = document.getElementById("enabled");

enabledSwitch.addEventListener('click', function(){
  self.port.emit("state", enabledSwitch.checked);
});

submitBtn.addEventListener('click', function(){
  var text = textInput.value.replace(/(\r\n|\n|\r)/gm,"");
  self.port.emit("save", text);
});
