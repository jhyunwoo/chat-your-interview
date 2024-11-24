import WebcamView from "@/app/interview/[interviewId]/webcam";
import DefaultLayout from "@/app/components/default-layout";
import InterviewInfo from "@/app/interview/[interviewId]/interview-info";
import MessageList from "@/app/interview/[interviewId]/message-list";
import ControlPanel from "@/app/interview/[interviewId]/control-pannel";

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) {
  const { interviewId } = await params;
  return (
    <DefaultLayout className={"flex"}>
      <WebcamView />
      <InterviewInfo interviewId={interviewId}>
        <MessageList />
        <ControlPanel />
      </InterviewInfo>
    </DefaultLayout>
  );
}
