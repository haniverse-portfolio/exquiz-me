import { atom } from "recoil";
import {
  connectTestServerApiAddress,
  connectMainServerApiAddress,
  dtypeName,
  problemInput,
  optionInput,
  problemsetInput,
} from "./ConstValues";

export const indexIsLogined = atom({
  key: "indexIsLogined",
  default: "0",
});

export const indexMembership = atom({
  key: "indexIsLogined",
  default: "0",
});

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

export const createImageWord = atom({
  key: "createImageWord",
  default: "",
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
  key: "createIsImageLoading",
  default: false,
});

export const createStep = atom({
  key: "createStep",
  default: 0,
});

export const partPin = atom({
  key: "partPin",
  default: "0",
});

export const language = atom({
  key: "language",
  default: "KO",
});

export const createCompleteModal = atom({
  key: "createCompleteModal",
  default: "0",
});

export const createTabModal = atom({
  key: "createTabModal",
  default: "0",
});

export const createProblemsetDrawer = atom({
  key: "createProblemsetDrawer",
  default: "0",
});

export const playProblemset = atom({
  key: "playProblemset",
  default: {},
});

export const playProblem = atom({
  key: "playProblem",
  default: [
    {
      answer: "0",
      description: "",
      dtype: "MultipleChoiceProblem",
      idx: 0,
      picture: "",
      problemsetId: 0,
      score: 125,
      timelimit: 30,
      title: "",
    },
  ],
});

export const playOption = atom({
  key: "playOption",
  default: [{}],
});

export const playPin = atom({
  key: "playPin",
  default: "111",
});
