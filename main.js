import {
  handlesUserInput,
  updatesModelValues,
  handlesModelScaleBasedOnModelValues,
  displaysAngleValue,
  updatesVectorRatios,
  displayVectorValues,
  handlesVectorPieChart,
} from "./interface.js";
import {
  calculatesPlaneGeometryAndTrigenometry,
  calculatesVectors,
  calculatesGraphicalPosition,
} from "./math.js";
import {
  updatesGraphicalPosition,
  animatesBoxToStartSliding,
  stopsAnimationAndResetsBoxPosition,
} from "./animation.js";
import { plane, box, model, vector, key, userInput } from "./model.js";

function rendersModelEveryFrame() {
  handlesUserInput(userInput, model, vector);

  updatesModelValues(model, plane);

  handlesModelScaleBasedOnModelValues(model);

  calculatesPlaneGeometryAndTrigenometry(plane);

  displaysAngleValue(plane);

  calculatesVectors(vector, plane, model);

  updatesVectorRatios(plane, vector);

  displayVectorValues(vector);

  handlesVectorPieChart(vector);

  if (vector.f1 > vector.frictionForce) {
    animatesBoxToStartSliding(box, plane);
  } else {
    stopsAnimationAndResetsBoxPosition(box);
  }
  calculatesGraphicalPosition(key, plane, box);
  updatesGraphicalPosition(plane, box);
  requestAnimationFrame(rendersModelEveryFrame);
}
rendersModelEveryFrame();
