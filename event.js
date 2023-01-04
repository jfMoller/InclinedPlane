import { key, userInput } from "./model.js";
import { allowsUserInputBetweenTheseValues } from "./utility.js";

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
  if (event.target.id === "box-mass-input") {
    allowsUserInputBetweenTheseValues(0, 100);
    userInput.mass = parseFloat(event.target.value);
  }

  if (event.target.id === "gravity-acceleration-input") {
    allowsUserInputBetweenTheseValues(3.59, 13.59);
    userInput.g = parseFloat(event.target.value);
  }
  if (event.target.id === "friction-number-input") {
    allowsUserInputBetweenTheseValues(0, 4);
    userInput.frictionNumber = parseFloat(event.target.value);
  }
}
