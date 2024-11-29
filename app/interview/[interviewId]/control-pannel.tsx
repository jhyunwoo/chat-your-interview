"use client";

import { useQuestions } from "@/lib/stores/questions";
import { useRouter } from "next/navigation";
import { useModal } from "@/lib/stores/modal";

export default function ControlPanel() {
  const { handleNextQuestion, questions } = useQuestions((state) => state);
  const { setModal } = useModal((state) => state);
  const router = useRouter();

  function handleExit() {
    setModal("Are you really going to leave the interview?", () => {
      router.replace("/interview");
    });
  }

  function handlePause() {
    setModal("Would you like to stop the interview?", () => {});
  }

  return (
    <div
      className={
        "flex flex-col w-full p-4 bg-neutral-900 rounded-2xl gap-2 shadow-lg shadow-orange-300/50"
      }
    >
      <button
        type={"button"}
        onClick={handleNextQuestion}
        disabled={questions.length === 0}
        className={
          "bg-neutral-900 text-white p-2 rounded-full w-full disabled:bg-neutral-500 text-lg"
        }
      >
        {questions.length > 0 ? "Next Question" : "Request Questions..."}
      </button>
      <div
        className={
          "flex gap-2 items-center justify-around *:p-2 *:rounded-full *:w-full *:text-white *:text-lg"
        }
      >
        <button onClick={handleExit} type={"button"} className={"bg-red-600"}>
          Exit
        </button>
        <button
          onClick={handlePause}
          type={"button"}
          className={"bg-orange-600"}
        >
          Pause
        </button>
      </div>
    </div>
  );
}
