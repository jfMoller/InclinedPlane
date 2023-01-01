//model
export let modelScale = document.querySelector("#model-scale");
export let model = document.querySelector("#model");

//shapes
export const root = document.documentElement;
export let box = document.querySelector("#box");
export let plane = document.querySelector("#plane");

//force vectors
export let normalVector = document.querySelector("#fn");
export let frictionVector = document.querySelector("#ff");
export let gravityVector = document.querySelector("#fg");
export let f1Vector = document.querySelector("#f1");
export let f2Vector = document.querySelector("#f2");

//from the box-triangle
export let oppositeCathetus = document.querySelector("#mk");

//metric displays
export let angleValue = document.querySelector("#angle-text");
export let fnValue = document.querySelector("#fn-text");
export let f1Value = document.querySelector("#f1-text");
export let fμValue = document.querySelector("#fμ-text");
export let fgValue = document.querySelector("#fg-text");

//model values
export let massInputField = document.querySelector("#box-mass-input");
export let gravityInputField = document.querySelector("#gravity-acceleration-input");
export let frictionInputField = document.querySelector("#friction-number-input");
export let angleInputField = document.querySelector("#incline-angle-input");



//pie-chart
export let pieChart = document.querySelector("#slide-pie-chart");