const gamepads = {};
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


function gamepadHandler(event, connected) {
  const gamepad = event.gamepad;
  if (connected) {
    gamepads[gamepad.index] = gamepad;
  } else {
    delete gamepads[gamepad.index];
  }
}

window.addEventListener(
  "gamepadconnected",
  (e) => {
    gamepadHandler(e, true);
  },
  false,
);
window.addEventListener(
  "gamepaddisconnected",
  (e) => {
    gamepadHandler(e, false);
  },
  false,
);
function updateGamepadButtons() {
  try {
    for(gamepad of gamepads) {
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
    }
  } catch(error) {
    var e = document.createElement("div");
    document.body.appendChild(e);
    e.innerHTML = error.message;
  }
}
setInterval(updateGamepadButtons, 500);
