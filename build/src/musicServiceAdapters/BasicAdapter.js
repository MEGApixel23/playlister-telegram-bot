"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasicAdapter {
    constructor({ name }) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    isTheSame(adapter) {
        return adapter.getName() === this.getName();
    }
    setUserInfo(userInfo) {
        this.userInfo = userInfo;
        return this;
    }
}
exports.default = BasicAdapter;
//# sourceMappingURL=BasicAdapter.js.map