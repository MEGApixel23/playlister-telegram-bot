import fetch from 'node-fetch';
import { IHash } from '../interfaces/main';
import TokenData from '../interfaces/TokenData';
import { AddSongToPlaylistRequest, AppleMusicAddRequest } from '../interfaces/AppleMusic';

export default (addSongToPlaylistRequest: AddSongToPlaylistRequest, tokenData: TokenData) => {
    const baseApiUrl = 'https://api.music.apple.com/v1';
    const url = `${baseApiUrl}/me/library/playlists/${addSongToPlaylistRequest.playlistId}/tracks`;
    const headers: IHash = {
        Authorization: `Bearer ${tokenData.developerToken}`,
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
