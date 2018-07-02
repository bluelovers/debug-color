"use strict";
/**
 * Created by user on 2018/6/26/026.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const val = require("./val");
exports.SYM_DEBUG_CONSOLE = Symbol('DebugConsole');
exports.SYM_CHALK = Symbol('chalk');
exports.SYM_CONSOLE = Symbol('console');
exports.SYM_EVENT = Symbol('event');
exports.SYM_DATA = Symbol('data');
exports.default = val;
exports.defaultColors = {
    error: 'red',
    exception: 'red',
    warn: 'red',
    fail: 'red',
    info: 'cyan',
    debug: 'cyan',
    success: 'green',
    ok: 'green',
};
