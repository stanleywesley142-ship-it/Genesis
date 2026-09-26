/**
 * src/pages/Dashboard.tsx — Evelyn's home route.
 */

import React, { useState } from "react";
import { think } from "../lib/jarvis-brain";
import { parseCommand } from "../lib/jarvis-parser";
import { HoloMap } from "../components/HoloMap";
import { TvModeOverlay } from "../components/TvModeOverlay";

export function Dashboard(): React.ReactElement {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("Hello! I'm Evelyn. What can I do for you?");
  const [busy, setBusy] = useState(false);

  async function submit() {
    const text = input.trim();
    if (!text) return;
    setBusy(true);
    const parsed = parseCommand(text);
    const result = think(text);
    setReply(result.reply);
    setInput("");
    setBusy(false);
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Evelyn</h1>
        <p className="subtitle">her complete source bundle</p>
      </header>

      <div className="chat">
        <div className="chat-reply">{busy ? "thinking..." : reply}</div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Ask Evelyn anything..."
          />
          <button onClick={submit} disabled={busy}>Send</button>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h2>HoloMap</h2>
          <HoloMap />
        </div>
        <div className="card">
          <h2>TV</h2>
          <TvModeOverlay />
        </div>
      </div>
    </div>
  );
}