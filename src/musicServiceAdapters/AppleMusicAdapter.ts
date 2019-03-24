import fetch from 'node-fetch';
import { Hash } from '../interfaces/common';
import { MusicServiceAdapter } from '../interfaces/MusicServiceAdapter';
import { AppleMusicAddRequest } from '../interfaces/AppleMusicRequests';
import { APPLE_MUSIC_DEVELOPER_TOKEN } from '../config';
import BasicAdapter from './BasicAdapter';

export default class AppleMusicAdapter extends BasicAdapter implements MusicServiceAdapter {
  private readonly baseApiUrl: string = 'https://api.music.apple.com/v1';
  private readonly developerToken: string = APPLE_MUSIC_DEVELOPER_TOKEN;
  private readonly httpClient;

  constructor ({ httpClient = null } = {}) {
    super();
    this.httpClient = httpClient || fetch;
  }

  getName (): string {
    return 'Apple Music';
  }

  parseSongIdFromLink (link: string): string|null {
    const regExp = /i=([0-9]+)/;
    const match = link.match(regExp);

    if (match && match[1]) {
      return <string> match[1];
    }

    return null;
  }

  addSongToPlaylist (songId: string, playlistId: string, userToken: string): Promise<any> {
    const url: string = `${this.baseApiUrl}/me/library/playlists/${playlistId}/tracks`;
    const body: AppleMusicAddRequest = {
      data: [{
        id: songId,
        type: 'songs',
      }]
    };

    return this.httpClient(url, {
      headers: this.getAuthHeaders(userToken),
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  private getAuthHeaders (userToken: string): Hash {
    return <Hash> {
      Authorization: `Bearer ${this.developerToken}`,
      'music-user-token': userToken,
      'Content-Type': 'application/json',
    };
  }
}
