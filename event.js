import { key, userInput } from "./main.js";

export function handlesKeyDown(event) {
 
  if (event.key === "w" || event.key === "W") {
    key.up = true;
  }
  if (event.key === "s" || event.key === "S") {
    key.down = true;
  }
  if (event.key === "Shift") {
    key.shift = true;
  }
  
}
export function handlesKeyUp(event) {
  if (event.key === "w" || event.key === "W") {
    key.up = false;
  }
  if (event.key === "s" || event.key === "S") {
    key.down = false;
  }
  if (event.key === "Shift") {
    key.shift = false;
  }
}

export function handlesChange(event) {
  console.log(event.target.id);
  if (event.target.id === "box-mass-input") {
    userInput.mass = parseFloat(event.target.value);
  }
  if (event.target.id === "gravity-acceleration-input") {
    userInput.g = parseFloat(event.target.value);
  }
  if (event.target.id === "friction-number-input") {
    userInput.frictionNumber = parseFloat(event.target.value);
  }
}
