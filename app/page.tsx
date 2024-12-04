import DefaultLayout from "@/app/components/default-layout";
import FileUpload from "@/app/components/upload/file-upload";
import Link from "next/link";

export default function HomePage() {
  return (
    <DefaultLayout
      className={"grid grid-cols-3 grid-rows-2 gap-4 p-4 pt-20 text-white"}
    >
      <FileUpload keyName={"resume"} />
      <Link
        href={"/interview"}
        className={
          "w-full h-full bg-orange-600 hover:bg-orange-500 transition-colors text-white flex items-center justify-center rounded-xl text-2xl font-bold shadow-lg shadow-orange-500/50"
        }
      >
        Interview History
      </Link>
      <Link
        href={"/profile"}
        className={
          "w-full h-full bg-rose-600 hover:bg-rose-500 transition-colors text-white flex items-center justify-center rounded-xl text-2xl font-bold shadow-lg shadow-rose-500/50"
        }
      >
        Profile
      </Link>
    </DefaultLayout>
  );
}
