/**
 * jarvis-voice.worker.ts — Web Worker for voice processing.
 */

export interface VoiceWorkerMessage {
  type: "clean" | "segment" | "cadence";
  payload: string;
}

self.onmessage = (event: MessageEvent<VoiceWorkerMessage>) => {
  const { type, payload } = event.data;
  let result: unknown;

  switch (type) {
    case "clean": {
      // Strip PII in worker thread.
      let out = payload || "";
      out = out.replace(/[\w.-]+@[\w.-]+\.\w+/g, "[redacted]");
      out = out.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, "[redacted]");
      result = out.trim();
      break;
    }
    case "segment": {
      const sentences = (payload || "").match(/[^.!?]+[.!?]+|\S+/g) || [];
      result = sentences.slice(0, 50);
      break;
    }
    case "cadence": {
      const words = (payload || "").split(/\s+/).filter(Boolean).length;
      result = Math.max(120, Math.min(200, 120 + words * 2));
      break;
    }
    default:
      result = null;
  }

  self.postMessage({ type, result });
};