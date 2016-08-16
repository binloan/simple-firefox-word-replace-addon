var textInputRep = document.getElementById("textInputRep");
var textInputReg = document.getElementById("textInputReg");
var submitBtn = document.getElementById("submitBtn");
var enabledSwitch = document.getElementById("enabled");

enabledSwitch.addEventListener('click', function(){
  self.port.emit("state", enabledSwitch.checked);
});

submitBtn.addEventListener('click', function(){
  var regtext = textInputReg.value;
  var replacetext = textInputRep.value.replace(/(\r\n|\n|\r)/gm,"");
  self.port.emit("save", {
    regex: regtext,
    replace: replacetext
  });
});

self.port.on("text", function(texts) {
  textInputRep.value = texts.replace;
  textInputReg.value = texts.regex;
});

self.port.on("set", function(state) {
  enabledSwitch.checked = state;
});
