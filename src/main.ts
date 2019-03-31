import * as TelegramBot from 'node-telegram-bot-api';

import { TELEGRAM_TOKEN } from './config';
import { addSong } from './handlers';

const bot: TelegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on('message', addSong(bot));

