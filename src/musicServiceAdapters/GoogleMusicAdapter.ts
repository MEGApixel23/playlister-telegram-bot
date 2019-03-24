import { MusicServiceAdapter } from '../interfaces/MusicServiceAdapter';

export default class GoogleMusicAdapter implements MusicServiceAdapter {
  getName (): string {
    return 'Google Music';
  }

  parseSongIdFromLink (link: string): string|null {
    return null;
  }

  addSongToPlaylist (songId: string, playlistId: string, userToken: string): Promise<any> {
    return null;
  }
}
