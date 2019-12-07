import { MusicServiceAdapter } from '../interfaces';
import AppleMusicAdapter from './AppleMusicAdapter';
import GoogleMusicAdapter from './GoogleMusicAdapter';
import { urlPatterns } from '../constants/urls';
import { ProviderTypes } from '../constants/providerTypes';

interface MusicServicePattern {
  regExps: RegExp[];
  createService: () => MusicServiceAdapter;
}

const patterns: Array<MusicServicePattern> = [
  {
    regExps: urlPatterns[ProviderTypes.APPLE_PROVIDER_TYPE],
    createService: () => new AppleMusicAdapter(),
  }, {
    regExps: urlPatterns[ProviderTypes.GOOGLE_PROVIDER_TYPE],
    createService: () => new GoogleMusicAdapter(),
  }
];

export default (link: string): MusicServiceAdapter|null => {
  for (let i = 0; i < patterns.length; i++) {
    for (let j = 0; j < patterns[i].regExps.length; j++) {
      if (patterns[i].regExps[j].test(link)) {
        return patterns[i].createService();
      }
    }
  }

  return null;
};
