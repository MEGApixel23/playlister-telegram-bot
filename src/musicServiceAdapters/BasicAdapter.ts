import { MusicServiceAdapter } from '../interfaces/MusicServiceAdapter';

abstract class BasicAdapter implements MusicServiceAdapter {
  abstract getName (): string;
  abstract parseSongIdFromLink (link: string): string|null;
  abstract addSongToPlaylist (songId: string, playlistId: string, userToken: string): Promise<any>;
}

export default BasicAdapter;
