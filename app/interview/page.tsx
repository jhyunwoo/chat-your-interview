import DefaultLayout from "@/app/components/default-layout";
import Link from "next/link";

export default function InterviewPage() {
  return (
    <DefaultLayout className={"flex p-4 flex-col"}>
      <Link
        href={"/interview/create"}
        className={
          "text-center text-white bg-emerald-500 p-3 rounded-xl text-lg font-semibold"
        }
      >
        새로운 인터뷰
      </Link>
      <div className={"text-2xl font-bold py-4"}>Interview History</div>
      <div className={"w-full gap-2 grid grid-cols-3 "}>
        <Link
          className={
            "p-4 rounded-xl ring-2 ring-green-500 hover:bg-neutral-100 bg-white shadow-lg transition text-center text-xl font-semibold"
          }
          href={`/interview/1/review`}
        >
          Naver Back-End 직군 인터뷰
        </Link>
      </div>
    </DefaultLayout>
  );
}
