/**
 * src/components/ChatPanel.tsx — chat panel.
 */
import React, { ReactNode } from "react";
interface Props { children: ReactNode; }
export function ChatPanel({ children }: Props): React.ReactElement {
  return <div className="chat-panel">{children}</div>;
}
