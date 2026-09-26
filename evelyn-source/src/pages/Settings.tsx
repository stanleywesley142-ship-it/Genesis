/**
 * src/pages/Settings.tsx — settings route.
 */
import React from "react";
import { getSettings, updateSettings } from "../convex/settings";
export function Settings(): React.ReactElement {
  const s = getSettings();
  return (
    <div className="settings">
      <h2>Settings</h2>
      <label>
        Voice enabled:
        <input type="checkbox" checked={s.voiceEnabled} onChange={(e) => updateSettings({ voiceEnabled: e.target.checked })} />
      </label>
    </div>
  );
}
