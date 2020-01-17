"use strict";
/**
 * Created by user on 2018/7/2/002.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("./node"));
__export(require("./node"));
class Console2 extends node_1.default {
    constructor(target = console, options) {
        super(target, options);
        this.enabledColor = false;
    }
}
exports.Console2 = Console2;
exports.default = Console2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7Ozs7OztBQUVILGtEQUFpQztBQUNqQyw0QkFBdUI7QUFJdkIsTUFBYSxRQUFTLFNBQVEsY0FBVztJQUd4QyxZQUFZLE1BQU0sR0FBRyxPQUFPLEVBQUUsT0FBa0I7UUFFL0MsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV2QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0NBRUQ7QUFWRCw0QkFVQztBQUVELGtCQUFlLFFBQVEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTgvNy8yLzAwMi5cbiAqL1xuXG5pbXBvcnQgQ29uc29sZU5vZGUgZnJvbSAnLi9ub2RlJztcbmV4cG9ydCAqIGZyb20gJy4vbm9kZSc7XG5pbXBvcnQgeyBzdHlsZU5hbWVzLCBzdHlsZU5hbWVzRm4gfSBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQgeyBJT3B0aW9ucyB9IGZyb20gJy4vdmFsJztcblxuZXhwb3J0IGNsYXNzIENvbnNvbGUyIGV4dGVuZHMgQ29uc29sZU5vZGVcbntcblxuXHRjb25zdHJ1Y3Rvcih0YXJnZXQgPSBjb25zb2xlLCBvcHRpb25zPzogSU9wdGlvbnMpXG5cdHtcblx0XHRzdXBlcih0YXJnZXQsIG9wdGlvbnMpO1xuXG5cdFx0dGhpcy5lbmFibGVkQ29sb3IgPSBmYWxzZTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnNvbGUyXG4iXX0=