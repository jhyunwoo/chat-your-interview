"use client";

import { useMessages } from "@/lib/stores/messages";
import { useEffect } from "react";

export default function MessageList() {
  const { messages } = useMessages((state) => state);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws/interview");

    socket.onopen = () => {
      console.log("WebSocket 연결됨");
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.ondataavailable = (event) => {
            socket.send(event.data);
          };

          mediaRecorder.start(100); // 100ms마다 데이터 전송
        })
        .catch((error) => {
          console.error("마이크 접근 실패:", error);
        });
    };

    socket.onmessage = (event) => {
      console.log(event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket 오류:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className={"h-full p-2 px-3 bg-white rounded-2xl shadow-lg"}>
      <div className={"text-neutral-600 text-lg"}>Messages</div>
      {messages.map((message, index) => (
        <div key={index}>
          <div>{message.message}</div>
        </div>
      ))}
    </div>
  );
}
