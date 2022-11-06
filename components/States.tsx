import { atom } from "recoil";
import {
  problemInput,
  optionInput,
  problemsetInput,
  slideProblemInput,
  inboxRoomInput,
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
    picture: "https://exquiz.me/fox.png",
    role: "",
    username: "",
  },
});
/* *** common *** */

/* *** inbox *** */
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

export const inboxProblem = atom({
  key: "inboxProblem",
  default: [],
});

export const inboxOption = atom({
  key: "inboxOption",
  default: optionInput,
}); // usestate

export const inboxMaxpart = atom({
  key: "inboxMaxpart",
  default: 30,
}); // usestate

export const inboxRoom = atom({
  key: "inboxRoom",
  default: inboxRoomInput,
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
});

export const createOption = atom({
  key: "createOption",
  default: optionInput,
});

/* *** slide, problemset, problem, option, score, timelimit *** */

/* *** image-start *** */
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

export const playMessagetype = atom({
  key: "playMessagetype",
  default: "o",
});

export const playParticipants = atom({
  key: "playParticipants",
  default: [
    {
      colorNumber: 0,
      currentScore: 0,
      entryDate: "",
      id: 0,
      imageNumber: 0,
      name: "",
      nickname: "",
      sessionId: "",
    },
  ],
});

export const playUserCurInfo = atom({
  key: "playUserCurInfo",
  default: {
    messageType: "", // "PARTICIPANT"
    fromSession: "", // 사용자 session id - google login시 발급
    id: "", // 사용자 id
    name: "", // 사용자 구분 이름
    nickname: "", // 사용자 닉네임
    entryDate: "", // 생성일(입장시간)
    currentScore: 0, // 점수
    imageNumber: 0, // 사용자 이미지
    colorNumber: 0, // 사용자 배경색
  },
});
/* *** lobby *** */
export const lobbyParticipants = atom({
  key: "lobbyParticipants",
  default: [],
});

export const playAnimal = atom({
  key: "playAnimal",
  default: 0,
});

export const playColor = atom({
  key: "playColor",
  default: 0,
});

export const playIsDrawerOpened = atom({
  key: "playIsDrawerOpened",
  default: "0",
});

/* *** play *** */
