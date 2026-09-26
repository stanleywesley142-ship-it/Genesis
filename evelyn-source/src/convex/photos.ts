/**
 * convex/photos.ts — photos / vault / files backend.
 */

import { listFiles, addFile, getFile, deleteFile, type FileEntry } from "../lib/gatekeeper";

export function getPhotos(): FileEntry[] {
  return listFiles();
}

export function addPhoto(entry: FileEntry): FileEntry {
  addFile(entry);
  return entry;
}

export function getPhoto(id: string): FileEntry | undefined {
  return getFile(id);
}

export function removePhoto(id: string): boolean {
  return deleteFile(id);
}