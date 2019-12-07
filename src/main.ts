import * as TelegramBot from 'node-telegram-bot-api';

import { TELEGRAM_TOKEN } from './config';
import { addSong } from './handlers';
import { isCommandMessage } from './util';
import MessageLogger from './services/MessageLogger';

const bot: TelegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
const messageLogger: MessageLogger = new MessageLogger();

bot.onText(/^\/start/, (msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;

  return bot.sendMessage(chatId, 'Hey!');
});

bot.on('text', (msg: TelegramBot.Message) => {
  messageLogger.save(msg);

  if (isCommandMessage(msg.text)) {
    return null;
  }

  return addSong(bot)(msg);
});
