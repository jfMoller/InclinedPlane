import {
  root,
  box,
  plane,
  gravityVector,
  massInputField,
  gravityInputField,
  frictionInputField,
  angleInputField,
} from "./node.js";
import { handlesKeyDown, handlesKeyUp, handlesChange } from "./event.js";
import { getCSSPropertyValue } from "./utility.js";
import {
  updatesModelValues,
  handlesModelScaleBasedOnModelValues,
  displaysAngleValue,
  updatesVectorRatios,
  displayVectorValues,
  handlesVectorPieChart,
} from "./interface.js";

//plane geometry
let planeHeight = getCSSPropertyValue("--plane_height");
let planeWidth = getCSSPropertyValue("--plane_width");
let planeHypotenuse; //calculated dynamically
let planeAngle; //caclculated dynamically

//box animation properties
let boxBottom = getCSSPropertyValue("--box_bottom");
let boxRight = getCSSPropertyValue("--box_right");
let boxSlideBottom = getCSSPropertyValue("--box_slide_bottom");
let boxSlideRight = getCSSPropertyValue("--box_slide_right");
let boxVelocity = getCSSPropertyValue("--box_velocity");
let animationDelay = getCSSPropertyValue("--animation_delay");

//values for starting model
let mass = 10; //kg
let g = 9.82; //ms^2
let frictionNumber = 0.42; //dimensionless (does not have a unit)

//vector equations for when box is unmoving
let mg = mass * g;
let f1 = mg * Math.sin(planeAngle);
let normalForce = mg * Math.cos(planeAngle);
let frictionForce = frictionNumber * normalForce;

//properties for model scale
let scale = getCSSPropertyValue("--model_scale");
let modelFontSize = getCSSPropertyValue("--model_font_size");

//for handling user controls of model angle
export let key = {
  up: false,
  down: false,
  shift: false,
};
addEventListener("keydown", handlesKeyDown);
addEventListener("keyup", handlesKeyUp);

//for handling user change of model properties
export let userInput = {
  mass: null,
  g: null,
  frictionNumber: null,
};
massInputField.addEventListener("change", handlesChange);
gravityInputField.addEventListener("change", handlesChange);
frictionInputField.addEventListener("change", handlesChange);
angleInputField.addEventListener("change", handlesChange);

function render() {
  handlesUserInput();

  updatesModelValues(mass, g, frictionNumber, planeAngle);

  handlesModelScaleBasedOnModelValues(mass, scale, modelFontSize);

  calculatesPlaneGeometryAndTrigenometry();

  displaysAngleValue(planeAngle);

  calculatesVectors();

  updatesVectorRatios(
    planeWidth,
    planeHeight,
    f1,
    normalForce,
    frictionForce,
    mg
  );

  displayVectorValues(normalForce, frictionForce, mg, f1);

  handlesVectorPieChart(f1, frictionForce);

  if (f1 > frictionForce) {
    animatesBoxToStartSliding();
  } else {
    stopsAnimationAndResetsBoxPosition();
  }
  maintainsGraphicalPosition();
  requestAnimationFrame(render);
}
render();

export function handlesUserInput() {
  if (userInput.mass !== null) {
    mass = userInput.mass;
    mg = mass * g;
  }
  if (userInput.g !== null) {
    g = userInput.g;
    mg = mass * g;
  }
  if (userInput.frictionNumber !== null) {
    frictionNumber = userInput.frictionNumber;
  }
}

function calculatesPlaneGeometryAndTrigenometry() {
  planeHypotenuse = Math.sqrt(
    Math.pow(planeHeight, 2) + Math.pow(planeWidth, 2)
  );
  planeAngle = Math.asin(planeHeight / planeHypotenuse);
}

function calculatesVectors() {
  f1 = mg * Math.sin(planeAngle);
  normalForce = mg * Math.cos(planeAngle);
  frictionForce = frictionNumber * normalForce;
}

function animatesBoxToStartSliding() {
  box.setAttribute("class", "box-animation");
  boxVelocity -= planeAngle * 0.5;
}

function stopsAnimationAndResetsBoxPosition() {
  box.removeAttribute("class", "box-animation");
  boxVelocity = 100;
}

export function maintainsGraphicalPosition() {
  if (key.up && !key.shift) {
    if (planeHeight <= 500) {
      planeHeight += 5;
      boxBottom -= 0.3;
      boxRight += 0.16;
      boxSlideBottom += -Math.exp(2.776);
      boxSlideRight += Math.exp(0.77);
    } else {
      return;
    }
  } else if (key.up && key.shift) {
    if (planeHeight <= 500) {
      planeHeight += 1;
      planeAngle = Math.asin(planeHeight / planeHypotenuse);
      boxBottom -= 0.3 / 5;
      boxRight += 0.16 / 5;
      boxSlideBottom += -Math.exp(2.776) / 5;
      boxSlideRight += Math.exp(0.77) / 5;
    }
  } else if (key.down && !key.shift) {
    if (planeHeight >= 40) {
      planeHeight -= 5;
      boxBottom -= -0.3;
      boxRight += -0.16;
      boxSlideBottom += Math.exp(2.776);
      boxSlideRight += -Math.exp(0.77);
    } else {
      return;
    }
  } else if (key.down && key.shift) {
    if (planeHeight <= 500) {
      planeHeight -= 1;
      planeAngle = Math.asin(planeHeight / planeHypotenuse);
      boxBottom -= -0.3 / 5;
      boxRight += -0.16 / 5;
      boxSlideBottom += Math.exp(2.776) / 5;
      boxSlideRight += -Math.exp(0.77) / 5;
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
