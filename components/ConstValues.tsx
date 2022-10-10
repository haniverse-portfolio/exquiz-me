/* common */
export const connectMainServerApiAddress = "https://api.exquiz.me/";
/* create */

export const dtypeName = [
  "객관식",
  "주관식",
  "O/X",
  "넌센스",
  "다이나믹",
  "설명",
];

export const problemInput = [
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
  "/../public/dog.png",
  "/../public/dog2.png",
  "/../public/fox.png",
  "/../public/koala.png",
  "/../public/monkey.png",
  "/../public/panda.png",
  "/../public/rabbit.png",
  "/../public/rat.png",
  "/../public/wolf.png",
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
