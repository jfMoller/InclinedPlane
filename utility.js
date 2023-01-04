import { root } from "./node.js";

export function getsCSSPropertyValue(propertyString) {
  return parseFloat(
    window.getComputedStyle(root).getPropertyValue(propertyString)
  );
}

export function convertsAngleFromRadiansToDegreesWithTheseAmountOfDecimals(
  angle,
  decimals
) {
  return ((180 / Math.PI) * angle).toFixed(decimals);
}

export function allowsUserInputBetweenTheseValues(min, max) {
  if (event.target.value < min) {
    event.target.value = min + 1;
  } else if (event.target.value > max) {
    event.target.value = max;
  }
}
