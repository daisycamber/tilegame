const controllers = {};
function jump(pad) {
  pad.vibrationActuator.playEffect("dual-rumble", {
    startDelay: 0,
    duration: 200,
    weakMagnitude: 1.0,
    strongMagnitude: 1.0,
  });
}
function move(x, y) {

}
function updateGamepadButtons() {
  try {
    navigator.getGamepads().forEach((gamepad) => {
      if (gamepad.connected) {
        gamepad.buttons.forEach((button, i) => {
          let pressed = button === 1.0;
          let val = button;
          if (typeof button === "object") {
            pressed = val.pressed;
            val = val.value;
          }
          if(pressed) {
           jump(gamepad);
          }
        })
      } 
    });
  } catch(error) {
    var e = document.createElement("div");
    document.body.appendChild(e);
    e.innerHTML = error.message;
  }
}
setInterval(updateGamepadButtons, 500);
