import {
  boxNode,
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
import { updatesGraphicalPosition } from "./animation.js";

//plane geometry
let plane = {
  height: getCSSPropertyValue("--plane_height"),
  width: getCSSPropertyValue("--plane_width"),
  hypotenuse: null, //calculated dynamically
  angle: null, //caclculated dynamically
};

//box animation properties
let box = {
  bottom: getCSSPropertyValue("--box_bottom"),
  right: getCSSPropertyValue("--box_right"),
  slideBottom: getCSSPropertyValue("--box_slide_bottom"),
  slideRight: getCSSPropertyValue("--box_slide_right"),
  velocity: getCSSPropertyValue("--box_velocity"),
  animationDelay: getCSSPropertyValue("--animation_delay"),
};

//values for starting model
let model = {
  mass: 10, //kg
  g: 9.82, //ms^2
  frictionNumber: 0.42, //dimensionless (does not have a unit)
  scale: getCSSPropertyValue("--model_scale"),
  fontSize: getCSSPropertyValue("--model_font_size"),
};

//vector equations for when box is unmoving
let vector = {
  mg: model.mass * model.g,
  f1: model.mg * Math.sin(plane.angle),
  normalForce: model.mg * Math.cos(plane.angle),
  frictionForce: model.frictionNumber * model.normalForce,
};

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

  updatesModelValues(model, plane);

  handlesModelScaleBasedOnModelValues(model);

  calculatesPlaneGeometryAndTrigenometry();

  displaysAngleValue(plane.angle);

  calculatesVectors();

  updatesVectorRatios(
    plane.width,
    plane.height,
    vector.f1,
    vector.normalForce,
    vector.frictionForce,
    vector.mg
  );

  displayVectorValues(
    vector.normalForce,
    vector.frictionForce,
    vector.mg,
    vector.f1
  );

  handlesVectorPieChart(vector.f1, vector.frictionForce);

  if (vector.f1 > vector.frictionForce) {
    animatesBoxToStartSliding();
  } else {
    stopsAnimationAndResetsBoxPosition();
  }
  maintainsGraphicalPosition();
  updatesGraphicalPosition(
    plane.height,
    plane.angle,
    box.bottom,
    box.right,
    box.slideBottom,
    box.slideRight,
    box.velocity,
    box.animationDelay
  );
  requestAnimationFrame(render);
}
render();

export function handlesUserInput() {
  if (userInput.mass !== null) {
    model.mass = userInput.mass;
    vector.mg = model.mass * model.g;
  }
  if (userInput.g !== null) {
    model.g = userInput.g;
    vector.mg = model.mass * model.g;
  }
  if (userInput.frictionNumber !== null) {
    model.frictionNumber = userInput.frictionNumber;
  }
}

function calculatesPlaneGeometryAndTrigenometry() {
  plane.hypotenuse = Math.sqrt(
    Math.pow(plane.height, 2) + Math.pow(plane.width, 2)
  );
  plane.angle = Math.asin(plane.height / plane.hypotenuse);
}

function calculatesVectors() {
  vector.f1 = vector.mg * Math.sin(plane.angle);
  vector.normalForce = vector.mg * Math.cos(plane.angle);
  vector.frictionForce = model.frictionNumber * vector.normalForce;
}

function animatesBoxToStartSliding() {
  boxNode.setAttribute("class", "box-animation");
  box.velocity -= plane.angle * 0.5;
}

function stopsAnimationAndResetsBoxPosition() {
  boxNode.removeAttribute("class", "box-animation");
  box.velocity = 100;
}

export function maintainsGraphicalPosition() {
  if (key.up && !key.shift) {
    if (plane.height <= 500) {
      plane.height += 5;
      box.bottom -= 0.3;
      box.right += 0.16;
      box.slideBottom += -Math.exp(2.776);
      box.slideRight += Math.exp(0.77);
    } else {
      return;
    }
  } else if (key.up && key.shift) {
    if (plane.height <= 500) {
      plane.height += 1;
      plane.angle = Math.asin(plane.height / plane.hypotenuse);
      box.bottom -= 0.3 / 5;
      box.right += 0.16 / 5;
      box.slideBottom += -Math.exp(2.776) / 5;
      box.slideRight += Math.exp(0.77) / 5;
    }
  } else if (key.down && !key.shift) {
    if (plane.height >= 40) {
      plane.height -= 5;
      box.bottom -= -0.3;
      box.right += -0.16;
      box.slideBottom += Math.exp(2.776);
      box.slideRight += -Math.exp(0.77);
    } else {
      return;
    }
  } else if (key.down && key.shift) {
    if (plane.height <= 500) {
      plane.height -= 1;
      plane.angle = Math.asin(plane.height / plane.hypotenuse);
      box.bottom -= -0.3 / 5;
      box.right += -0.16 / 5;
      box.slideBottom += Math.exp(2.776) / 5;
      box.slideRight += -Math.exp(0.77) / 5;
    }
  }
}
