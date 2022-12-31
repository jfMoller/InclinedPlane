import {
  root,
  box,
  plane,
  gravityVector,
  oppositeCathetus,
  normalVector,
  angleValue,
  fnValue,
  f1Value,
  fμValue,
  fgValue,
  f1Vector,
  frictionVector,
  f2Vector,
  pieChart,
  massInputField,
  gravityInputField,
  frictionInputField,
  angleInputField,
  modelScale,
} from "./nodes.js";
import { handlesKeyDown, handlesKeyUp, handlesChange } from "./event.js";
import { getCSSPropertyValue } from "./utility.js";

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
  handlesUserChangesToModelValues();

  handlesModelScaleBasedOnModelValues();

  calculatesPlaneGeometryAndTrigenometry();

  displaysAngleValue();

  calculatesVectorRatios();

  displayVectorValues();

  handlesVectorPieChart();

  if (f1 > frictionForce) {
    animatesBoxToStartSliding();
  } else {
    stopsAnimationAndResetsBoxPosition();
  }
  maintainsGraphicalPosition();
  requestAnimationFrame(render);
}
render();

function handlesUserChangesToModelValues() {
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

  massInputField.setAttribute("placeholder", mass);
  gravityInputField.setAttribute("placeholder", g);
  frictionInputField.setAttribute("placeholder", frictionNumber);
  angleInputField.setAttribute(
    "placeholder",
    ((180 / Math.PI) * planeAngle).toFixed(2)
  );
}

function calculatesPlaneGeometryAndTrigenometry() {
  planeHypotenuse = Math.sqrt(
    Math.pow(planeHeight, 2) + Math.pow(planeWidth, 2)
  );
  planeAngle = Math.asin(planeHeight / planeHypotenuse);
}

function displaysAngleValue() {
  angleValue.innerText = (57.296 * planeAngle).toFixed(2).toString() + "°";
}

function calculatesVectorRatios() {
  f1 = mg * Math.sin(planeAngle);
  normalForce = mg * Math.cos(planeAngle);
  frictionForce = frictionNumber * normalForce;

  normalVector.style.height = ((planeWidth / 8) * 2).toString() + "px";

  gravityVector.style.height = (planeHeight / 16).toString() + "px";

  oppositeCathetus.style.width = f1.toFixed(2).toString() + "px";
  oppositeCathetus.style.top = (normalForce * 2).toFixed(2).toString() + "px";

  f1Vector.style.width = (f1 * 2).toFixed(2).toString() + "px";
  frictionVector.style.width = (frictionForce * 2).toFixed(2).toString() + "px";
  gravityVector.style.height = (mg * 2).toFixed(2).toString() + "px";
  normalVector.style.height = (normalForce * 2).toFixed(2).toString() + "px";
  f2Vector.style.height = (normalForce * 2).toFixed(2).toString() + "px";
}

function displayVectorValues() {
  fnValue.innerText = normalForce.toFixed(2).toString() + " N";
  fμValue.innerText = frictionForce.toFixed(2).toString() + " N";
  fgValue.innerText = mg.toFixed(2).toString() + " N";
  f1Value.innerText = f1.toFixed(2).toString() + " N";
}

function animatesBoxToStartSliding() {
  box.setAttribute("class", "box-animation");
  boxVelocity -= planeAngle * 0.5;
}

function stopsAnimationAndResetsBoxPosition() {
  box.removeAttribute("class", "box-animation");
  boxVelocity = 100;
}

function handlesModelScaleBasedOnModelValues() {
  if (mass >= 0 && mass < 10) {
    scale = 0.9;
    modelFontSize = 15;
    modelScale.style.scale = scale.toString();
    model.style.fontSize = modelFontSize.toString() + "px";
  }
  if (mass >= 10 && mass < 12) {
    scale = 0.8;
    modelFontSize = 20;
    modelScale.style.scale = scale;
    model.style.fontSize = modelFontSize.toString() + "px";
  }
  if (mass >= 12 && mass < 19) {
    scale = 0.65;
    modelFontSize = 25;
    modelScale.style.scale = scale.toString();
    model.style.fontSize = modelFontSize.toString() + "px";
  }
  if (mass >= 19 && mass < 29) {
    scale = 0.55;
    modelFontSize = 30;
    modelScale.style.scale = scale.toString();
    model.style.fontSize = modelFontSize.toString() + "px";
  }
  if (mass >= 29 && mass < 39) {
    scale = 0.45;
    modelFontSize = 35;
    modelScale.style.scale = scale.toString();
    model.style.fontSize = modelFontSize.toString() + "px";
  }
  if (mass >= 39 && mass < 49) {
    scale = 0.4;
    modelFontSize = 40;
    modelScale.style.scale = scale.toString();
    model.style.fontSize = modelFontSize.toString() + "px";
  }
  if (mass >= 49 && mass < 59) {
    scale = 0.35;
    modelFontSize = 45;
    modelScale.style.scale = scale.toString();
    model.style.fontSize = modelFontSize.toString() + "px";
  }
  if (mass >= 59 && mass < 69) {
    scale = 0.3;
    modelFontSize = 50;
    modelScale.style.scale = scale.toString();
    model.style.fontSize = modelFontSize.toString() + "px";
  }
  if (mass >= 69 && mass < 79) {
    scale = 0.25;
    modelFontSize = 70;
    modelScale.style.scale = scale.toString();
    model.style.fontSize = modelFontSize.toString() + "px";
  }
  if (mass >= 79 && mass < 100) {
    scale = 0.22;
    modelFontSize = 80;
    modelScale.style.scale = scale.toString();
    model.style.fontSize = modelFontSize.toString() + "px";
  }
  if (mass >= 100) {
    scale = 0.22;
    modelFontSize = 90;
    modelScale.style.scale = scale.toString();
    model.style.fontSize = modelFontSize.toString() + "px";
  }
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

function handlesVectorPieChart() {
  let combinedValue;
  let f1Ratio;
  let fμRatio;
  let f1Color;
  let fμColor;

  combinedValue = f1 + frictionForce;
  f1Ratio = (f1 / combinedValue) * 100;
  fμRatio = (frictionForce / combinedValue) * 100;

  f1Color = "#59cd90";
  fμColor = "#ee6352";

  pieChart.style.backgroundImage = //only winRatio is needed for the chart
    "conic-gradient(" +
    fμColor +
    " 0 " +
    fμRatio.toString() + //the % of winning
    "%," +
    f1Color +
    " 0 100%)"; //the remaining % amount illustrates the % of losing
}

/*   console.log(window.getComputedStyle(root).getPropertyValue("--box_slide_bottom"));
 */
