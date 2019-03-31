"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require("node-telegram-bot-api");
const config_1 = require("./config");
const handlers_1 = require("./handlers");
const bot = new TelegramBot(config_1.TELEGRAM_TOKEN, { polling: true });
bot.on('message', handlers_1.addSong(bot));
//# sourceMappingURL=main.js.map