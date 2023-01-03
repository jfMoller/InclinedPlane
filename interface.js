import {
  massInputField,
  gravityInputField,
  frictionInputField,
  angleInputField,
  modelNode,
  modelScale,
  angleValue,
  normalVector,
  frictionVector,
  gravityVector,
  f1Vector,
  f2Vector,
  oppositeCathetus,
  fnValue,
  fμValue,
  fgValue,
  f1Value,
  pieChart,
} from "./node.js";
import { convertsAngleFromRadiansToDegreesWithTheseAmountOfDecimals } from "./utility.js";

export function handlesUserInput(userInput, model, vector) {
  if (userInput.mass !== null) {
    model.mass = userInput.mass;
    //maintains dynamic ratio between vectors after user input
    vector.mg = model.mass * model.g;
  }
  if (userInput.g !== null) {
    model.g = userInput.g;
    //dito
    vector.mg = model.mass * model.g;
  }
  if (userInput.frictionNumber !== null) {
    model.frictionNumber = userInput.frictionNumber;
  }
}

export function updatesModelValues(model, plane) {
  massInputField.setAttribute("placeholder", model.mass);
  gravityInputField.setAttribute("placeholder", model.g);
  frictionInputField.setAttribute("placeholder", model.frictionNumber);
  angleInputField.setAttribute(
    "placeholder",
    convertsAngleFromRadiansToDegreesWithTheseAmountOfDecimals(plane.angle, 2)
  );
}

export function adjustsModelScaleBasedOnModelValues(model) {
  //hard coded to ensure model readability
  let minMasses = [0, 10, 12, 19, 29, 39, 49, 59, 69, 79];
  let maxMasses = [12, 19, 29, 39, 49, 59, 69, 79, 79, 100];
  let scales = [0.9, 0.8, 0.65, 0.55, 0.45, 0.4, 0.35, 0.3, 0.25, 0.22];
  let fontSizes = [15, 20, 25, 30, 35, 40, 45, 50, 70, 80];

  for (let i = 0; i < 10; i++) {
    let minMass = minMasses[i];
    let maxMass = maxMasses[i];
    let scale = scales[i];
    let fontSize = fontSizes[i];

    if (model.mass >= minMass && model.mass < maxMass) {
      model.scale = scale;
      model.fontSize = fontSize;
    }
  }
  if (model.mass >= 100) {
    model.scale = 0.22;
    model.fontSize = 90;
  }
  modelScale.style.scale = model.scale.toString();
  modelNode.style.fontSize = model.fontSize.toString() + "px";
}

export function displaysAngleValue(plane) {
  return (angleValue.innerText =
    convertsAngleFromRadiansToDegreesWithTheseAmountOfDecimals(
      plane.angle,
      2
    ).toString() + "°");
}

export function updatesVectorRatios(plane, vector) {
  normalVector.style.height = ((plane.width / 8) * 2).toString() + "px";

  gravityVector.style.height = (plane.height / 16).toString() + "px";

  oppositeCathetus.style.width = vector.f1.toFixed(2).toString() + "px";
  oppositeCathetus.style.top =
    (vector.normalForce * 2).toFixed(2).toString() + "px";

  f1Vector.style.width = (vector.f1 * 2).toFixed(2).toString() + "px";
  frictionVector.style.width =
    (vector.frictionForce * 2).toFixed(2).toString() + "px";

  gravityVector.style.height = (vector.mg * 2).toFixed(2).toString() + "px";
  normalVector.style.height =
    (vector.normalForce * 2).toFixed(2).toString() + "px";

  f2Vector.style.height = (vector.normalForce * 2).toFixed(2).toString() + "px";
}

export function displayVectorValues(vector) {
  fnValue.innerText = vector.normalForce.toFixed(2).toString() + " N";
  fμValue.innerText = vector.frictionForce.toFixed(2).toString() + " N";
  fgValue.innerText = vector.mg.toFixed(2).toString() + " N";
  f1Value.innerText = vector.f1.toFixed(2).toString() + " N";
}

export function handlesVectorPieChart(vector) {
  let combinedValue;
  let fμRatio;
  let f1Color;
  let fμColor;

  combinedValue = vector.f1 + vector.frictionForce;
  fμRatio = (vector.frictionForce / combinedValue) * 100;
  f1Color = "#59cd90";
  fμColor = "#ee6352";

  pieChart.style.backgroundImage = //only fμRatio is required for the chart
    "conic-gradient(" +
    fμColor +
    " 0 " +
    fμRatio.toString() + //the size of the fμ Ratio in %
    "%," +
    f1Color +
    " 0 100%)"; //the remaining % illustrates the f1 ratio
}
