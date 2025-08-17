"use client";
import { useVapi } from "@/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const {
    startCall,
    endCall,
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
  } = useVapi();
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button onClick={startCall} disabled={isConnected || isConnecting}>
        Start Call
      </Button>
      <Button onClick={endCall} variant={"destructive"} disabled={!isConnected}>
        End Call
      </Button>
      <p>{isConnected ? "Connected" : "Disconnected"}</p>
      <p>{isConnecting ? "Connecting..." : "Disconnected"}</p>
      <p>{isSpeaking ? "Speaking..." : "Not Speaking"}</p>
      <p>{JSON.stringify(transcript, null, 2)}</p>
    </div>
  );
}
