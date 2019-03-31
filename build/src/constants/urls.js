"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const providerTypes_1 = require("./providerTypes");
exports.urlPatterns = {
    [providerTypes_1.ProviderTypes.APPLE_PROVIDER_TYPE]: /(https:\/\/itunes.apple.com\S+)/,
    [providerTypes_1.ProviderTypes.GOOGLE_PROVIDER_TYPE]: /(https:\/\/play.google.com\S+)/,
};
//# sourceMappingURL=urls.js.map