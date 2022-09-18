/* common */
export const connectServerApiAddress = "https://prod.exquiz.me/";
/* create */

export const dtypeName = [
  "MultipleChoiceProblem",
  "subjective",
  "ox",
  "nonsense",
  "dynamic",
  "empty",
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
  closingMent: "",
  description: "",
  hostId: 1,
  title: "",
}

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