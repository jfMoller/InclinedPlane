import { root, box, plane } from "./nodes.js";
import { handlesKeyDown, handlesKeyUp } from "./event.js";

let planeHeight = 39;
let planeWidth = 800; //px
let planeHypotenuse;
let planeAngle;
let boxBottom = -2;
let boxRight = 2;
let boxSlideBottom = -120;
let boxSlideRight = 2350;

let mass = 10; //kg
let mg = 9.82 * mass;
let normalForce;
let F1;
let frictionForce = F1;
let frictionNumber = F1 / normalForce;

export let key = { up: false, down: false };
addEventListener("keydown", handlesKeyDown);
addEventListener("keyup", handlesKeyUp);

box.addEventListener("click", () => {
  box.setAttribute("class", "box-animation");
  setTimeout(() => {
    box.removeAttribute("class", "box-animation");
  }, 10000);
});

function render() {
  planeHypotenuse = Math.sqrt(
    Math.pow(planeHeight, 2) + Math.pow(planeWidth, 2)
  );
  planeAngle = Math.asin(planeHeight / planeHypotenuse);
/*   console.log(window.getComputedStyle(root).getPropertyValue("--box_slide_bottom"));
 */
  maintainsGraphicalPosition();
  requestAnimationFrame(render);
}
render();

function maintainsGraphicalPosition() {
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
}
