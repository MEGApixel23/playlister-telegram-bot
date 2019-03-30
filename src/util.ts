import { urlPatterns } from './constants/urls';

export const extractUrl = (message): string => {
  const keys = Object.keys(urlPatterns);

  for (let i = 0; i < keys.length; i++) {
    const match = message.match(urlPatterns[keys[i]]);

    if (match && match[0]) {
      return match[0];
    }
  }

  return null;
};
