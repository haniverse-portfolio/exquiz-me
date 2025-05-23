import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import { Stack, Group, Button, Modal, ActionIcon } from "@mantine/core";
import { AlertCircle, AlertOctagon } from "tabler-icons-react";

import {
  createOption,
  createProblem,
  createProblemset,
  createCompleteModal,
  createStep,
} from "../States";
import { connectMainServerApiAddress, dtypeFullName } from "../ConstValues";
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
      title={
        <ActionIcon>
          <AlertCircle color="orange"></AlertCircle>
        </ActionIcon>
      }
      centered
      opened={completeModalOpened === "0" ? false : true}
      onClose={() => setCompleteModalOpened("0")}
    >
      <Stack align="center">
        <p>퀴즈 제작을 완료하시겠습니까?</p>
        <Button
          variant="outline"
          color="orange"
          onClick={async () => {
            setStep(1);
            setCompleteModalOpened("0");

            let psId = await postProblemsetId();
            let timeSum = 0;

            /* *** problem loop start *** */
            problem.forEach(async (curProblem, problemIdx) => {
              const slicedProblem = { ...curProblem } as any;

              slicedProblem["idx"] = problemIdx;
              slicedProblem["problemsetId"] = psId;
              slicedProblem["dtype"] =
                dtypeFullName[parseInt(slicedProblem.dtype)];
              console.log("answer: " + curProblem.answer);
              console.log("idx: " + curProblem.idx);

              /* *** problem axios *** */
              const prId = await axios
                .post(
                  connectMainServerApiAddress + "api/problem",
                  slicedProblem
                )
                .then((result) => {
                  return result.data.id;
                })
                .catch((error) => {
                  alert("problem_error");
                });

              /* *** option loop start *** */
              option[problemIdx].forEach((curOption, optionIdx) => {
                const slicedOption = { ...curOption } as any;
                slicedOption["idx"] = optionIdx;
                slicedOption["problemId"] = prId;

                console.log(optionIdx + " : " + slicedOption);
                /* *** option axios *** */
                axios
                  .post(
                    connectMainServerApiAddress + "api/problem_option",
                    slicedOption
                  )
                  .then((result) => {
                    setStep(2);
                    setTimeout(() => {
                      setStep(0);
                      router.push("/inbox");
                    }, 500);
                  })
                  .catch((error) => {
                    // setError()
                  });
              });
            });
            localStorage.removeItem("problemSet");
            localStorage.removeItem("problem");
            localStorage.removeItem("option");
          }}
        >
          완료
        </Button>
      </Stack>
    </Modal>
  );
};
