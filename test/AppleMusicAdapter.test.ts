import { expect } from 'chai'
import AppleMusicAdapter from '../src/musicServiceAdapters/AppleMusicAdapter';

describe('AppleMusicAdapter', () => {
  it('returns valid music service name', () => {
    const adapter = new AppleMusicAdapter();

    expect(adapter.getName()).to.be.equal('Apple Music');
  });

  it('parses song id from a link', () => {
    const adapter = new AppleMusicAdapter();
    const songId = adapter.parseSongIdFromLink(
      'Some message with a link https://itunes.apple.com/ua/album/viva-la-vida/1122778377?i=1122778616 HERE'
    );

    expect(songId).to.be.equal('1122778616');
  });

  it('calls add song to a playlist method with proper parameters', async () => {
    let fnCalled = false;
    const adapter = new AppleMusicAdapter({
      httpClient: (url, { headers, method, body }) => {
        const expectedBody = JSON.stringify({
          data: [{
            id: 'songId',
            type: 'songs',
          }]
        });

        fnCalled = true;
        expect(body).to.be.equal(expectedBody);
        expect(method).to.be.equal('POST');
        expect(headers).to.be.not.empty;
        expect(headers['music-user-token']).to.be.equal('userToken');
        expect(headers['Content-Type']).to.be.equal('application/json');
      }
    });

    await adapter.addSongToPlaylist('songId', 'playlistId', 'userToken');
    expect(fnCalled).to.be.equal(true);
  });
});
