
const gamepads = [];
function jump(pad) {
  pad.hapticActuators[0].pulse(1.0, 200);
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
    for(var gamepad of gamepads) {
      if (gamepad.connected) {
        var p = false;
        gamepad.buttons.forEach((button, i) => {
          let pressed = button === 1.0;
          let val = button;
          if (typeof button === "object") {
            pressed = val.pressed;
            val = val.value;
          }
          if(pressed) {
            p = true;
          }
        });
        if(p) {
          jump(gamepad);
        }
      } 
    }
  } catch(error) {
    var e = document.createElement("div");
    document.body.appendChild(e);
    e.innerHTML = error.message;
  }
}
var started = false;
var canvas = document.getElementById("canvas");
canvas.onclick = function() {
  if(!started) setInterval(updateGamepadButtons, 500);
  started = true;
}
