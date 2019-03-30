import fetch from 'node-fetch';
import {
  MusicServiceAdapter,
  Playlist,
  SongInfo
} from '../interfaces';
import BasicAdapter from './BasicAdapter';
import { ProviderTypes } from '../constants/providerTypes';

export default class GoogleMusicAdapter extends BasicAdapter implements MusicServiceAdapter {
  private readonly httpClient;

  constructor ({ httpClient = null } = {}) {
    super({ name: ProviderTypes.GOOGLE_PROVIDER_TYPE });
    this.httpClient = httpClient || fetch;
  }

  async getSongInfo (link: string): Promise<SongInfo> {
    return {
      id: null,
      adapterType: ProviderTypes.GOOGLE_PROVIDER_TYPE,
      meta: {},
    };
  }

  async getSongInfoRemote (link: string): Promise<SongInfo> {
    const response = await this.httpClient(link, { method: 'GET' });
    const content = await response.text();
    const title = /og:title" content="(.+?)"\/>/;
    const match = content.match(title);

    if (!match || !match[1]) {
      return null;
    }

    return {
      id: null,
      adapterType: ProviderTypes.GOOGLE_PROVIDER_TYPE,
      meta: {
        title: match[1]
      },
    };
  }

  addSong (song: SongInfo, playlist: Playlist): Promise<any> {
    throw new Error('Not implemented');
  }

  searchAndAddSong (song: SongInfo, playlist: Playlist): Promise<boolean> {
    throw new Error('Not implemented');
  }
}
