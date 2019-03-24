import fetch from 'node-fetch';
import { Hash } from '../interfaces/main';
import TokenData from '../interfaces/TokenData';
import {
  AddSongToPlaylistRequest,
  AppleMusicAddRequest
} from '../interfaces/AppleMusic';

export default (addSongToPlaylistRequest: AddSongToPlaylistRequest, tokenData: TokenData) => {
  const baseApiUrl = 'https://api.music.apple.com/v1';
  const url = `${ baseApiUrl }/me/library/playlists/${ addSongToPlaylistRequest.playlistId }/tracks`;
  const headers: Hash = {
    Authorization: `Bearer ${ tokenData.developerToken }`,
    'music-user-token': tokenData.userToken,
    'Content-Type': 'application/json'
  };
  const body: AppleMusicAddRequest = {
    data: [{
      id: addSongToPlaylistRequest.songId,
      type: 'songs',
    }]
  };

  return fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify(body)
  });
}
