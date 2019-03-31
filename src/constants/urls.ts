import { ProviderTypes } from './providerTypes';

export const urlPatterns = {
  [ProviderTypes.APPLE_PROVIDER_TYPE]: /(https:\/\/itunes.apple.com\S+)/,
  [ProviderTypes.GOOGLE_PROVIDER_TYPE]: /(https:\/\/play.google.com\S+)/,
};
