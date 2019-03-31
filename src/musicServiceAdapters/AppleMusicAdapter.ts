import fetch from 'node-fetch';
import { AppleMusicAddRequest } from '../interfaces/apple/AppleMusicRequests';
import { APPLE_MUSIC_DEVELOPER_TOKEN } from '../config';
import BasicAdapter from './BasicAdapter';
import { ProviderTypes } from '../constants/providerTypes';
import AppleSearchSongsResponse from '../interfaces/apple/AppleSearchSongsReponse';
import {
  Hash, MusicServiceAdapter, SongInfo, Playlist,
} from '../interfaces';

export default class AppleMusicAdapter extends BasicAdapter implements MusicServiceAdapter {
  private readonly baseApiUrl: string = 'https://api.music.apple.com/v1';
  private readonly developerToken: string = APPLE_MUSIC_DEVELOPER_TOKEN;
  private readonly httpClient;

  constructor ({ httpClient = null } = {}) {
    super({ name: ProviderTypes.APPLE_PROVIDER_TYPE });
    this.httpClient = httpClient || fetch;
  }

  async getSongInfo (link: string): Promise<SongInfo> {
    return {
      id: this.parseSongIdFromLink(link),
      adapterType: ProviderTypes.APPLE_PROVIDER_TYPE,
      meta: {},
    };
  }

  async getSongInfoRemote (link: string): Promise<SongInfo> {
    return {
      id: this.parseSongIdFromLink(link),
      adapterType: ProviderTypes.APPLE_PROVIDER_TYPE,
      meta: {},
    };
  }

  async addSong (song: SongInfo, playlist: Playlist): Promise<boolean> {
    return this.addSongToPlaylist(song.id, playlist.id);
  }

  async searchAndAddSong (song: SongInfo, playlist: Playlist): Promise<boolean> {
    const songId = await this.searchSongId(song);

    if (!songId) {
      throw new Error('No songs found');
    }

    const appleSongInfo = {
      id: songId,
      adapterType: ProviderTypes.APPLE_PROVIDER_TYPE,
      meta: {}
    };

    return this.addSong(appleSongInfo, playlist);
  }

  private parseSongIdFromLink (link: string): string|null {
    const regExp = /i=([0-9]+)/;
    const match = link.match(regExp);

    if (match && match[1]) {
      return <string> match[1];
    }

    return null;
  }

  private async addSongToPlaylist (songId: string, playlistId: string): Promise<boolean> {
    const url: string = `${this.baseApiUrl}/me/library/playlists/${playlistId}/tracks`;
    const body: AppleMusicAddRequest = {
      data: [{
        id: songId,
        type: 'songs',
      }]
    };
    const { ok } = await this.httpClient(url, {
      headers: this.getAuthHeaders(this.userInfo.appleUserToken),
      method: 'POST',
      body: JSON.stringify(body)
    });

    return ok;
  }

  private async searchSongId (song: SongInfo): Promise<string> {
    const searchTerm = encodeURIComponent(song.meta.title);
    const limit = 1;
    const types = 'songs';
    const storefront = 'us';
    const url = `${this.baseApiUrl}/catalog/${storefront}/search?term=${searchTerm}&limit=${limit}&types=${types}`;
    const response = await this.httpClient(url, {
      headers: this.getAuthHeaders(this.userInfo.appleUserToken),
      method: 'GET'
    });
    const responseParsed = <AppleSearchSongsResponse.AppleSearchSongsResponse> await response.json();

    if (
      responseParsed && responseParsed.results && responseParsed.results.songs &&
      responseParsed.results.songs.data && responseParsed.results.songs.data[0] &&
      responseParsed.results.songs.data[0].id
    ) {
      return responseParsed.results.songs.data[0].id;
    }

    return null;
  }

  private getAuthHeaders (userToken: string): Hash {
    return <Hash> {
      Authorization: `Bearer ${this.developerToken}`,
      'music-user-token': userToken,
      'Content-Type': 'application/json',
    };
  }
}
