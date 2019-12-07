"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const util_1 = require("../src/util");
const messages = [
    [
        'Some message https://play.google.com/music/m/Tgn7bslcaphqj6tlwbg23iaonei?t=Compass_-_The_Neighbourhood test',
        'https://play.google.com/music/m/Tgn7bslcaphqj6tlwbg23iaonei?t=Compass_-_The_Neighbourhood'
    ], [
        'Some message https://itunes.apple.com/us/album/compass/1440532502?i=1440532827 test',
        'https://itunes.apple.com/us/album/compass/1440532502?i=1440532827'
    ], [
        'Some message https://google.com?q=some-search-query test',
        null
    ]
];
describe('util', () => {
    it('correctly extracts music service URLs from messages', () => {
        for (let i = 0; i < messages.length; i++) {
            const url = util_1.extractUrl(messages[i][0]);
            chai_1.expect(url).to.be.equal(messages[i][1]);
        }
    });
    it('correctly decodes HTML entities to symbols', () => {
        chai_1.expect(util_1.decodeHtmlEntities('&#39;')).to.be.equal('\'');
    });
    it('separates command messages from regular messages', () => {
        chai_1.expect(util_1.isCommandMessage('/start something')).to.be.true;
        chai_1.expect(util_1.isCommandMessage('simple message')).to.be.false;
    });
});
//# sourceMappingURL=util.test.js.map