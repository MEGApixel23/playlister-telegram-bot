"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const urls_1 = require("./constants/urls");
exports.extractUrl = (message) => {
    const keys = Object.keys(urls_1.urlPatterns);
    for (let i = 0; i < keys.length; i++) {
        const match = message.match(urls_1.urlPatterns[keys[i]]);
        if (match && match[0]) {
            return match[0];
        }
    }
    return null;
};
const entities = {
    'amp': '&',
    'apos': '\'',
    'lt': '<',
    'gt': '>',
    'quot': '"',
    'nbsp': '\xa0'
};
const entityPattern = /&([a-z]+);/ig;
exports.decodeHtmlEntities = (input) => (input.replace(entityPattern, (match, entity) => {
    entity = entity.toLowerCase();
    if (entities.hasOwnProperty(entity)) {
        return entities[entity];
    }
    return match;
})
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)));
//# sourceMappingURL=util.js.map