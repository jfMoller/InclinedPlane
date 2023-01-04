export function calculatesPlaneHypotenuseAndAngle(plane) {
  plane.hypotenuse = Math.sqrt(
    Math.pow(plane.height, 2) + Math.pow(plane.width, 2)
  );
  plane.angle = Math.asin(plane.height / plane.hypotenuse);
}

export function calculatesVectors(vector, plane, model) {
  vector.f1 = vector.mg * Math.sin(plane.angle);
  vector.normalForce = vector.mg * Math.cos(plane.angle);
  vector.frictionForce = model.frictionNumber * vector.normalForce;
}

export function calculatesGraphicalPosition(key, plane, box) {
  if (key.up && !key.shift) {
    if (plane.height <= 500) {
      plane.height += 5;
      box.bottom += -0.3;
      box.right += 0.16;
      box.slideBottom += -Math.exp(2.776);
      box.slideRight += Math.exp(0.77);
    } else {
      return;
    }
  } else if (key.up && key.shift) {
    if (plane.height <= 500) {
      plane.height += 1;
      box.bottom += -(0.3 / 5);
      box.right += (0.16 / 5);
      box.slideBottom += -(Math.exp(2.776) / 5);
      box.slideRight += (Math.exp(0.77) / 5);
    }
  } else if (key.down && !key.shift) {
    if (plane.height >= 40) {
      plane.height += -5;
      box.bottom += +0.3;
      box.right += -0.16;
      box.slideBottom += Math.exp(2.776);
      box.slideRight += -Math.exp(0.77);
    } else {
      return;
    }
  } else if (key.down && key.shift) {
    if (plane.height <= 500) {
      plane.height += -1;
      box.bottom += -(0.3 / 5);
      box.right += -(0.16 / 5);
      box.slideBottom += (Math.exp(2.776) / 5);
      box.slideRight += -(Math.exp(0.77) / 5);
    }
  }
}
