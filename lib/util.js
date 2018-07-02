"use strict";
/**
 * Created by user on 2018/6/29/029.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const env_bool_1 = require("env-bool");
function isForceColor(env) {
    if (typeof env === 'undefined' && process) {
        env = process.env;
    }
    let forceColor = env && env_bool_1.default(env.FORCE_COLOR, true);
    return forceColor;
}
exports.isForceColor = isForceColor;
function isSupportsColor() {
    return chalk_1.default.supportsColor.level;
}
exports.isSupportsColor = isSupportsColor;
const util = require("./util");
exports.default = util;
