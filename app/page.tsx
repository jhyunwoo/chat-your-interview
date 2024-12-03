import DefaultLayout from "@/app/components/default-layout";
import FileUpload from "@/app/components/upload/file-upload";
import EvaluationButton from '@/app/components/upload/create-evaluation';

export default function HomePage() {

  return (
    <DefaultLayout className={"flex items-center justify-center text-white"}>
      <div className={"text-2xl font-bold"}>Home Page</div>
      <FileUpload keyName={"resume"} />
      <EvaluationButton />
    </DefaultLayout>
  );
}
