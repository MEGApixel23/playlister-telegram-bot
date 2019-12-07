"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppleMusicAdapter_1 = require("./AppleMusicAdapter");
const GoogleMusicAdapter_1 = require("./GoogleMusicAdapter");
const urls_1 = require("../constants/urls");
const providerTypes_1 = require("../constants/providerTypes");
const patterns = [
    {
        regExps: urls_1.urlPatterns[providerTypes_1.ProviderTypes.APPLE_PROVIDER_TYPE],
        createService: () => new AppleMusicAdapter_1.default(),
    }, {
        regExps: urls_1.urlPatterns[providerTypes_1.ProviderTypes.GOOGLE_PROVIDER_TYPE],
        createService: () => new GoogleMusicAdapter_1.default(),
    }
];
exports.default = (link) => {
    for (let i = 0; i < patterns.length; i++) {
        for (let j = 0; j < patterns[i].regExps.length; j++) {
            if (patterns[i].regExps[j].test(link)) {
                return patterns[i].createService();
            }
        }
    }
    return null;
};
//# sourceMappingURL=createMusicServiceAdapter.js.map