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
let g = 9.82;
let frictionNumber = 0.42; //random value, non material surface

let mg = mass * g;
let normalForce;
let f1;
let frictionForce;

export let userInput = {
  mass: null,
  g: null,
  frictionNumber: null,
  angle: null,
};

export let key = { up: false, down: false };
addEventListener("keydown", handlesKeyDown);
addEventListener("keyup", handlesKeyUp);

massInputField.addEventListener("change", handlesChange);
gravityInputField.addEventListener("change", handlesChange);
frictionInputField.addEventListener("change", handlesChange);
angleInputField.addEventListener("change", handlesChange);

function render() {
  //handles user change to mass, g and friction number
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

  //establishes ratios
  planeHypotenuse = Math.sqrt(
    Math.pow(planeHeight, 2) + Math.pow(planeWidth, 2)
  );
  planeAngle = Math.asin(planeHeight / planeHypotenuse);

  //when non-moving
  f1 = mg * Math.sin(planeAngle);
  normalForce = mg * Math.cos(planeAngle);
  frictionForce = frictionNumber * normalForce;

  //handles animation start
  if (f1 > frictionForce) {
    box.setAttribute("class", "box-animation");
    boxVelocity -= planeAngle * 0.5;
  } else {
    box.removeAttribute("class", "box-animation");
    boxVelocity = 100;
  }

  //visual model scale in relation to vectors
  
/*   if (((1 - (mg * 0.001)).toString() > 1) ||
  ((1 - (mg * 0.001)).toString() < 0)) {
    modelScale.style.scale = 1;
  } */
 
    modelScale.style.scale = (1 - (mg * 0.001)).toString();
   if (((1 - (mg * 0.001))) > 1) {
    modelScale.style.scale = 0.5;
   }


  //visual ratios for box-triangle
  normalVector.style.height = ((planeWidth / 8) * 2).toString() + "px";

  gravityVector.style.height = (200 + planeHeight / 16).toString() + "px";

  oppositeCathetus.style.width = f1.toFixed(2).toString() + "px";
  oppositeCathetus.style.top = (normalForce * 2).toFixed(2).toString() + "px";

  //ratios for F1 and Fμ
  f1Vector.style.width = (f1 * 2).toFixed(2).toString() + "px";
  frictionVector.style.width = (frictionForce * 2).toFixed(2).toString() + "px";
  gravityVector.style.height = (mg * 2).toFixed(2).toString() + "px";
  normalVector.style.height = (normalForce * 2).toFixed(2).toString() + "px";
  f2Vector.style.height = (normalForce * 2).toFixed(2).toString() + "px";

  //visual metric displays
  angleValue.innerText =
    "θ = " + (57.296 * planeAngle).toFixed(2).toString() + "°";
  fnValue.innerText = normalForce.toFixed(2).toString() + " N";
  fμValue.innerText = frictionForce.toFixed(2).toString() + " N";
  fgValue.innerText = mg.toFixed(2).toString() + " N";
  f1Value.innerText = f1.toFixed(2).toString() + " N";

  //model values
  massInputField.setAttribute("placeholder", mass);
  gravityInputField.setAttribute("placeholder", g);
  frictionInputField.setAttribute("placeholder", frictionNumber);
  angleInputField.setAttribute(
    "placeholder",
    ((180 / Math.PI) * planeAngle).toFixed(2)
  );

  maintainsGraphicalPosition();
  handlesPieChart();
  requestAnimationFrame(render);
}
render();

export function maintainsGraphicalPosition() {
  if (key.up) {
    if (planeHeight <= 500) {
      planeHeight += 5;
      planeAngle = Math.asin(planeHeight / planeHypotenuse);
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

function handlesPieChart() {
  let combinedValue;
  let f1Ratio;
  let fμRatio;
  let f1Color;
  let fμColor;

  combinedValue = f1 + frictionForce;
  f1Ratio = (f1 / combinedValue) * 100;
  fμRatio = (frictionForce / combinedValue) * 100;

  f1Color = "orange";
  fμColor = "lightgreen";

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
