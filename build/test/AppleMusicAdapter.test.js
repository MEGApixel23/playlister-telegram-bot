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
const chai_1 = require("chai");
const AppleMusicAdapter_1 = require("../src/musicServiceAdapters/AppleMusicAdapter");
const providerTypes_1 = require("../src/constants/providerTypes");
describe('AppleMusicAdapter', () => {
    const testPlaylistId = 'p.1YeWg5ECqrqDQaN';
    it('returns valid music service name', () => {
        const adapter = new AppleMusicAdapter_1.default();
        chai_1.expect(adapter.getName()).to.be.equal('apple');
    });
    it('searches song by title', () => __awaiter(this, void 0, void 0, function* () {
        const adapter = new AppleMusicAdapter_1.default().setUserInfo({ appleUserToken: process.env.APPLE_MUSIC_USER_TOKEN });
        const songInfo = {
            id: null,
            adapterType: providerTypes_1.ProviderTypes.GOOGLE_PROVIDER_TYPE,
            meta: {
                title: 'Compass - The Neighbourhood'
            }
        };
        const playlist = {
            id: testPlaylistId,
            adapterType: providerTypes_1.ProviderTypes.APPLE_PROVIDER_TYPE,
        };
        const addResult = yield adapter.searchAndAddSong(songInfo, playlist);
        chai_1.expect(addResult).to.be.equal(true);
    }));
    // it('calls add song to a playlist method with proper parameters', async () => {
    //   let fnCalled = false;
    //   const adapter = new AppleMusicAdapter({
    //     httpClient: (url, { headers, method, body }) => {
    //       const expectedBody = JSON.stringify({
    //         data: [{
    //           id: 'songId',
    //           type: 'songs',
    //         }]
    //       });
    //
    //       fnCalled = true;
    //       expect(body).to.be.equal(expectedBody);
    //       expect(method).to.be.equal('POST');
    //       expect(headers).to.be.not.empty;
    //       expect(headers['music-user-token']).to.be.equal('userToken');
    //       expect(headers['Content-Type']).to.be.equal('application/json');
    //     }
    //   });
    //
    //   await adapter.addSongToPlaylist('songId', 'playlistId', 'userToken');
    //   expect(fnCalled).to.be.equal(true);
    // });
});
//# sourceMappingURL=AppleMusicAdapter.test.js.map