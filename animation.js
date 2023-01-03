import { root, planeNode, boxNode, gravityVector } from "./node.js";

export function animatesBoxToStartSliding(box, plane) {
  boxNode.setAttribute("class", "box-animation");
  /*adjusts the animation velocity based on the planes angle, 
the velocity value = animation-duration*/
  box.velocity -= plane.angle * 0.5;
}

export function stopsAnimationAndResetsBoxPosition(box) {
  boxNode.removeAttribute("class", "box-animation");
  /*resets the animation velocity, velocity 0 = max velocity (no animation-duration), 
  whereas a bigger velocity value equals a progessively slower velocity (longer animation-duration)*/
  box.velocity = 100;
}

export function updatesGraphicalPosition(plane, box) {
  //maintains the dynamic height of the plane
  planeNode.style.borderBottomWidth = plane.height.toString() + "px";

  //maintains box angle and rotation in relation to the plane surface
  boxNode.style.transform = "rotate(" + -plane.angle.toString() + "rad)";
  boxNode.style.bottom = box.bottom.toString() + "px";
  boxNode.style.right = box.right.toString() + "px";

  //maintains contact between the box and the plane whilst animation is active
  root.style.setProperty("--box_bottom", box.bottom + "px");
  root.style.setProperty("--box_right", box.right + "px");
  root.style.setProperty("--box_slide_bottom", box.slideBottom + "px");
  root.style.setProperty("--box_slide_right", box.slideRight + "px");
  root.style.setProperty("--box_velocity", box.velocity + "s");
  root.style.setProperty("--animation_delay", box.animationDelay + "s");

  //maintains the vertical axis of gravity in relation to the box and plane
  gravityVector.style.transform = "rotate(" + plane.angle.toString() + "rad)";
}
