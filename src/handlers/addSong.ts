import * as TelegramBot from 'node-telegram-bot-api';
import { MusicServiceAdapter } from '../interfaces';
import createMusicServiceAdapter from '../musicServiceAdapters/createMusicServiceAdapter';
import { extractUrl } from '../util';
import AppleMusicAdapter from '../musicServiceAdapters/AppleMusicAdapter';
import { ProviderTypes } from '../constants/providerTypes';
import { APPLE_MUSIC_USER_TOKEN } from '../config';

export const addSong = (bot: TelegramBot) => async (msg: TelegramBot.Message): Promise<TelegramBot.Message> => {
  const chatId = msg.chat.id;
  const message = msg.text;
  const link = extractUrl(message);

  if (!link) {
    return bot.sendMessage(chatId, 'Link format is unknown');
  }

  const sourceAdapter: MusicServiceAdapter = createMusicServiceAdapter(message);

  if (!sourceAdapter) {
    return bot.sendMessage(chatId, 'Unknown service');
  }

  const destinationAdapter: MusicServiceAdapter = new AppleMusicAdapter();
  const playlist = {
    id: 'p.1YeWg5ECqrqDQaN' || 'p.1YeWgkXuqrqDQaN', // @TODO obtain for each user
    adapterType: ProviderTypes.APPLE_PROVIDER_TYPE
  };

  sourceAdapter.setUserInfo({ appleUserToken: APPLE_MUSIC_USER_TOKEN });
  destinationAdapter.setUserInfo({ appleUserToken: APPLE_MUSIC_USER_TOKEN });

  try {
    if (sourceAdapter.isTheSame(destinationAdapter)) {
      const song = await destinationAdapter.getSongInfo(link);

      await destinationAdapter.addSong(song, playlist);
    } else {
      const song = await sourceAdapter.getSongInfoRemote(link);

      await destinationAdapter.searchAndAddSong(song, playlist);
    }

    return bot.sendMessage(chatId, 'Song was successfully added to playlist');
  } catch (e) {
    return bot.sendMessage(chatId, `Something went wrong: ${e.message}`);
  }
};
