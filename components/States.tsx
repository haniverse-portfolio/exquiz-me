import { atom } from "recoil";
import {
  problemInput,
  optionInput,
  problemsetInput,
  slideProblemInput,
} from "./ConstValues";

/* *** common *** */
export const language = atom({
  key: "language",
  default: "KO",
});

export const indexUserInfo = atom({
  key: "indexUserInfo",
  default: {
    accessToken: null,
    email: "",
    nickname: "",
    picture: "/white.png",
    role: "",
    username: "",
  },
});
/* *** common *** */

/* *** inbox *** */

export const inboxIsDeleteAlertModalOpened = atom({
  key: "inboxIsDeleteAlertModalOpened",
  default: false,
});

export const inboxIsModalOpened = atom({
  key: "inboxIsModalOpened",
  default: false,
});

export const inboxProblemsetIdx = atom({
  key: "inboxProblemsetIdx",
  default: -1,
});

export const inboxProblemset = atom({
  key: "inboxProblemset",
  default: [],
});

/* *** inbox *** */

/* *** index *** */
export const indexIsLogined = atom({
  key: "indexIsLogined",
  default: false,
});

export const indexMembership = atom({
  key: "indexMembership",
  default: "0",
});
/* *** index *** */

/* *** create *** */
/* *** user-location *** */
export const createNonsense = atom({
  key: "createNonsense",
  default: {},
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

export const createActive = atom({
  key: "createActive",
  default: 0,
});
/* *** user-location *** */

/* *** slide, problemset, problem, option, score, timelimit *** */
export const createSlideProblem = atom({
  key: "createSlideProblem",
  default: slideProblemInput,
});

export const createProblemset = atom({
  key: "createProblemset",
  default: problemsetInput,
});

export const createProblem = atom({
  key: "createProblem",
  default: problemInput,
  dangerouslyAllowMutability: true,
});

export const createOption = atom({
  key: "createOption",
  default: optionInput,
});

// export const createLastText = atom({
//   key: "createLastText",
//   default: "",
// });

/* *** slide, problemset, problem, option, score, timelimit *** */

/* *** image-start *** */
export const createImageWord = atom({
  key: "createImageWord",
  default: "",
});

export const createLastSearchedWord = atom({
  key: "createLastSearchedWord",
  default: "",
});

export const createImageWord2 = atom({
  key: "createImageWord2",
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

/* *** image-start *** */

export const createStep = atom({
  key: "createStep",
  default: 0,
});
/* *** modal and drawer *** */
export const createCompleteModal = atom({
  key: "createCompleteModal",
  default: "0",
});

export const createTabModal = atom({
  key: "createTabModal",
  default: false,
});

export const createImageModal = atom({
  key: "createImageModal",
  default: false,
});

export const createProblemsetDrawer = atom({
  key: "createProblemsetDrawer",
  default: "0",
});

export const createImageStep = atom({
  key: "createImageStep",
  default: 0,
});
/* *** modal and drawer *** */

/* *** create *** */

/* *** play *** */

/* *** lobby *** */

/* *** play *** */
