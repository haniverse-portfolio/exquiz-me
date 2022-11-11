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
/* create */

export const dtypeName = [
  "객관식",
  "주관식",
  "O/X",
  "넌센스",
  // "다이나믹",
  // "설명",
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

export const tabTooltip = [
  "여러개의 선지로 이루어진 단일 답안형 문제 유형입니다",
  "여러개의 선지로 이루어진 복수 답안형 문제 유형입니다",
  "두개의 선지로 이루어진 단일 답안형 문제 유형입니다",
  "exquiz.me가 제공하는 랜덤 넌센스 문제 유형입니다",
  "exquiz.me가 제공하는 엔터테인먼트형 다이나믹 문제 유형입니다",
  "텍스트나 이미지를 통해 설명할 수 있는 설명 유형입니다",
];

export const MARKSTIME = [
  { value: 0, label: "10" },
  { value: 25, label: "20" },
  { value: 50, label: "30" },
  { value: 75, label: "40" },
  { value: 100, label: "50" },
];

export const MARKSCORE = [
  { value: 0, label: "100" },
  { value: 25, label: "200" },
  { value: 50, label: "300" },
  { value: 75, label: "400" },
  { value: 100, label: "500" },
];

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
  "https://www.exquiz.me/dog.png",
  "https://www.exquiz.me/dog2.png",
  "https://www.exquiz.me/fox.png",
  "https://www.exquiz.me/koala.png",
  "https://www.exquiz.me/monkey.png",
  "https://www.exquiz.me/panda.png",
  "https://www.exquiz.me/rabbit.png",
  "https://www.exquiz.me/rat.png",
  "https://www.exquiz.me/wolf.png",
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

export const testUserData = [
  {
    nickname: "성찰하는 소크라테스",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "고뇌하는 니체",
    animal: "Panda",
    color: "orange",
    answer: true,
  },
  {
    nickname: "엉뚱한 튜링",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "활기찬 뉴턴",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "명랑한 브라헤",
    animal: "Panda",
    color: "orange",
    answer: true,
  },
  {
    nickname: "정의로운 보어",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "창의적인 레오나르도",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "사색하는 공자",
    animal: "Panda",
    color: "orange",
    answer: true,
  },
  {
    nickname: "부유한 스미스",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "정직한 데카르트",
    animal: "Panda",
    color: "orange",
    answer: true,
  },
  {
    nickname: "슬기로운 세종",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "유능한 한신",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "전설적인 칸",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "전략적인 제갈공명",
    animal: "Panda",
    color: "orange",
    answer: true,
  },
  {
    nickname: "신박한 유레카",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "듬직한 테슬라",
    animal: "Panda",
    color: "orange",
    answer: true,
  },
  {
    nickname: "명석한 칼세이건",
    animal: "Panda",
    color: "orange",
    answer: true,
  },
  {
    nickname: "건강한 클레오파트라",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "용감한 이순신",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "공평한 링컨",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "신속한 나폴레옹",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "뛰어난 워렌버핏",
    animal: "Panda",
    color: "orange",
    answer: true,
  },
  {
    nickname: "비장한 스티브잡스",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "신들린 모차르트",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "감각적인 고흐",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "독보적인 내쉬",
    animal: "Panda",
    color: "orange",
    answer: true,
  },
  {
    nickname: "헌신적인 테레사",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "위대한 스티븐호킹",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
  {
    nickname: "입체적인 피카소",
    animal: "Panda",
    color: "orange",
    answer: true,
  },
  {
    nickname: "성스러운 잔다르크",
    animal: "Panda",
    color: "orange",
    answer: false,
  },
];

export const tabColor = [
  "bg-gradient-to-r from-red-500 to-orange-500",
  "bg-gradient-to-r from-orange-500 to-amber-500",
  "bg-gradient-to-r from-green-500 to-green-500",
  "bg-gradient-to-r from-blue-700 to-blue-500",
  "bg-gradient-to-r from-purple-500 to-pink-500",
  "bg-gradient-to-r from-gray-500 to-gray-400",
];

export function tabIcon(idx: number) {
  if (idx == 0)
    return <SquareCheck color="white" className="m-auto" size={"30px"} />;
  if (idx == 1)
    return <Parentheses color="white" className="m-auto" size={"30px"} />;
  if (idx == 2) return <AB color="white" className="m-auto" size={"30px"} />;
  if (idx == 3)
    return <QuestionMark color="white" className="m-auto" size={"30px"} />;
  if (idx == 4) return <Apps color="white" className="m-auto" size={"30px"} />;
  if (idx == 5)
    return <MathAvg color="white" className="m-auto" size={"30px"} />;
}

export const testPlayProblem = [
  {
    answer: "0",
    description: "우리나라에서 가장 높은 산은?",
    dtype: "MultipleChoiceProblem",
    idx: 0,
    picture: "",
    problemsetId: 0,
    score: 125,
    timelimit: 30,
    title: "",
  },
  {
    answer: "0",
    description: "아이스크림을 영어로 하면?",
    dtype: "MultipleChoiceProblem",
    idx: 0,
    picture: "",
    problemsetId: 0,
    score: 125,
    timelimit: 30,
    title: "",
  },
  {
    answer: "0",
    description: "소프트웨어 마에스트로가 있는 빌딩은?",
    dtype: "MultipleChoiceProblem",
    idx: 0,
    picture: "",
    problemsetId: 0,
    score: 125,
    timelimit: 30,
    title: "",
  },
  {
    answer: "0",
    description: "🌋이 중 가장 무시무시한 공룡은?🏔",
    dtype: "MultipleChoiceProblem",
    idx: 0,
    picture: "",
    problemsetId: 0,
    score: 125,
    timelimit: 30,
    title: "",
  },
];

export const testPlayOption = [
  [
    {
      description: "설악산",
      idx: 0,
      picture: "",
      problemId: 0,
    },
    {
      description: "지리산",
      idx: 1,
      picture: "",
      problemId: 0,
    },
    {
      description: "한라산",
      idx: 2,
      picture: "",
      problemId: 0,
    },
    {
      description: "백두산",
      idx: 3,
      picture: "",
      problemId: 0,
    },
  ],
  [
    {
      description: "icecoffee",
      idx: 0,
      picture: "",
      problemId: 0,
    },
    {
      description: "icekekki",
      idx: 1,
      picture: "",
      problemId: 0,
    },
    {
      description: "icecream",
      idx: 2,
      picture: "",
      problemId: 0,
    },
    {
      description: "iceball",
      idx: 3,
      picture: "",
      problemId: 0,
    },
  ],
  [
    {
      description: "황해주택",
      idx: 0,
      picture: "",
      problemId: 0,
    },
    {
      description: "인하주택",
      idx: 1,
      picture: "",
      problemId: 0,
    },
    {
      description: "아남타워",
      idx: 2,
      picture: "",
      problemId: 0,
    },
    {
      description: "코엑스",
      idx: 3,
      picture: "",
      problemId: 0,
    },
  ],
  [
    {
      description: "티라노사우루스",
      idx: 0,
      picture: "",
      problemId: 0,
    },
    {
      description: "트리케라톱스",
      idx: 1,
      picture: "",
      problemId: 0,
    },
    {
      description: "랩터",
      idx: 2,
      picture: "",
      problemId: 0,
    },
    {
      description: "스피노사우루스",
      idx: 3,
      picture: "",
      problemId: 0,
    },
  ],
];

export const inboxRoomInput = {
  roomName: "",
  id: -1,
  pin: "0",
  maxParticipantCount: -1,
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
