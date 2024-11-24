"use client";

import { useEffect, useState } from "react";

interface MessageType {
  type: string;
  message: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [questions, setQuestions] = useState<MessageType[]>([]);

  function handleNextQuestion() {
    setMessages((prev) => [...prev, questions[0]]);
    const copyArray = questions;
    copyArray.shift();
    setQuestions([...copyArray]);
  }

  useEffect(() => {
    const socket = new WebSocket("ws://your-websocket-server");

    // 연결이 열리면 실행
    socket.onopen = () => {
      console.log("WebSocket 연결됨");
    };

    // 메시지를 받으면 실행
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    // 에러 발생 시 실행
    socket.onerror = (error) => {
      console.error("WebSocket 에러:", error);
    };

    // 연결이 닫히면 실행
    socket.onclose = () => {
      console.log("WebSocket 연결 종료됨");
    };

    // 컴포넌트가 언마운트될 때 WebSocket 닫기
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className={"flex flex-col gap-4 w-1/3 h-full justify-between"}>
      <div className={"h-full"}>
        {messages.map((message, index) => (
          <div key={index}>
            <div>{message.message}</div>
          </div>
        ))}
      </div>
      <div
        className={
          "flex flex-col w-full p-2 border-t-2 border-neutral-300 gap-2"
        }
      >
        <button
          type={"button"}
          onClick={handleNextQuestion}
          disabled={questions.length === 0}
          className={
            "bg-neutral-900 text-white p-2 rounded-lg w-full disabled:bg-neutral-500"
          }
        >
          {questions.length > 0 ? "Next Question" : "Request Questions..."}
        </button>
        <div
          className={
            "flex gap-2 items-center justify-around *:p-2 *:rounded-lg *:w-full"
          }
        >
          <button type={"button"} className={"bg-red-600 text-white"}>
            Exit Interview
          </button>
          <button type={"button"} className={"bg-orange-600 text-white"}>
            Pause Interview
          </button>
        </div>
      </div>
    </div>
  );
}
