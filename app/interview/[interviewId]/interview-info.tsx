import { ReactNode } from "react";

export default function InterviewInfo({
  children,
  interviewId,
}: {
  children: ReactNode;
  interviewId: string;
}) {
  return (
    <div
      className={"flex flex-col gap-4 w-1/3 h-full justify-between pt-2 p-4"}
    >
      <div
        className={
          "text-lg font-semibold bg-neutral-900 text-white p-2 rounded-xl text-center shadow-lg shadow-orange-300/50"
        }
      >
        네이버 Back-End 직군 인터뷰 {interviewId}
      </div>
      {children}
    </div>
  );
}
