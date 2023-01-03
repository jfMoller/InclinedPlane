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
