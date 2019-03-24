export interface MusicServiceAdapter {
  getName (): string;
  parseSongIdFromLink (link: string): string|null;
  addSongToPlaylist (songId: string, playlistId: string, userToken: string): Promise<any>;
}
