import {
  AB,
  Apps,
  MathAvg,
  Parentheses,
  QuestionMark,
  SquareCheck,
} from "tabler-icons-react";

import { IconSquareCheck } from "@tabler/icons";

/* common */
export const connectMainServerApiAddress = "https://api.exquiz.me/";
{
  /* *** create *** */
}
export const dtypeName = [
  "객관식",
  "주관식",
  "O/X",
  "넌센스",
  // "다이나믹",
  // "설명",
];

export const dtypeFullName = [
  "MultipleChoiceProblem",
  "SubjectiveProblem",
  "OXProblem",
  "SubjectiveProblem",
];

export const slideProblemInput = [
  { icon: IconSquareCheck, label: "" },
  { icon: IconSquareCheck, label: "" },
  { icon: IconSquareCheck, label: "" },
];

export const problemInput = [
  {
    answer: "",
    description: "",
    dtype: "0",
    idx: 0,
    picture: "",
    videoUrl: "",
    problemsetId: 0,
    score: 300,
    timelimit: 30,
    title: "",
  },
];

export const optionInput = [
  [
    {
      description: "",
      idx: 0,
      picture: "",
      problemId: 0,
    },
    {
      description: "",
      idx: 1,
      picture: "",
      problemId: 0,
    },
    {
      description: "",
      idx: 2,
      picture: "",
      problemId: 0,
    },
    {
      description: "",
      idx: 3,
      picture: "",
      problemId: 0,
    },
  ],
];

export const problemsetInput = {
  id: 0,
  backgroundMusic: 0,
  closingMent: "",
  description: "",
  hostId: 1,
  scoreSetting: 0,
  timeSetting: 0,
  title: "",
};

/* *** enter *** */
export const enterUserInfoInput = {
  messageType: "", // "PARTICIPANT"
  fromSession: "", // 사용자 session id - google login시 발급
  id: "", // 사용자 id
  name: "", // 사용자 구분 이름
  nickname: "", // 사용자 닉네임
  entryDate: "", // 생성일(입장시간)
  currentScore: 0, // 점수
  imageNumber: 0, // 사용자 이미지
  colorNumber: 0, // 사용자 배경색
};
export const adj = [
  "성찰하는",
  "고뇌하는",
  "엉뚱한",
  "활기찬",
  "명랑한",
  "정의로운",
  "창의적인",
  "사색하는",
  "부유한",
  "정직한",
  "슬기로운",
  "유능한",
  "전설적인",
  "전략적인",
  "신박한",
  "듬직한",
  "명석한",
  "건강한",
  "용감한",
  "공평한",
  "신속한",
  "뛰어난",
  "비장한",
  "신들린",
  "감각적인",
  "독보적인",
  "헌신적인",
  "위대한",
  "입체적인",
  "성스러운",
];

export const noun = [
  "소크라테스",
  "니체",
  "튜링",
  "뉴턴",
  "브라헤",
  "보어",
  "레오나르도",
  "공자",
  "스미스",
  "데카르트",
  "세종",
  "한신",
  "칸",
  "제갈공명",
  "유레카",
  "테슬라",
  "칼세이건",
  "클레오파트라",
  "이순신",
  "링컨",
  "나폴레옹",
  "워렌버핏",
  "스티브잡스",
  "모차르트",
  "고흐",
  "내쉬",
  "테레사",
  "스티븐호킹",
  "피카소",
  "잔다르크",
];

export const avatarAnimal = [
  "/dog.png",
  "/dog2.png",
  "/fox.png",
  "/koala.png",
  "/monkey.png",
  "/panda.png",
  "/rabbit.png",
  "/rat.png",
  "/wolf.png",
  "/boar.png",
  "/cat.png",
  "/cow.png",
  "/hamster.png",
];

export const avatarColor = [
  "bg-amber-500",
  "bg-red-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-lime-500",
  "bg-pink-500",
  "bg-gray-500",
  "bg-black",
  "bg-yellow-500",
  "bg-teal-500",
  "bg-indigo-500",
];

// export function tabIcon(idx: number) {
//   if (idx == 0)
//     return <SquareCheck color="white" className="m-auto" size={"30px"} />;
//   if (idx == 1)
//     return <Parentheses color="white" className="m-auto" size={"30px"} />;
//   if (idx == 2) return <AB color="white" className="m-auto" size={"30px"} />;
//   if (idx == 3)
//     return <QuestionMark color="white" className="m-auto" size={"30px"} />;
//   if (idx == 4) return <Apps color="white" className="m-auto" size={"30px"} />;
//   if (idx == 5)
//     return <MathAvg color="white" className="m-auto" size={"30px"} />;
// }

{
  /* *** inbox *** */
}
export const inboxRoomInput = {
  roomName: "",
  id: -1,
  pin: "0",
  maxParticipantCount: 30,
  startDate: "-1",
  endDate: null,
  problemsetDto: {
    id: -1,
    title: "-1",
    description: "-1",
    closingMent: "-1",
  },
  currentState: "NOT READY",
  currentProblemNum: -1,
};

{
  /* *** display *** */
}
export const problemOptionInput = {
  messageType: "",
  fromSession: "",
  id: "",
  title: "",
  description: "",
  dtype: "",
  timelimit: 0,
  score: 0,
  picture: "",
  answer: "",
  idx: 0,
  problemOptions: [
    {
      id: 0,
      idx: 0,
      description: "",
      picture: "",
      pickCount: 0,
    },
  ],
};

export const displayParticipants = [
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
];

/* *** play *** */
export const playSubjectiveOption = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

export const playCorrectAnswerList = {
  totalCorrectCount: 0,
  participantInfo: [
    {
      id: 0,
      sessionId: "",
      name: "",
      nickname: "",
      entryDate: "",
      currentScore: 0,
      beforeScore: 0,
      imageNumber: 0,
      colorNumber: 0,
    },
  ],
  isCorrect: [false],
};
