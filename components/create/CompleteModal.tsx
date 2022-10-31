import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import { Stack, Group, Button, Modal } from "@mantine/core";
import { AlertOctagon } from "tabler-icons-react";

import {
  createOption,
  createProblem,
  createProblemset,
  createCompleteModal,
  createStep,
} from "../States";
import { connectMainServerApiAddress } from "../ConstValues";
import axios from "axios";
import { useState } from "react";

export const CompleteModal = () => {
  /* ****** routes ****** */
  const [step, setStep] = useRecoilState(createStep);

  /* ****** pop-over ****** */
  /* modal */
  const [completeModalOpened, setCompleteModalOpened] =
    useRecoilState(createCompleteModal);

  /* *** common *** */
  const [problemSet, setProblemSet] = useRecoilState(createProblemset);
  const [problem, setProblem] = useRecoilState(createProblem);
  const [option, setOption] = useRecoilState(createOption);

  const postProblemsetId = async () => {
    let rt = Infinity;
    await axios
      .post(
        //const { data: result } =
        connectMainServerApiAddress + "api/problemset",
        problemSet
      )
      .then((result) => {
        rt = result.data.id;
      })
      .catch((error) => {
        alert("problemset_error");
      });
    return rt;
  };

  const postProblemId = async (idx: number) => {
    let rt = Infinity as number;
    await axios
      .post(connectMainServerApiAddress + "api/problem", problem[idx])
      .then((result) => {
        rt = result.data.id;
      })
      .catch((error) => {
        alert("problem_error");
      });
    return rt;
  };

  const postOption = async (idx1: number, idx2: number) => {
    await axios
      .post(
        connectMainServerApiAddress + "api/problem_option",
        option[idx1][idx2]
      )
      .then((result) => {})
      .catch((error) => {
        // alert(error);
      });
    return;
  };

  const router = useRouter();

  return (
    <Modal
      centered
      opened={completeModalOpened === "0" ? false : true}
      onClose={() => setCompleteModalOpened("0")}
    >
      <Button
        variant="outline"
        color="orange"
        onClick={async () => {
          setCompleteModalOpened("0");

          let problemsetId = await postProblemsetId();

          // {
          //   /* problemset */
          // }
          let copyProblem = [...problem];
          let copyOption = [...option];
          for (let i = 0; i < problem.length; i++) {
            copyProblem.splice(i, 1, {
              ...copyProblem[i],
              idx: i,
              problemsetId: problemsetId,
            });
          }

          for (let i = 0; i < copyProblem.length; i++) {
            {
              /* problem */
            }
            let problemId = 0;
            await axios
              .post(connectMainServerApiAddress + "api/problem", copyProblem[i])
              .then((result) => {
                problemId = result.data.id;
              })
              .catch((error) => {
                alert("problem_error");
              });
            {
              /* problem_option */
            }
            for (let j = 0; j < copyOption.length; j++) {
              let copyOption2 = copyOption[i];
              copyOption2.splice(j, 1, {
                ...copyOption2[j],
                idx: j,
                problemId: problemId,
              });

              copyOption.splice(i, 1, copyOption2);
            }
            setOption((prevState) => option);
            for (let j = 0; j < option.length; j++) {
              axios
                .post(
                  connectMainServerApiAddress + "api/problem_option",
                  copyOption[i][j]
                )
                .then((result) => {})
                .catch((error) => {});
            }
          }
          setStep((prevState) => step + 1);
          router.push("/inbox");
        }}
      >
        배포하기
      </Button>
    </Modal>
  );
};
