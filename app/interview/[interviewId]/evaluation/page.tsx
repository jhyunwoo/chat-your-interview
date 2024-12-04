"use client";

import DefaultLayout from "@/app/components/default-layout";

export default function EvaluationPage() {
  return (
    <DefaultLayout className={"text-white p-4"}>
      <div className={"p-2 rounded-lg bg-neutral-900 flex flex-col gap-2"}>
        <div className={"text-lg font-semibold"}>Criteria 1</div>
        <div className={"text-xl font-bold"}>Score: 8</div>
        <div>
          후보자는 PyTorch와 TensorFlow와 같은 특정 프로젝트와 기술을 언급하며
          자세한 응답을 제공했습니다. 또한 LLM 튜닝 및 배포 경험을 명확히
          설명하여 채용 요건과 잘 부합합니다
        </div>
      </div>
    </DefaultLayout>
  );
}
