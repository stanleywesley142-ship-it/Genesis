/**
 * src/pages/Photos.tsx — photos / vault route.
 */
import React from "react";
import { getPhotos } from "../convex/photos";
export function Photos(): React.ReactElement {
  const photos = getPhotos();
  return (
    <div className="photos">
      <h2>Photos</h2>
      <p>{photos.length} files in vault.</p>
    </div>
  );
}
