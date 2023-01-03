import { getsCSSPropertyValue } from "./utility.JS";
import { handlesKeyDown, handlesKeyUp, handlesChange } from "./event.js";
import {
  massInputField,
  gravityInputField,
  frictionInputField,
  angleInputField,
} from "./node.js";

//plane geometry
export let plane = {
  height: getsCSSPropertyValue("--plane_height"),
  width: getsCSSPropertyValue("--plane_width"),
  hypotenuse: null, //calculated dynamically
  angle: null, //caclculated dynamically
};

//box animation properties
export let box = {
  bottom: getsCSSPropertyValue("--box_bottom"),
  right: getsCSSPropertyValue("--box_right"),
  slideBottom: getsCSSPropertyValue("--box_slide_bottom"),
  slideRight: getsCSSPropertyValue("--box_slide_right"),
  velocity: getsCSSPropertyValue("--box_velocity"),
  animationDelay: getsCSSPropertyValue("--animation_delay"),
};

//values for starting model
export let model = {
  mass: 10, //kg
  g: 9.82, //ms^2
  frictionNumber: 0.42, //dimensionless (does not have a unit)
  scale: getsCSSPropertyValue("--model_scale"),
  fontSize: getsCSSPropertyValue("--model_font_size"),
};

//vector equations for when box is unmoving
export let vector = {
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
