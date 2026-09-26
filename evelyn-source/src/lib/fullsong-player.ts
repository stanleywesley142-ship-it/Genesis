/**
 * fullsong-player.ts — full-song music engine.
 */

export interface Song {
  title: string;
  artist: string;
  bpm: number;
  duration: number;
}

export class FullSongPlayer {
  private current: Song | null = null;
  private playing = false;

  play(song: Song): void {
    this.current = song;
    this.playing = true;
  }

  pause(): void {
    this.playing = false;
  }

  resume(): void {
    if (this.current) this.playing = true;
  }

  stop(): void {
    this.current = null;
    this.playing = false;
  }

  status(): { playing: boolean; song: Song | null } {
    return { playing: this.playing, song: this.current };
  }
}