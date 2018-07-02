"use strict";
/**
 * Created by user on 2018/7/2/002.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
__export(require("./node"));
class Console2 extends node_1.default {
    constructor(target = console, options) {
        super(target, options);
        this.enabledColor = false;
    }
}
exports.Console2 = Console2;
exports.default = Console2;
