import { atom } from "recoil";
import {
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
  key: "indexMembership",
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
  default: "",
});

export const inboxProblemsetIdx = atom({
  key: "inboxProblemsetIdx",
  default: 0,
});

export const inboxProblemset = atom({
  key: "inboxProblemset",
  default: [{ ...problemsetInput }],
});

export const inboxProblem = atom({
  key: "inboxProblem",
  default: problemInput,
});

export const inboxOption = atom({
  key: "inboxOption",
  default: optionInput,
});

export const inboxMaxpart = atom({
  key: "inboxMaxpart",
  default: 30,
});

export const indexIsModalOpened = atom({
  key: "indexIsModalOpened",
  default: "0",
});

export const indexToken = atom({
  key: "indexToken",
  default: "0",
});

export const indexUserInfo = atom({
  key: "indexUserInfo",
  default: {
    accessToken: null,
    email: "",
    nickname: "",
    picture: "",
    role: "",
    username: "",
  },
});

export const playParticipants = atom({
  key: "playParticipants",
  default: [
    {
      id: 0,
      sessionId: "",
      name: "",
      nickname: "초대해보세요",
      entryDate: 0,
      currentScore: 0,
    },
  ],
});

export const signupTabIdx = atom({
  key: "signupTabIdx",
  default: "0",
});

export const playColor = atom({
  key: "playColor",
  default: "1",
});

export const mypageTabIdx = atom({
  key: "mypageTabIdx",
  default: "알림",
});
