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
    ((180 / Math.PI) * plane.angle).toFixed(2) //conversion from radians to degrees
  );
}

export function handlesModelScaleBasedOnModelValues(model) {
  if (model.mass >= 0 && model.mass < 10) {
    model.scale = 0.9;
    model.fontSize = 15;
    modelScale.style.scale = model.scale.toString();
    modelNode.style.fontSize = model.fontSize.toString() + "px";
  }
  if (model.mass >= 10 && model.mass < 12) {
    model.scale = 0.8;
    model.fontSize = 20;
    modelScale.style.scale = model.scale;
    modelNode.style.fontSize = model.fontSize.toString() + "px";
  }
  if (model.mass >= 12 && model.mass < 19) {
    model.scale = 0.65;
    model.fontSize = 25;
    modelScale.style.scale = model.scale.toString();
    modelNode.style.fontSize = model.fontSize.toString() + "px";
  }
  if (model.mass >= 19 && model.mass < 29) {
    model.scale = 0.55;
    model.fontSize = 30;
    modelScale.style.scale = model.scale.toString();
    modelNode.style.fontSize = model.fontSize.toString() + "px";
  }
  if (model.mass >= 29 && model.mass < 39) {
    model.scale = 0.45;
    model.fontSize = 35;
    modelScale.style.scale = model.scale.toString();
    modelNode.style.fontSize = model.fontSize.toString() + "px";
  }
  if (model.mass >= 39 && model.mass < 49) {
    model.scale = 0.4;
    model.fontSize = 40;
    modelScale.style.scale = model.scale.toString();
    modelNode.style.fontSize = model.fontSize.toString() + "px";
  }
  if (model.mass >= 49 && model.mass < 59) {
    model.scale = 0.35;
    model.fontSize = 45;
    modelScale.style.scale = model.scale.toString();
    modelNode.style.fontSize = model.fontSize.toString() + "px";
  }
  if (model.mass >= 59 && model.mass < 69) {
    model.scale = 0.3;
    model.fontSize = 50;
    modelScale.style.scale = model.scale.toString();
    modelNode.style.fontSize = model.fontSize.toString() + "px";
  }
  if (model.mass >= 69 && model.mass < 79) {
    model.scale = 0.25;
    model.fontSize = 70;
    modelScale.style.scale = model.scale.toString();
    modelNode.style.fontSize = model.fontSize.toString() + "px";
  }
  if (model.mass >= 79 && model.mass < 100) {
    model.scale = 0.22;
    model.fontSize = 80;
    modelScale.style.scale = model.scale.toString();
    modelNode.style.fontSize = model.fontSize.toString() + "px";
  }
  if (model.mass >= 100) {
    model.scale = 0.22;
    model.fontSize = 90;
    modelScale.style.scale = model.scale.toString();
    modelNode.style.fontSize = model.fontSize.toString() + "px";
  }
}

export function displaysAngleValue(plane) {
  return (angleValue.innerText =
    (57.296 * plane.angle).toFixed(2).toString() + "°");
}

export function updatesVectorRatios(
  plane, vector
) {
  normalVector.style.height = ((plane.width / 8) * 2).toString() + "px";
  gravityVector.style.height = (plane.height / 16).toString() + "px";
  oppositeCathetus.style.width = vector.f1.toFixed(2).toString() + "px";
  oppositeCathetus.style.top = (vector.normalForce * 2).toFixed(2).toString() + "px";
  f1Vector.style.width = (f1 * 2).toFixed(2).toString() + "px";
  frictionVector.style.width = (vector.frictionForce * 2).toFixed(2).toString() + "px";
  gravityVector.style.height = (vector.mg * 2).toFixed(2).toString() + "px";
  normalVector.style.height = (vector.normalForce * 2).toFixed(2).toString() + "px";
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
  let f1Ratio;
  let fμRatio;
  let f1Color;
  let fμColor;

  combinedValue = vector.f1 + vector.frictionForce;
  f1Ratio = (vector.f1 / combinedValue) * 100;
  fμRatio = (vector.frictionForce / combinedValue) * 100;

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
