import WebcamView from "@/app/interview/webcam";
import DefaultLayout from "@/app/components/default-layout";
import Chat from "@/app/interview/chat";

export default function InterviewPage() {
  return (
    <DefaultLayout className={"flex"}>
      <WebcamView />
      <Chat />
    </DefaultLayout>
  );
}
