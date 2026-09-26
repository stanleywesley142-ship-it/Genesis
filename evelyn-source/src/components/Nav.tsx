/**
 * src/components/Nav.tsx — navigation.
 */
import React from "react";
export function Nav(): React.ReactElement {
  return (
    <nav className="nav">
      <a href="/">Home</a>
      <a href="/mail">Mail</a>
      <a href="/cinema">Cinema</a>
      <a href="/music">Music</a>
      <a href="/workshop">Workshop</a>
    </nav>
  );
}
