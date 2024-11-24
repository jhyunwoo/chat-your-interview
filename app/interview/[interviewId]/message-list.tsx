"use client";

import { useMessages } from "@/lib/stores/messages";

export default function MessageList() {
  const { messages } = useMessages((state) => state);

  // useEffect(() => {
  //   const socket = new WebSocket("ws://your-websocket-server");
  //
  //   // 연결이 열리면 실행
  //   socket.onopen = () => {
  //     console.log("WebSocket 연결됨");
  //   };
  //
  //   // 메시지를 받으면 실행
  //   socket.onmessage = (event) => {
  //     setMessages([...messages, event.data]);
  //   };
  //
  //   // 에러 발생 시 실행
  //   socket.onerror = (error) => {
  //     console.error("WebSocket 에러:", error);
  //   };
  //
  //   // 연결이 닫히면 실행
  //   socket.onclose = () => {
  //     console.log("WebSocket 연결 종료됨");
  //   };
  //
  //   // 컴포넌트가 언마운트될 때 WebSocket 닫기
  //   return () => {
  //     socket.close();
  //   };
  // }, [messages, setMessages]);

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
