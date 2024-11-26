"use client";

import DefaultLayout from "@/app/components/default-layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Inputs {
  title: string;
  job: string;
  company: string;
  resume: string;
}

export default function CreateInterview() {
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    router.push(`/interview/${1}`);
  };

  return (
    <DefaultLayout className={"flex flex-col p-4"}>
      <div className={"text-2xl font-bold"}>새로운 인터뷰 생성</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex flex-col gap-2 mt-4"}
      >
        <div>
          <div className={"text-sm text-neutral-700"}>제목</div>
          <input
            {...register("title", { required: true })}
            className={
              "p-2 rounded-lg bg-neutral-100 text-lg font-semibold w-full"
            }
            placeholder={"인터뷰 제목"}
          />
        </div>
        <div>
          <div className={"text-sm text-neutral-700"}>직군</div>
          <input
            {...register("job", { required: true })}
            className={
              "p-2 rounded-lg bg-neutral-100 text-lg font-semibold w-full"
            }
            placeholder={"직군"}
          />
        </div>
        <div>
          <div className={"text-sm text-neutral-700"}>기업</div>
          <input
            {...register("company", { required: true })}
            className={
              "p-2 rounded-lg bg-neutral-100 text-lg font-semibold w-full"
            }
            placeholder={"기업"}
          />
        </div>
        <div>
          <div className={"text-sm text-neutral-700"}>포트폴리오</div>
          <textarea
            {...register("resume", { required: true })}
            className={
              "p-2 rounded-lg bg-neutral-100 text-lg font-semibold w-full h-56"
            }
            placeholder={"포트폴리오"}
          />
        </div>

        <button
          type="submit"
          className={
            "p-2 rounded-full bg-sky-600 text-white font-semibold text-lg"
          }
        >
          인터뷰 시작하기
        </button>
      </form>
    </DefaultLayout>
  );
}
