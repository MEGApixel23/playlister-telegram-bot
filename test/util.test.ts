import { expect } from 'chai';
import { extractUrl, decodeHtmlEntities, isCommandMessage } from '../src/util';

const messages = [
  [
    'Some message https://play.google.com/music/m/Tgn7bslcaphqj6tlwbg23iaonei?t=Compass_-_The_Neighbourhood test',
    'https://play.google.com/music/m/Tgn7bslcaphqj6tlwbg23iaonei?t=Compass_-_The_Neighbourhood'
  ], [
    'Some message https://itunes.apple.com/us/album/compass/1440532502?i=1440532827 test',
    'https://itunes.apple.com/us/album/compass/1440532502?i=1440532827'
  ], [
    'Some message https://google.com?q=some-search-query test',
    null
  ]
];

describe('util', () => {
  it('correctly extracts music service URLs from messages', () => {
    for (let i = 0; i < messages.length; i++) {
      const url = extractUrl(messages[i][0]);

      expect(url).to.be.equal(messages[i][1]);
    }
  });

  it('correctly decodes HTML entities to symbols', () => {
    expect(decodeHtmlEntities('&#39;')).to.be.equal('\'');
  });

  it('separates command messages from regular messages', () => {
    expect(isCommandMessage('/start something')).to.be.true;
    expect(isCommandMessage('simple message')).to.be.false;
  });
});
