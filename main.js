import {
  root,
  box,
  plane,
  gravityVector,
  oppositeCathetus,
  normalVector,
  angleValue,
} from "./nodes.js";
import { handlesKeyDown, handlesKeyUp } from "./event.js";

let planeHeight = 39;
let planeWidth = 800; //px
let planeHypotenuse;
let planeAngle;
let boxBottom = -2;
let boxRight = 2;
let boxSlideBottom = -120;
let boxSlideRight = 2350;
let boxVelocity = 0;

let animationDelay = 0;

let mass = 10; //kg
let mg = 9.82 * mass;
let normalForce;
let f1;
let frictionForce;
let frictionNumber = 0.42; //random value, non material surface

export let key = { up: false, down: false };
addEventListener("keydown", handlesKeyDown);
addEventListener("keyup", handlesKeyUp);
function render() {
  planeHypotenuse = Math.sqrt(
    Math.pow(planeHeight, 2) + Math.pow(planeWidth, 2)
  );
  planeAngle = Math.asin(planeHeight / planeHypotenuse);

  //when non-moving
  f1 = mg * Math.sin(planeAngle);
  normalForce = mg * Math.cos(planeAngle);
  frictionForce = frictionNumber * normalForce;

  if (f1 > frictionForce) {
    box.setAttribute("class", "box-animation");
    boxVelocity -= planeAngle * 0.5;
  } else {
    box.removeAttribute("class", "box-animation");
    boxVelocity = 100;
  }

  //ratios for box-triangle
  normalVector.style.height = ((planeWidth / 8) * 2).toString() + "px";

  gravityVector.style.height = (200 + planeHeight / 16).toString() + "px";

  oppositeCathetus.style.width =
    (planeAngle * (parseFloat(gravityVector.style.height) / 2)).toString() +
    "px";

  //metric displays
angleValue.innerText = "θ = " + (57.296 * planeAngle).toFixed(2).toString() + "°";



  maintainsGraphicalPosition();
  requestAnimationFrame(render);
}
render();

export function maintainsGraphicalPosition() {
  if (key.up) {
    if (planeHeight <= 500) {
      planeHeight += 5;
      boxBottom -= 0.3;
      boxRight += 0.16;
      boxSlideBottom += -Math.exp(2.776);
      boxSlideRight += Math.exp(0.77);
    } else {
      return;
    }
  } else if (key.down) {
    if (planeHeight >= 40) {
      planeHeight -= 5;
      boxBottom -= -0.3;
      boxRight += -0.16;
      boxSlideBottom += Math.exp(2.776);
      boxSlideRight += -Math.exp(0.77);
    } else {
      return;
    }
  }
  plane.style.borderBottomWidth = planeHeight.toString() + "px";
  box.style.transform = "rotate(" + -planeAngle.toString() + "rad)";
  box.style.bottom = boxBottom.toString() + "px";
  box.style.right = boxRight.toString() + "px";

  root.style.setProperty("--box_bottom", boxBottom + "px");
  root.style.setProperty("--box_right", boxRight + "px");

  root.style.setProperty("--box_slide_bottom", boxSlideBottom + "px");
  root.style.setProperty("--box_slide_right", boxSlideRight + "px");
  root.style.setProperty("--box_velocity", boxVelocity + "s");
  root.style.setProperty("--animation_delay", animationDelay + "s");

  gravityVector.style.transform = "rotate(" + planeAngle.toString() + "rad)";
}

/*   console.log(window.getComputedStyle(root).getPropertyValue("--box_slide_bottom"));
 */
