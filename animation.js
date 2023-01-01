export function animatesBoxToStartSliding(box, boxVelocity, planeAngle) {
  box.setAttribute("class", "box-animation");
  boxVelocity -= planeAngle * 0.5;
}

export function stopsAnimationAndResetsBoxPosition(box, boxVelocity) {
  box.removeAttribute("class", "box-animation");
  boxVelocity = 100;
}
