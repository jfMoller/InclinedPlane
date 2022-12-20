import { key } from "./main.js";

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
