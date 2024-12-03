import DefaultLayout from "@/app/components/default-layout";
import ResumeUpload from "@/app/components/upload/file-upload"

export default function HomePage() {
  return (
    <DefaultLayout className={"flex items-center justify-center text-white"}>
      <div className={"text-2xl font-bold"}>Home Page</div>
      <ResumeUpload />
    </DefaultLayout>
  );
}
