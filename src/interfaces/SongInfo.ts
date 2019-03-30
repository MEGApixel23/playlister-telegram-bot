import { ProviderTypes } from '../constants/providerTypes';

export interface SongInfo {
  id?: string;
  adapterType: ProviderTypes;
  meta: {
    title?: string;
  };
}
