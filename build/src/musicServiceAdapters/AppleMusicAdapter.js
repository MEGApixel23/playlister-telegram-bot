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
const config_1 = require("../config");
const BasicAdapter_1 = require("./BasicAdapter");
const providerTypes_1 = require("../constants/providerTypes");
class AppleMusicAdapter extends BasicAdapter_1.default {
    constructor({ httpClient = null } = {}) {
        super({ name: providerTypes_1.ProviderTypes.APPLE_PROVIDER_TYPE });
        this.baseApiUrl = 'https://api.music.apple.com/v1';
        this.developerToken = config_1.APPLE_MUSIC_DEVELOPER_TOKEN;
        this.httpClient = httpClient || node_fetch_1.default;
    }
    getSongInfo(link) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: this.parseSongIdFromLink(link),
                adapterType: providerTypes_1.ProviderTypes.APPLE_PROVIDER_TYPE,
                meta: {},
            };
        });
    }
    getSongInfoRemote(link) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: this.parseSongIdFromLink(link),
                adapterType: providerTypes_1.ProviderTypes.APPLE_PROVIDER_TYPE,
                meta: {},
            };
        });
    }
    addSong(song, playlist) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.addSongToPlaylist(song.id, playlist.id);
        });
    }
    searchAndAddSong(song, playlist) {
        return __awaiter(this, void 0, void 0, function* () {
            const songId = yield this.searchSongId(song);
            if (!songId) {
                throw new Error('No songs found');
            }
            const appleSongInfo = {
                id: songId,
                adapterType: providerTypes_1.ProviderTypes.APPLE_PROVIDER_TYPE,
                meta: {}
            };
            return this.addSong(appleSongInfo, playlist);
        });
    }
    parseSongIdFromLink(link) {
        const regExp = /i=([0-9]+)/;
        const match = link.match(regExp);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }
    addSongToPlaylist(songId, playlistId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseApiUrl}/me/library/playlists/${playlistId}/tracks`;
            const body = {
                data: [{
                        id: songId,
                        type: 'songs',
                    }]
            };
            const { ok } = yield this.httpClient(url, {
                headers: this.getAuthHeaders(this.userInfo.appleUserToken),
                method: 'POST',
                body: JSON.stringify(body)
            });
            return ok;
        });
    }
    searchSongId(song) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchTerm = encodeURIComponent(song.meta.title);
            const limit = 1;
            const types = 'songs';
            const storefront = 'us';
            const url = `${this.baseApiUrl}/catalog/${storefront}/search?term=${searchTerm}&limit=${limit}&types=${types}`;
            const response = yield this.httpClient(url, {
                headers: this.getAuthHeaders(this.userInfo.appleUserToken),
                method: 'GET'
            });
            const responseParsed = yield response.json();
            if (responseParsed && responseParsed.results && responseParsed.results.songs &&
                responseParsed.results.songs.data && responseParsed.results.songs.data[0] &&
                responseParsed.results.songs.data[0].id) {
                return responseParsed.results.songs.data[0].id;
            }
            return null;
        });
    }
    getAuthHeaders(userToken) {
        return {
            Authorization: `Bearer ${this.developerToken}`,
            'music-user-token': userToken,
            'Content-Type': 'application/json',
        };
    }
}
exports.default = AppleMusicAdapter;
//# sourceMappingURL=AppleMusicAdapter.js.map