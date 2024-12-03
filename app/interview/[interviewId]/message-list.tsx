"use client";

const LOCAL_RELAY_SERVER_URL: string = "http://localhost:8081";

import { WavRecorder, WavStreamPlayer } from "@/lib/wavtools";
import { useCallback, useEffect, useRef, useState } from "react";
import { RealtimeClient } from "@openai/realtime-api-beta";
import { ItemType } from "@openai/realtime-api-beta/dist/lib/client.js";
import { WavRenderer } from "@/utils/wav_renderer";
import { instructions } from "@/utils/conversation_config";
import { useWebsocketConnection } from "@/lib/stores/websocket-connection";

/**
 * Type for all event logs
 */
interface RealtimeEvent {
  time: string;
  source: "client" | "server";
  count?: number;
  event: { [key: string]: any };
}

export default function ConsolePage() {
  /**
   * Instantiate:
   * - WavRecorder (speech input)
   * - WavStreamPlayer (speech output)
   * - RealtimeClient (API client)
   */
  const wavRecorderRef = useRef<WavRecorder>(
    new WavRecorder({ sampleRate: 24000 }),
  );
  const wavStreamPlayerRef = useRef<WavStreamPlayer>(
    new WavStreamPlayer({ sampleRate: 24000 }),
  );
  const clientRef = useRef<RealtimeClient>(
    new RealtimeClient({ url: LOCAL_RELAY_SERVER_URL }),
  );

  /**
   * References for
   * - Rendering audio visualization (canvas)
   * - Autoscrolling event logs
   * - Timing delta for event log displays
   */
  const clientCanvasRef = useRef<HTMLCanvasElement>(null);
  const serverCanvasRef = useRef<HTMLCanvasElement>(null);
  const eventsScrollHeightRef = useRef(0);
  const eventsScrollRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<string>(new Date().toISOString());

  /**
   * All of our variables for displaying application state
   * - items are all conversation items (dialog)
   * - realtimeEvents are event logs, which can be expanded
   * - memoryKv is for set_memory() function
   * - coords, marker are for get_weather() function
   */
  const [items, setItems] = useState<ItemType[]>([]);
  const [realtimeEvents, setRealtimeEvents] = useState<RealtimeEvent[]>([]);
  const { setIsConnected, setConnect, setDisconnect } = useWebsocketConnection(
    (state) => state,
  );

  /**
   * Connect to conversation:
   * WavRecorder taks speech input, WavStreamPlayer output, client is API client
   */
  const connectConversation = useCallback(async () => {
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    const wavStreamPlayer = wavStreamPlayerRef.current;

    // Set state variables
    startTimeRef.current = new Date().toISOString();
    setIsConnected(true);
    setRealtimeEvents([]);
    setItems(client.conversation.getItems());

    // Connect to microphone
    await wavRecorder.begin();

    // Connect to audio output
    await wavStreamPlayer.connect();

    // Connect to realtime API
    await client.connect();
    client.sendUserMessageContent([
      {
        type: `input_text`,
        text: `You are an AI job interviewer designed to conduct professional interviews for various roles and industries. Your primary goals are to assess candidates’ qualifications, evaluate their problem-solving skills, and understand their motivation for the job. Tailor your questions to the specific job title and industry provided, and adapt based on the candidate's responses. Your tone should be professional, unbiased, and supportive. After each question, provide follow-up questions to further evaluate the candidate's fit. Avoid discriminatory, overly personal, or irrelevant questions. Ask around 4 major questions. Conclude each interview with a summary of strengths, areas for improvement, and overall impressions based on their answers`,
        // text: `For testing purposes, I want you to list ten car brands. Number each item, e.g. "one (or whatever number you are one): the item name".`
      },
    ]);

    if (client.getTurnDetectionType() === "server_vad") {
      await wavRecorder.record((data) => client.appendInputAudio(data.mono));
    }
  }, []);

  /**
   * Disconnect and reset conversation state
   */
  const disconnectConversation = useCallback(async () => {
    setIsConnected(false);
    setRealtimeEvents([]);
    setItems([]);

    const client = clientRef.current;
    client.disconnect();

    const wavRecorder = wavRecorderRef.current;
    await wavRecorder.end();

    const wavStreamPlayer = wavStreamPlayerRef.current;
    await wavStreamPlayer.interrupt();
  }, []);

  /**
   * Switch between Manual <> VAD mode for communication
   */
  const changeTurnEndType = async (value: string) => {
    const client = clientRef.current;
    const wavRecorder = wavRecorderRef.current;
    if (value === "none" && wavRecorder.getStatus() === "recording") {
      await wavRecorder.pause();
    }
    client.updateSession({
      turn_detection: value === "none" ? null : { type: "server_vad" },
    });
    if (value === "server_vad" && client.isConnected()) {
      await wavRecorder.record((data) => client.appendInputAudio(data.mono));
    }
  };

  /**
   * Auto-scroll the event logs
   */
  useEffect(() => {
    if (eventsScrollRef.current) {
      const eventsEl = eventsScrollRef.current;
      const scrollHeight = eventsEl.scrollHeight;
      // Only scroll if height has just changed
      if (scrollHeight !== eventsScrollHeightRef.current) {
        eventsEl.scrollTop = scrollHeight;
        eventsScrollHeightRef.current = scrollHeight;
      }
    }
  }, [realtimeEvents]);

  /**
   * Auto-scroll the conversation logs
   */
  useEffect(() => {
    const conversationEls = [].slice.call(
      document.body.querySelectorAll("[data-conversation-content]"),
    );
    for (const el of conversationEls) {
      const conversationEl = el as HTMLDivElement;
      conversationEl.scrollTop = conversationEl.scrollHeight;
    }
  }, [items]);

  /**
   * Set up render loops for the visualization canvas
   */
  useEffect(() => {
    let isLoaded = true;

    const wavRecorder = wavRecorderRef.current;
    const clientCanvas = clientCanvasRef.current;
    let clientCtx: CanvasRenderingContext2D | null = null;

    const wavStreamPlayer = wavStreamPlayerRef.current;
    const serverCanvas = serverCanvasRef.current;
    let serverCtx: CanvasRenderingContext2D | null = null;

    const render = () => {
      if (isLoaded) {
        if (clientCanvas) {
          if (!clientCanvas.width || !clientCanvas.height) {
            clientCanvas.width = clientCanvas.offsetWidth;
            clientCanvas.height = clientCanvas.offsetHeight;
          }
          clientCtx = clientCtx || clientCanvas.getContext("2d");
          if (clientCtx) {
            clientCtx.clearRect(0, 0, clientCanvas.width, clientCanvas.height);
            const result = wavRecorder.recording
              ? wavRecorder.getFrequencies("voice")
              : { values: new Float32Array([0]) };
            WavRenderer.drawBars(
              clientCanvas,
              clientCtx,
              result.values,
              "#0099ff",
              10,
              0,
              8,
            );
          }
        }
        if (serverCanvas) {
          if (!serverCanvas.width || !serverCanvas.height) {
            serverCanvas.width = serverCanvas.offsetWidth;
            serverCanvas.height = serverCanvas.offsetHeight;
          }
          serverCtx = serverCtx || serverCanvas.getContext("2d");
          if (serverCtx) {
            serverCtx.clearRect(0, 0, serverCanvas.width, serverCanvas.height);
            const result = wavStreamPlayer.analyser
              ? wavStreamPlayer.getFrequencies("voice")
              : { values: new Float32Array([0]) };
            WavRenderer.drawBars(
              serverCanvas,
              serverCtx,
              result.values,
              "#009900",
              10,
              0,
              8,
            );
          }
        }
        window.requestAnimationFrame(render);
      }
    };
    render();

    return () => {
      isLoaded = false;
    };
  }, []);

  /**
   * Core RealtimeClient and audio capture setup
   * Set all of our instructions, tools, events and more
   */
  useEffect(() => {
    // Get refs
    const wavStreamPlayer = wavStreamPlayerRef.current;
    const client = clientRef.current;

    // Set instructions
    client.updateSession({ instructions: instructions });
    // Set transcription, otherwise we don't get user transcriptions back
    client.updateSession({ input_audio_transcription: { model: "whisper-1" } });

    // handle realtime events from client + server for event logging
    client.on("realtime.event", (realtimeEvent: RealtimeEvent) => {
      setRealtimeEvents((realtimeEvents) => {
        const lastEvent = realtimeEvents[realtimeEvents.length - 1];
        if (lastEvent?.event.type === realtimeEvent.event.type) {
          // if we receive multiple events in a row, aggregate them for display purposes
          lastEvent.count = (lastEvent.count || 0) + 1;
          return realtimeEvents.slice(0, -1).concat(lastEvent);
        } else {
          return realtimeEvents.concat(realtimeEvent);
        }
      });
    });
    client.on("error", (event: any) => console.error(event));
    client.on("conversation.interrupted", async () => {
      const trackSampleOffset = await wavStreamPlayer.interrupt();
      if (trackSampleOffset?.trackId) {
        const { trackId, offset } = trackSampleOffset;
        await client.cancelResponse(trackId, offset);
      }
    });
    client.on("conversation.updated", async ({ item, delta }: any) => {
      const items = client.conversation.getItems();
      if (delta?.audio) {
        wavStreamPlayer.add16BitPCM(delta.audio, item.id);
      }
      if (item.status === "completed" && item.formatted.audio?.length) {
        item.formatted.file = await WavRecorder.decode(
          item.formatted.audio,
          24000,
          24000,
        );
      }
      setItems(items);
    });

    setItems(client.conversation.getItems());

    return () => {
      // cleanup; resets to defaults
      client.reset();
    };
  }, []);

  useEffect(() => {
    setConnect(() => {
      connectConversation();
      changeTurnEndType("server_vad");
    });
    setDisconnect(disconnectConversation);
  }, [connectConversation, disconnectConversation, setConnect, setDisconnect]);

  /**
   * Render the application
   */
  return (
    <div
      className={
        "text-white w-full h-full p-2 shadow-lg shadow-orange-300/50 bg-neutral-900 rounded-lg"
      }
    >
      <div className={"w-full flex gap-4"}>
        <div className={"w-full"}>
          <canvas className={"w-full"} ref={serverCanvasRef} />
        </div>
        <div className={"w-full"}>
          <canvas className={"w-full"} ref={clientCanvasRef} />
        </div>
      </div>
      <div
        data-conversation-content={true}
        className={"w-full h-[400px] flex flex-col gap-1 p-1 overflow-y-hidden"}
      >
        {items.map((conversationItem) => (
          <div
            key={conversationItem.id}
            className={`flex flex-col ${conversationItem.role === "user" ? "items-end" : "items-start"}`}
          >
            <div>
              <div>
                {(conversationItem.role || conversationItem.type).replaceAll(
                  "_",
                  " ",
                )}
              </div>
            </div>
            <div
              className={`p-1 rounded-lg px-2 ${conversationItem.role === "user" ? "bg-neutral-950 ring-1 ring-white" : "bg-neutral-800"}`}
            >
              {/* tool response */}
              {conversationItem.type === "function_call_output" && (
                <div>{conversationItem.formatted.output}</div>
              )}
              {/* tool call */}
              {!!conversationItem.formatted.tool && (
                <div>
                  {conversationItem.formatted.tool.name}(
                  {conversationItem.formatted.tool.arguments})
                </div>
              )}
              {!conversationItem.formatted.tool &&
                conversationItem.role === "user" && (
                  <div>
                    {conversationItem.formatted.transcript ||
                      (conversationItem.formatted.audio?.length
                        ? "(awaiting transcript)"
                        : conversationItem.formatted.text || "(item sent)")}
                  </div>
                )}
              {!conversationItem.formatted.tool &&
                conversationItem.role === "assistant" && (
                  <div>
                    {conversationItem.formatted.transcript ||
                      conversationItem.formatted.text ||
                      "(truncated)"}
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
