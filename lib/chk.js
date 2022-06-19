"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeJs = void 0;
function isNodeJs() {
    try {
		if (
			typeof process !== 'undefined' && 
			process.release.name.search(/node|io.js/) !== -1
		) {
			return true;
      }
		return false;
    }
    catch (e) {
    }
}
exports.isNodeJs = isNodeJs;
exports.default = isNodeJs;
//# sourceMappingURL=chk.js.map