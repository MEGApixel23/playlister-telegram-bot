import { expect } from 'chai';
import AppleMusicAdapter from '../src/musicServiceAdapters/AppleMusicAdapter';
import { ProviderTypes } from '../src/constants/providerTypes';

describe('AppleMusicAdapter', () => {
  const testPlaylistId = 'p.1YeWg5ECqrqDQaN';

  it('returns valid music service name', () => {
    const adapter = new AppleMusicAdapter();

    expect(adapter.getName()).to.be.equal('apple');
  });

  it('searches song by title', async () => {
    const adapter = new AppleMusicAdapter().setUserInfo({ appleUserToken: process.env.APPLE_MUSIC_USER_TOKEN });
    const songInfo = {
      id: null,
      adapterType: ProviderTypes.GOOGLE_PROVIDER_TYPE,
      meta: {
        title: 'Compass - The Neighbourhood'
      }
    };
    const playlist = {
      id: testPlaylistId,
      adapterType: ProviderTypes.APPLE_PROVIDER_TYPE,
    };
    const addResult = await adapter.searchAndAddSong(songInfo, playlist);

    expect(addResult).to.be.equal(true);
  });

  // it('calls add song to a playlist method with proper parameters', async () => {
  //   let fnCalled = false;
  //   const adapter = new AppleMusicAdapter({
  //     httpClient: (url, { headers, method, body }) => {
  //       const expectedBody = JSON.stringify({
  //         data: [{
  //           id: 'songId',
  //           type: 'songs',
  //         }]
  //       });
  //
  //       fnCalled = true;
  //       expect(body).to.be.equal(expectedBody);
  //       expect(method).to.be.equal('POST');
  //       expect(headers).to.be.not.empty;
  //       expect(headers['music-user-token']).to.be.equal('userToken');
  //       expect(headers['Content-Type']).to.be.equal('application/json');
  //     }
  //   });
  //
  //   await adapter.addSongToPlaylist('songId', 'playlistId', 'userToken');
  //   expect(fnCalled).to.be.equal(true);
  // });
});
