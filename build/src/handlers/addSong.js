"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const createMusicServiceAdapter_1 = require("../musicServiceAdapters/createMusicServiceAdapter");
const util_1 = require("../util");
const AppleMusicAdapter_1 = require("../musicServiceAdapters/AppleMusicAdapter");
const providerTypes_1 = require("../constants/providerTypes");
const config_1 = require("../config");
exports.addSong = (bot) => (msg) => __awaiter(this, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    const message = msg.text;
    const link = util_1.extractUrl(message);
    if (!link) {
        return bot.sendMessage(chatId, 'Link format is unknown');
    }
    const sourceAdapter = createMusicServiceAdapter_1.default(message);
    if (!sourceAdapter) {
        return bot.sendMessage(chatId, 'Unknown service');
    }
    const destinationAdapter = new AppleMusicAdapter_1.default();
    const playlist = {
        id: 'p.1YeWg5ECqrqDQaN' || 'p.1YeWgkXuqrqDQaN',
        adapterType: providerTypes_1.ProviderTypes.APPLE_PROVIDER_TYPE
    };
    sourceAdapter.setUserInfo({ appleUserToken: config_1.APPLE_MUSIC_USER_TOKEN });
    destinationAdapter.setUserInfo({ appleUserToken: config_1.APPLE_MUSIC_USER_TOKEN });
    try {
        if (sourceAdapter.isTheSame(destinationAdapter)) {
            const song = yield destinationAdapter.getSongInfo(link);
            yield destinationAdapter.addSong(song, playlist);
        }
        else {
            const song = yield sourceAdapter.getSongInfoRemote(link);
            yield destinationAdapter.searchAndAddSong(song, playlist);
        }
        return bot.sendMessage(chatId, 'Song was successfully added to playlist');
    }
    catch (e) {
        return bot.sendMessage(chatId, `Something went wrong: ${e.message}`);
    }
});
//# sourceMappingURL=addSong.js.map