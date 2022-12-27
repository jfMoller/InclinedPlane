import { key, userInput } from "./main.js";

export function handlesKeyDown(event) {
  if (event.key === "w" || event.key === "W") {
    key.up = true;
  }
  if (event.key === "s" || event.key === "S") {
    key.down = true;
  }
}
export function handlesKeyUp(event) {
  if (event.key === "w" || event.key === "W") {
    key.up = false;
  }
  if (event.key === "s" || event.key === "S") {
    key.down = false;
  }
}

export function handlesChange(event) {
  if (event.target.id === "box-mass-input") {
    userInput.mass = parseFloat(event.target.value);

  if (event.target.id === "gravity-acceleration-input") {
    userInput.g = parseFloat(event.target.value);
  }
  if (event.target.id === "friction-number-input") {
    userInput.frictionNumber = parseFloat(event.target.value);
  }
  if (event.target.id === "incline-angle-input") {
    userInput.angle = parseFloat(event.target.value);
  }
}
}