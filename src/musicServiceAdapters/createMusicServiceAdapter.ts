import { MusicServiceAdapter } from '../interfaces/MusicServiceAdapter';
import AppleMusicAdapter from './AppleMusicAdapter';
import GoogleMusicAdapter from './GoogleMusicAdapter';

const patterns = [
  {
    regExp: /^https:\/\/itunes.apple.com/,
    type: AppleMusicAdapter,
  }, {
    regExp: /^https:\/\/play.google.com/,
    type: GoogleMusicAdapter,
  }
];

export default (link: string): MusicServiceAdapter|null => {
  for (let i = 0; i < patterns.length; i++) {
    if (patterns[i].regExp.test(link)) {
      return new patterns[i].type();
    }
  }

  return null;
};
