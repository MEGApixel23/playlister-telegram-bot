import { SongInfo, Playlist, UserInfo, MusicServiceAdapter } from '../interfaces';

abstract class BasicAdapter implements MusicServiceAdapter {
  protected readonly name: string;
  protected userInfo: UserInfo;

  protected constructor({ name }: { name: string }) {
    this.name = name;
  }

  getName (): string {
    return this.name;
  }

  isTheSame (adapter: MusicServiceAdapter): boolean {
    return adapter.getName() === this.getName();
  }

  setUserInfo(userInfo: UserInfo): this {
    this.userInfo = userInfo;

    return this;
  }

  abstract getSongInfo (link: string): Promise<SongInfo>;
  abstract getSongInfoRemote (link: string): Promise<SongInfo>;
  abstract addSong (song: SongInfo, playlist: Playlist): Promise<boolean>;
  abstract searchAndAddSong (song: SongInfo, playlist: Playlist): Promise<boolean>;
}

export default BasicAdapter;
