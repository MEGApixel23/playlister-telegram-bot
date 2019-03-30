import fetch from 'node-fetch';
import { MusicServiceAdapter } from '../interfaces';
import AppleMusicAdapter from './AppleMusicAdapter';
import GoogleMusicAdapter from './GoogleMusicAdapter';

interface MusicServicePattern {
  regExp: RegExp;
  createService: (options) => MusicServiceAdapter;
}

const patterns: Array<MusicServicePattern> = [
  {
    regExp: /^https:\/\/itunes.apple.com/,
    createService: (options) => new AppleMusicAdapter(options),
  }, {
    regExp: /^https:\/\/play.google.com/,
    createService: (options) => new GoogleMusicAdapter(options),
  }
];

export default (link: string): MusicServiceAdapter|null => {
  for (let i = 0; i < patterns.length; i++) {
    if (patterns[i].regExp.test(link)) {
      return patterns[i].createService({ httpClient: fetch });
    }
  }

  return null;
};
