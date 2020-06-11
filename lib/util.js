"use strict";
/**
 * Created by user on 2018/6/29/029.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasConsoleStream = exports.createChalkStyleLog = exports.createFnChalkByConsole = exports.isSupportsColor = exports.isForceColor = void 0;
const chalk_1 = __importDefault(require("chalk"));
const env_bool_1 = __importDefault(require("env-bool"));
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
function createFnChalkByConsole(console) {
    return function chalkByConsole(cb, 
    // @ts-ignore
    _console = console) {
        return cb(_console.chalk, _console);
    };
}
exports.createFnChalkByConsole = createFnChalkByConsole;
function createChalkStyleLog(console, name, failBack = 'log') {
    if (!name || typeof name !== 'string' || name in console) {
        throw TypeError(`name is not allow in target console`);
    }
    if (!failBack || typeof failBack !== 'string' || failBack in console) {
        throw TypeError(`failBack is not allow in target console`);
    }
    // @ts-ignore
    if (typeof console._log !== 'function') {
        throw TypeError(`input console not a Console2 like object`);
    }
    return function chalkStyleLog(...argv) {
        // @ts-ignore
        return console._log(name, argv, failBack);
    };
}
exports.createChalkStyleLog = createChalkStyleLog;
function hasConsoleStream(target) {
    return !!(target._stdout && target._stderr);
}
exports.hasConsoleStream = hasConsoleStream;
exports.default = exports;
//# sourceMappingURL=util.js.map