import { root, planeNode, boxNode, gravityVector } from "./node.js";

export function animatesBoxToStartSliding(box, boxVelocity, planeAngle) {
  box.setAttribute("class", "box-animation");
  boxVelocity -= planeAngle * 0.5;
}

export function stopsAnimationAndResetsBoxPosition(box, boxVelocity) {
  box.removeAttribute("class", "box-animation");
  boxVelocity = 100;
}

export function updatesGraphicalPosition(
  planeHeight,
  planeAngle,
  boxBottom,
  boxRight,
  boxSlideBottom,
  boxSlideRight,
  boxVelocity,
  animationDelay
) {
  planeNode.style.borderBottomWidth = planeHeight.toString() + "px";
  boxNode.style.transform = "rotate(" + -planeAngle.toString() + "rad)";
  boxNode.style.bottom = boxBottom.toString() + "px";
  boxNode.style.right = boxRight.toString() + "px";

  root.style.setProperty("--box_bottom", boxBottom + "px");
  root.style.setProperty("--box_right", boxRight + "px");
  root.style.setProperty("--box_slide_bottom", boxSlideBottom + "px");
  root.style.setProperty("--box_slide_right", boxSlideRight + "px");
  root.style.setProperty("--box_velocity", boxVelocity + "s");
  root.style.setProperty("--animation_delay", animationDelay + "s");

  gravityVector.style.transform = "rotate(" + planeAngle.toString() + "rad)";
}
