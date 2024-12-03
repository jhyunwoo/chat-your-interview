"use client";

import { useEffect, useState } from "react";
import DefaultLayout from "@/app/components/default-layout";

export default function EvaluationPage() {
  const [evaluation, setEvaluation] = useState("");

  useEffect(() => {
    const prevData = localStorage.getItem("evaluation");

    if (prevData) {
      setEvaluation(prevData);
    }
  }, []);

  if (evaluation) {
    const jsonData = JSON.parse(evaluation);
    const data = JSON.parse(
      jsonData.choices[0].message.content
        .replaceAll("```", "")
        .replaceAll("json", ""),
    )[0];

    return (
      <DefaultLayout className={"text-white p-4"}>
        <div className={"p-2 rounded-lg bg-neutral-900 flex flex-col gap-2"}>
          <div className={"text-lg font-semibold"}>{data.criteria}</div>
          <div className={"text-xl font-bold"}>Score: {data.score}</div>
          <div>{data.rationale}</div>
        </div>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <div>ddd</div>
    </DefaultLayout>
  );
}
