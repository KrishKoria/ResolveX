import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setisSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  useEffect(() => {
    const vapi = new Vapi("7b02fc94-9521-47ea-8cbe-995b82afe717");
    setVapi(vapi);

    vapi.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });
    vapi.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setisSpeaking(false);
    });
    vapi.on("speech-start", () => {
      setisSpeaking(true);
    });
    vapi.on("speech-end", () => {
      setisSpeaking(false);
    });
    vapi.on("error", (error) => {
      console.error("VAPI error:", error);
      setIsConnecting(false);
    });
    vapi.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final")
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ]);
    });

    return () => {
      vapi?.stop();
    };
  }, []);

  const startCall = () => {
    setIsConnecting(true);
    if (vapi) {
      vapi.start("b21cc86e-d8b0-4e47-a284-5181910e4064");
    }
  };
  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  };
};
