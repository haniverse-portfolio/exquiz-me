import { atom } from "recoil";
import {
  connectServerApiAddress,
  dtypeName,
  problemInput,
  optionInput,
  problemsetInput,
} from "./ConstValues";

export const createTargetIdx = atom({
  key: "createTargetIdx",
  default: 0,
});

export const createProblemIdx = atom({
  key: "createProblemIdx",
  default: 0,
});

export const createTabCurrentIdx = atom({
  key: "createTabCurrentIdx",
  default: 0,
});

export const createTabNextIdx = atom({
  key: "createTabNextIdx",
  default: 0,
});

export const createProblemset = atom({
  key: "createProblemset",
  default: problemsetInput,
});

export const createProblem = atom({
  key: "createProblem",
  default: problemInput,
});

export const createOption = atom({
  key: "createOption",
  default: optionInput,
});

export const createScore = atom({
  key: "createScore",
  default: 50,
});

export const createTimelimit = atom({
  key: "createTimelimit",
  default: 50,
});

export const createImageURL = atom({
  key: "createImageURL",
  default: { url: "" },
});

export const createImageList = atom({
  key: "createImageList",
  default: [],
});

export const createIsImageLoading = atom({
  key : "createIsImageLoading",
  default: false,
})

export const createStep = atom({
  key : "createStep",
  default: 0
})