"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const chk_1 = __importDefault(require("./chk"));
__export(require("./node"));
let self;
if (chk_1.default()) {
    self = require('./node');
}
else {
    self = require('./browser');
}
module.exports = self;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLGdEQUE2QjtBQUM3Qiw0QkFBdUI7QUFFdkIsSUFBSSxJQUFJLENBQUM7QUFFVCxJQUFJLGFBQVEsRUFBRSxFQUNkO0lBQ0MsSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUN6QjtLQUVEO0lBQ0MsSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUM1QjtBQUdELGlCQUFTLElBQXNDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBpc05vZGVKcyBmcm9tICcuL2Noayc7XG5leHBvcnQgKiBmcm9tICcuL25vZGUnO1xuXG5sZXQgc2VsZjtcblxuaWYgKGlzTm9kZUpzKCkpXG57XG5cdHNlbGYgPSByZXF1aXJlKCcuL25vZGUnKTtcbn1cbmVsc2Vcbntcblx0c2VsZiA9IHJlcXVpcmUoJy4vYnJvd3NlcicpO1xufVxuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgPSBzZWxmIGFzIGFueSBhcyB0eXBlb2YgaW1wb3J0KCcuL25vZGUnKTtcbiJdfQ==