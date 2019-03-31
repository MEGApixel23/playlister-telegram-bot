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
const node_fetch_1 = require("node-fetch");
const BasicAdapter_1 = require("./BasicAdapter");
const providerTypes_1 = require("../constants/providerTypes");
const util_1 = require("../util");
class GoogleMusicAdapter extends BasicAdapter_1.default {
    constructor({ httpClient = null } = {}) {
        super({ name: providerTypes_1.ProviderTypes.GOOGLE_PROVIDER_TYPE });
        this.httpClient = httpClient || node_fetch_1.default;
    }
    getSongInfo(link) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: null,
                adapterType: providerTypes_1.ProviderTypes.GOOGLE_PROVIDER_TYPE,
                meta: {},
            };
        });
    }
    getSongInfoRemote(link) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.httpClient(link, { method: 'GET' });
            const content = yield response.text();
            const titlePattern = /og:title" content="(.+?)"\/>/;
            const match = content.match(titlePattern);
            if (!match || !match[1]) {
                return null;
            }
            const title = util_1.decodeHtmlEntities(match[1]);
            return {
                id: null,
                adapterType: providerTypes_1.ProviderTypes.GOOGLE_PROVIDER_TYPE,
                meta: { title }
            };
        });
    }
    addSong(song, playlist) {
        throw new Error('Not implemented');
    }
    searchAndAddSong(song, playlist) {
        throw new Error('Not implemented');
    }
}
exports.default = GoogleMusicAdapter;
//# sourceMappingURL=GoogleMusicAdapter.js.map