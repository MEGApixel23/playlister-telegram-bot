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
const GoogleMusicAdapter_1 = require("../src/musicServiceAdapters/GoogleMusicAdapter");
describe('GoogleMusicAdapter', () => {
    it('returns valid music service name', () => {
        const adapter = new GoogleMusicAdapter_1.default();
        chai_1.expect(adapter.getName()).to.be.equal('google');
    });
    it('gets song information by google music link', () => __awaiter(this, void 0, void 0, function* () {
        const adapter = new GoogleMusicAdapter_1.default();
        const remoteSongInfo = yield adapter.getSongInfoRemote('https://play.google.com/music/m/Trfjwvhk3hmcgvsxkti56v75ere?t=Summer_Sun_-_Cari_Cari');
        chai_1.expect(remoteSongInfo).to.be.not.empty;
        chai_1.expect(remoteSongInfo.meta).to.be.not.empty;
        chai_1.expect(remoteSongInfo.meta.title).to.be.equal('Summer Sun - Cari Cari');
    }));
});
//# sourceMappingURL=GoogleMusicAdapter.test.js.map