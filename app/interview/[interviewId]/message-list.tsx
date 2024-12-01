"use client";

import { useMessages } from "@/lib/stores/messages";
import { useEffect } from "react";

async function blobToPCM16(audioBlob: Blob) {
  // Decode the audio data from the Blob
  const arrayBuffer = await audioBlob.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  // Extract channel data and convert to PCM16
  return convertToPCM16(audioBuffer);
}

function convertToPCM16(audioBuffer: AudioBuffer) {
  const channelData = audioBuffer.getChannelData(0); // Get data for the first channel
  const pcm16 = new Int16Array(channelData.length);

  for (let i = 0; i < channelData.length; i++) {
    // Scale the float [-1, 1] to Int16 range [-32768, 32767]
    pcm16[i] = Math.max(-1, Math.min(1, channelData[i])) * 0x7fff;
  }

  return pcm16;
}

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
            blobToPCM16(event.data).then((pcm16) => {
              socket.send(pcm16);
            });
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
    <div
      className={
        "h-full p-2 px-3 bg-neutral-900 rounded-2xl text-white shadow-lg shadow-orange-300/50"
      }
    >
      <div className={"text-neutral-400 text-lg"}>Messages</div>
      {messages.map((message, index) => (
        <div key={index}>
          <div>{message.message}</div>
        </div>
      ))}
    </div>
  );
}
