"use client";

import { useRouter } from "next/navigation";
import { useModal } from "@/lib/stores/modal";
import { useWebsocketConnection } from "@/lib/stores/websocket-connection";
import { ItemType } from "@openai/realtime-api-beta/dist/lib/client.js";
import createEvaluation from "@/lib/create-evaluation";

export default function ControlPanel({
  items,
  interviewId,
}: {
  items: ItemType[];
  interviewId: string;
}) {
  const { setModal } = useModal((state) => state);
  const router = useRouter();
  const { connect, disconnect, isConnected } = useWebsocketConnection(
    (state) => state,
  );

  function handleExit() {
    setModal("Are you really going to leave the interview?", async () => {
      const results = [];
      for (const item of items) {
        // @ts-expect-error -- skip
        results.push({ role: item.role, message: item.content[0].transcript });
      }
      localStorage.setItem("interviewMessages", JSON.stringify(results));
      await createEvaluation(results);
      disconnect();
      router.push(`/interview/${interviewId}/evaluation`);
    });
  }

  function handlePause() {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  }

  return (
    <div
      className={
        "flex flex-col w-full p-4 bg-neutral-900 rounded-2xl gap-2 shadow-lg shadow-orange-300/50"
      }
    >
      <div
        className={
          "flex gap-2 items-center justify-around *:p-2 *:rounded-full *:w-full *:text-white *:text-lg"
        }
      >
        <button onClick={handleExit} type={"button"} className={"bg-red-600"}>
          End Interview
        </button>
        <button
          onClick={handlePause}
          type={"button"}
          className={"bg-orange-600"}
        >
          {isConnected ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
}
