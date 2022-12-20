import { box, plane } from "./nodes.js";
import { handlesKeyDown, handlesKeyUp } from "./event.js";

let planeHeight = 200;
let boxAngle = -14.1;
let boxLeft = -89;
let boxTop = -69;


export let key = {up: false, down: false};
addEventListener("keydown", handlesKeyDown);
addEventListener("keyup", handlesKeyUp);

function render() {
  ensuresPositionRatio();

  requestAnimationFrame(render);
}
render();

function ensuresPositionRatio() {
  if (key.up) {
    planeHeight += 1;
    boxAngle += -0.0705;
    boxTop += -0.4;
    boxLeft += -0.4;
  }
  if (key.down) {
    if (planeHeight >= 0) {
    planeHeight -= 1;
    boxAngle -= -0.0705;
    boxTop -= -0.4;
    boxLeft -= -0.4;
}
  }
  plane.style.borderBottomWidth = planeHeight.toString() + "px";
  box.style.transform = "rotate(" + boxAngle.toString() + "deg)";
  box.style.top = boxTop.toString() + "px";
  box.style.left = boxLeft.toString() + "px";

}


