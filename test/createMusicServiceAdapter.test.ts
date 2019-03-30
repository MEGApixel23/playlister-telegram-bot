import { expect } from 'chai';
import createMusicServiceAdapter from '../src/musicServiceAdapters/createMusicServiceAdapter';
import AppleMusicAdapter from '../src/musicServiceAdapters/AppleMusicAdapter';
import GoogleMusicAdapter from '../src/musicServiceAdapters/GoogleMusicAdapter';

const input = [
  {
    message: 'Some message https://play.google.com/music/m/Tgn7bslcaphqj6tlwbg23iaonei?' +
      't=Compass_-_The_Neighbourhood test',
    type: GoogleMusicAdapter,
  }, {
    message: 'Some message https://itunes.apple.com/us/album/compass/1440532502?i=1440532827 test',
    type: AppleMusicAdapter,
  }, {
    message: 'Some message https://google.com?q=some-search-query test',
    type: null,
  }
];

describe('createMusicServiceAdapter', () => {
  it('creates correct music adapters based on the provided message', () => {
    for (let i = 0; i < input.length; i++) {
      const adapter = createMusicServiceAdapter(input[i].message);

      if (input[i].type) {
        return expect(adapter instanceof input[i].type).to.be.equal(true);
      }

      expect(input[i].type).to.be.equal(null);
    }
  });
});
