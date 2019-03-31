import { SongInfo } from './SongInfo';
import { Playlist } from './Playlist';
import { UserInfo } from './UserInfo';

export interface MusicServiceAdapter {
  getName (): string;
  isTheSame (adapter: MusicServiceAdapter): boolean;
  getSongInfo (link: string): Promise<SongInfo>;
  getSongInfoRemote (link: string): Promise<SongInfo>;
  addSong (song: SongInfo, playlist: Playlist): Promise<boolean>;
  searchAndAddSong (song: SongInfo, playlist: Playlist): Promise<boolean>;
  setUserInfo (userInfo: UserInfo): this;
}
