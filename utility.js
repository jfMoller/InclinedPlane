import { root } from "./nodes.js";

export function getCSSPropertyValue(propertyString) {
    return parseFloat(window.getComputedStyle(root).getPropertyValue(propertyString));
}