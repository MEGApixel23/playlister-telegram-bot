"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const createMusicServiceAdapter_1 = require("../src/musicServiceAdapters/createMusicServiceAdapter");
const AppleMusicAdapter_1 = require("../src/musicServiceAdapters/AppleMusicAdapter");
const GoogleMusicAdapter_1 = require("../src/musicServiceAdapters/GoogleMusicAdapter");
const input = [
    {
        message: 'Some message https://play.google.com/music/m/Tgn7bslcaphqj6tlwbg23iaonei?' +
            't=Compass_-_The_Neighbourhood test',
        type: GoogleMusicAdapter_1.default,
    }, {
        message: 'Some message https://itunes.apple.com/us/album/compass/1440532502?i=1440532827 test',
        type: AppleMusicAdapter_1.default,
    }, {
        message: 'Some message https://google.com?q=some-search-query test',
        type: null,
    }
];
describe('createMusicServiceAdapter', () => {
    it('creates correct music adapters based on the provided message', () => {
        for (let i = 0; i < input.length; i++) {
            const adapter = createMusicServiceAdapter_1.default(input[i].message);
            if (input[i].type) {
                return chai_1.expect(adapter instanceof input[i].type).to.be.equal(true);
            }
            chai_1.expect(input[i].type).to.be.equal(null);
        }
    });
});
//# sourceMappingURL=createMusicServiceAdapter.test.js.map