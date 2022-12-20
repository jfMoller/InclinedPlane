import { box, plane } from "./nodes.js";
import { handlesKeyDown, handlesKeyUp } from "./event.js";

let planeHeight = 200;
let planeWidth = 800; //px
let planeHypotenuse;
let planeAngle;
let boxBottom = 80;
let boxRight = 100;

export let key = {up: false, down: false};
addEventListener("keydown", handlesKeyDown);
addEventListener("keyup", handlesKeyUp);

function render() {
    planeHypotenuse = Math.sqrt(Math.pow(planeHeight, 2) + Math.pow(planeWidth, 2));
    planeAngle = Math.asin((planeHeight / planeHypotenuse));
    console.log(planeHeight)



  maintainsPositionalRatio();
  requestAnimationFrame(render);
}
render();

function maintainsPositionalRatio() {
  if (key.up) {
    planeHeight += 1;
    boxBottom += 0.5;
    boxRight += -0.5;
  }
  if (key.down) {
    if (planeHeight >= 0) {
    planeHeight -= 1;
   
    boxBottom -= -0.5;
    boxRight -= -0.5;
}
    else {return;}

  }
  plane.style.borderBottomWidth = planeHeight.toString() + "px";
  box.style.transform = "rotate(" + -planeAngle.toString() + "rad)";
box.style.bottom = boxBottom.toString() + "px";
box.style.right = boxRight.toString() + "px";

}

