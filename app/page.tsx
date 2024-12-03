import DefaultLayout from "@/app/components/default-layout";
import FileUpload from "@/app/components/upload/file-upload";

export default function HomePage() {
  return (
    <DefaultLayout
      className={"grid grid-cols-3 grid-rows-1 gap-4 p-4 pt-20 text-white"}
    >
      <FileUpload keyName={"resume"} />
    </DefaultLayout>
  );
}
