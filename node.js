//model
export let modelScale = document.querySelector("#model-scale");
export let modelNode = document.querySelector("#model");

//root values
export const root = document.documentElement;

//shapes
export let boxNode = document.querySelector("#box");
export let planeNode = document.querySelector("#plane");

//force vectors
export let normalVector = document.querySelector("#fn");
export let frictionVector = document.querySelector("#ff");
export let gravityVector = document.querySelector("#fg");
export let f1Vector = document.querySelector("#f1");
export let f2Vector = document.querySelector("#f2");

//from the box-triangle
export let oppositeCathetus = document.querySelector("#mk");

//input-fields
export let massInputField = document.querySelector("#box-mass-input");
export let gravityInputField = document.querySelector(
  "#gravity-acceleration-input"
);
export let frictionInputField = document.querySelector(
  "#friction-number-input"
);
export let angleInputField = document.querySelector("#incline-angle-input");

//metric displays
export let angleValue = document.querySelector("#angle-text");
export let fnValue = document.querySelector("#fn-text");
export let f1Value = document.querySelector("#f1-text");
export let fμValue = document.querySelector("#fμ-text");
export let fgValue = document.querySelector("#fg-text");

//pie-chart
export let pieChart = document.querySelector("#slide-pie-chart");
