"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noop = function () { };
exports.methods_stdout = [
    "debug",
    "info",
    "log",
];
exports.methods_output = [
    "table",
    "dir",
    "dirxml",
];
exports.methods_other = [
    "clear",
    "group",
    "groupCollapsed",
    "groupEnd",
    "time",
    "timeEnd",
    "count",
];
exports.methods_inspector = [
    "profile",
    "profileEnd",
    "timeStamp",
    "markTimeline",
    "timeline",
    "timelineEnd",
];
exports.methods_stderr = [
    "assert",
    "error",
    "trace",
    "warn",
    "exception",
];
exports.methods = [].concat(exports.methods_stdout, exports.methods_stderr, exports.methods_inspector, exports.methods_other, exports.methods_output);
function fillProperty(target = console, ls = exports.methods, fn = noop) {
    ls.forEach(function (method) {
        if (!(method in target)) {
            target[method] = noop;
        }
    });
    return target;
}
exports.fillProperty = fillProperty;
exports.default = fillProperty;
