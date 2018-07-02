"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const chk_1 = require("./chk");
__export(require("./node"));
let self;
if (chk_1.default()) {
    self = require('./node').Console2;
}
else {
    self = require('./browser').Console2;
}
exports = self;
