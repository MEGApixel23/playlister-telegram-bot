import fetch from 'node-fetch';
import {
  MusicServiceAdapter,
  Playlist,
  SongInfo
} from '../interfaces';
import BasicAdapter from './BasicAdapter';
import { ProviderTypes } from '../constants/providerTypes';
import { decodeHtmlEntities } from '../util';

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
    const titlePattern = /og:title" content="(.+?)"\/>/;
    const match = content.match(titlePattern);

    if (!match || !match[1]) {
      return null;
    }

    const title = decodeHtmlEntities(match[1]);

    return {
      id: null,
      adapterType: ProviderTypes.GOOGLE_PROVIDER_TYPE,
      meta: { title }
    };
  }

  addSong (song: SongInfo, playlist: Playlist): Promise<boolean> {
    throw new Error('Not implemented');
  }

  searchAndAddSong (song: SongInfo, playlist: Playlist): Promise<boolean> {
    throw new Error('Not implemented');
  }
}
