import {
  massInputField,
  gravityInputField,
  frictionInputField,
  angleInputField,
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

export function updatesModelValues(mass, g, frictionNumber, planeAngle) {
  massInputField.setAttribute("placeholder", mass);
  gravityInputField.setAttribute("placeholder", g);
  frictionInputField.setAttribute("placeholder", frictionNumber);
  angleInputField.setAttribute(
    "placeholder",
    ((180 / Math.PI) * planeAngle).toFixed(2)
  );
}

export function handlesModelScaleBasedOnModelValues(
  mass,
  scale,
  modelFontSize
) {
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

export function displaysAngleValue(planeAngle) {
  return (angleValue.innerText =
    (57.296 * planeAngle).toFixed(2).toString() + "°");
}

export function updatesVectorRatios(
  planeWidth,
  planeHeight,
  f1,
  normalForce,
  frictionForce,
  mg
) {
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

export function displayVectorValues(normalForce, frictionForce, mg, f1) {
  fnValue.innerText = normalForce.toFixed(2).toString() + " N";
  fμValue.innerText = frictionForce.toFixed(2).toString() + " N";
  fgValue.innerText = mg.toFixed(2).toString() + " N";
  f1Value.innerText = f1.toFixed(2).toString() + " N";
}

export function handlesVectorPieChart(f1, frictionForce) {
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
