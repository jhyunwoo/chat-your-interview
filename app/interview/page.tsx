import DefaultLayout from "@/app/components/default-layout";
import Link from "next/link";

export default function InterviewPage() {
  return (
    <DefaultLayout className={"flex p-4 flex-col"}>
      <div className={"text-2xl font-bold py-4"}>Interview History</div>
      <div className={"w-full gap-2 grid grid-cols-3 "}>
        <Link
          className={
            "p-4 rounded-xl ring-2 ring-green-500 hover:bg-neutral-100 bg-white shadow-lg transition text-center text-xl font-semibold"
          }
          href={`/interview/1`}
        >
          Naver Back-End 직군 인터뷰
        </Link>
      </div>
    </DefaultLayout>
  );
}
