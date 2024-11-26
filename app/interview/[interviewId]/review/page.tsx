import DefaultLayout from "@/app/components/default-layout";

const resultData: {
  index: number;
  score: number;
  question: string;
  answer: string;
  feedback: string;
}[] = [
  {
    index: 1,
    score: 2,
    question: "HTML로 코딩하는 방법에 대해 설명해주세요.",
    answer:
      "HTML로 코딩하기 위해선 우선 HDMI가 필요합니다. HDMI가 준비되었다면 노트북과 모니터를 연결하고 메모장을 열러 'print('Hello HTML')'을 입력하면 됩니다.",
    feedback:
      "HTML과 HDMI를 혼동한 것 같습니다. 문제를 정확히 듣고 면접관의 의도에 맞게 답변하는 연습이 필요합니다.",
  },
  {
    index: 2,
    score: 2,
    question: "HTML로 코딩하는 방법에 대해 설명해주세요.",
    answer:
      "HTML로 코딩하기 위해선 우선 HDMI가 필요합니다. HDMI가 준비되었다면 노트북과 모니터를 연결하고 메모장을 열러 'print('Hello HTML')'을 입력하면 됩니다.",
    feedback:
      "HTML과 HDMI를 혼동한 것 같습니다. 문제를 정확히 듣고 면접관의 의도에 맞게 답변하는 연습이 필요합니다.",
  },
  {
    index: 3,
    score: 2,
    question: "HTML로 코딩하는 방법에 대해 설명해주세요.",
    answer:
      "HTML로 코딩하기 위해선 우선 HDMI가 필요합니다. HDMI가 준비되었다면 노트북과 모니터를 연결하고 메모장을 열러 'print('Hello HTML')'을 입력하면 됩니다.",
    feedback:
      "HTML과 HDMI를 혼동한 것 같습니다. 문제를 정확히 듣고 면접관의 의도에 맞게 답변하는 연습이 필요합니다.",
  },
  {
    index: 4,
    score: 2,
    question: "HTML로 코딩하는 방법에 대해 설명해주세요.",
    answer:
      "HTML로 코딩하기 위해선 우선 HDMI가 필요합니다. HDMI가 준비되었다면 노트북과 모니터를 연결하고 메모장을 열러 'print('Hello HTML')'을 입력하면 됩니다.",
    feedback:
      "HTML과 HDMI를 혼동한 것 같습니다. 문제를 정확히 듣고 면접관의 의도에 맞게 답변하는 연습이 필요합니다.",
  },
];

function QuestionResult({
  index,
  score,
  question,
  answer,
  feedback,
}: {
  index: number;
  score: number;
  question: string;
  answer: string;
  feedback: string;
}) {
  return (
    <div className={"rounded-lg bg-white shadow-xl"}>
      <div className={"w-full p-2 bg-neutral-800 text-white rounded-t-lg px-3"}>
        <div>{index}번 질문</div>
      </div>
      <div className={"p-4 flex flex-col gap-2"}>
        <div>
          <div className={"text-sm text-neutral-700"}>점수</div>
          <div className={"text-lg font-semibold"}>{score}/5</div>
        </div>
        <div>
          <div className={"text-sm text-neutral-700"}>질문</div>
          <div className={"text-lg font-semibold"}>{question}</div>
        </div>
        <div>
          <div className={"text-sm text-neutral-700"}>답변</div>
          <div className={"text-lg font-semibold"}>{answer}</div>
        </div>
        <div
          className={"bg-orange-50 ring-2 mt-4 ring-orange-500 rounded-xl p-2"}
        >
          <div className={"text-sm text-neutral-700"}>피드백</div>
          <div className={"text-lg font-semibold"}>{feedback}</div>
        </div>
      </div>
    </div>
  );
}

export default async function InterviewReviewPage({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) {
  return (
    <DefaultLayout className={"p-4 flex flex-col gap-2"}>
      <div className={"text-2xl font-bold"}>
        네이버 Back-End 직군 인터뷰 리뷰 {(await params).interviewId}
      </div>
      <div className={"bg-white p-4 rounded-xl shadow-xl"}>
        <div className={"text-neutral-600"}>총평</div>
        <div className={"text-lg font-semibold"}>
          기술적 이해도는 높으나 이를 활용한 경험 부족
        </div>
      </div>
      <div className={"flex flex-col gap-4"}>
        {resultData.map((resultDatum) => (
          <QuestionResult
            key={resultDatum.index}
            index={resultDatum.index}
            score={resultDatum.score}
            question={resultDatum.question}
            answer={resultDatum.answer}
            feedback={resultDatum.feedback}
          />
        ))}
      </div>
    </DefaultLayout>
  );
}
