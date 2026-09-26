/**
 * src/pages/JarvisMail.tsx — Gmail bridge route.
 */

import React, { useState } from "react";
import { listEmails, searchEmails } from "../convex/emails";
import type { Email } from "../convex/emails";

export function JarvisMail(): React.ReactElement {
  const [query, setQuery] = useState("");
  const emails: Email[] = query ? searchEmails(query) : listEmails();

  return (
    <div className="jarvis-mail">
      <h2>JarvisMail</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search emails..."
      />
      <ul className="email-list">
        {emails.map((e) => (
          <li key={e.id}>
            <strong>{e.subject}</strong>
            <span>{e.from}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}