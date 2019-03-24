import * as TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_TOKEN, APPLE_MUSIC_USER_TOKEN } from './config';
import createMusicServiceAdapter from './musicServiceAdapters/createMusicServiceAdapter';
import { MusicServiceAdapter } from './interfaces/MusicServiceAdapter';

const bot: TelegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg: TelegramBot.Message): Promise<TelegramBot.Message> => {
  const chatId = msg.chat.id;
  const message = msg.text;
  const provider: MusicServiceAdapter = createMusicServiceAdapter(message);

  if (!provider) {
    return bot.sendMessage(chatId, 'Unknown service');
  }

  const songId = provider.parseSongIdFromLink(message);
  const playlistId = 'p.1YeWgkXuqrqDQaN'; // @TODO obtain user's playlist id
  const userToken = APPLE_MUSIC_USER_TOKEN; // @TODO obtain user's token

  if (!songId) {
    return bot.sendMessage(chatId, 'Link format is unknown');
  }

  try {
    await provider.addSongToPlaylist(songId, playlistId, userToken);

    return bot.sendMessage(chatId, 'Song was successfully added to playlist');
  } catch (e) {
    return bot.sendMessage(chatId, `Something went wrong: ${e.message}`);
  }
});

