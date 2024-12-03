"use client";

import WebcamView from "@/app/interview/[interviewId]/webcam";
import DefaultLayout from "@/app/components/default-layout";
import InterviewInfo from "@/app/interview/[interviewId]/interview-info";
import MessageList from "@/app/interview/[interviewId]/message-list";
import ControlPanel from "@/app/interview/[interviewId]/control-pannel";
import { use, useState } from "react";
import { ItemType } from "@openai/realtime-api-beta/dist/lib/client.js";

export default function InterviewPage({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) {
  const [items, setItems] = useState<ItemType[]>([]);

  return (
    <DefaultLayout className={"flex"}>
      <WebcamView />
      <InterviewInfo interviewId={use(params).interviewId}>
        <MessageList items={items} setItems={setItems} />
        <ControlPanel items={items} />
      </InterviewInfo>
    </DefaultLayout>
  );
}
