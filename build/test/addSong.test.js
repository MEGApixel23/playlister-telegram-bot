"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const handlers_1 = require("../src/handlers");
const TelegramBot = require("node-telegram-bot-api");
const botStub = new TelegramBot('test-token');
botStub.sendMessage = (chatId, text) => __awaiter(void 0, void 0, void 0, function* () {
    return ({ text });
});
const messages = [
    {
        input: {
            chat: {
                id: 'chat-id'
            },
            text: 'Some message https://google.com?i=1440532827 test',
        },
        output: 'Link format is unknown',
    }, {
        input: {
            chat: {
                id: 'chat-id'
            },
            text: 'Some message https://itunes.apple.com/us/album/compass/1440532502?i=1440532827 test',
        },
        output: 'Song was successfully added to playlist',
    },
    {
        input: {
            chat: {
                id: 'chat-id'
            },
            text: 'Some message https://play.google.com/music/m/Trfjwvhk3hmcgvsxkti56v75ere?t=Summer_Sun_-_Cari_Cari test',
        },
        output: 'Song was successfully added to playlist',
    }
];
describe('addSong handler', function () {
    this.timeout(5000);
    it('correctly adds song from apple music to apple music playlist', () => __awaiter(this, void 0, void 0, function* () {
        const handler = handlers_1.addSong(botStub);
        for (let i = 0; i < messages.length; i++) {
            const message = yield handler(messages[i].input);
            chai_1.expect(message).to.have.key('text');
            chai_1.expect(message.text).to.be.equal(messages[i].output);
        }
    }));
    it('correctly processes new Apple music link format', () => __awaiter(this, void 0, void 0, function* () {
        const handler = handlers_1.addSong(botStub);
        const incomingMessage = {
            input: {
                chat: {
                    id: 'chat-id'
                },
                text: 'Some message https://music.apple.com/ua/album/lovely/986194842?i=986194846&l=ru test',
            },
            output: 'Song was successfully added to playlist',
        };
        const message = yield handler(incomingMessage.input);
        chai_1.expect(message).to.have.key('text');
        chai_1.expect(message.text).to.be.equal(incomingMessage.output);
    }));
});
//# sourceMappingURL=addSong.test.js.map