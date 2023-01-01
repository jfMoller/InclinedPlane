import { root } from "./node.js";

export function getCSSPropertyValue(propertyString) {
    return parseFloat(window.getComputedStyle(root).getPropertyValue(propertyString));
}