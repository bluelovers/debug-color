"use strict";
/**
 * Created by user on 2018/7/2/002.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isNodeJs() {
    try {
        require('console');
        // @ts-ignore
        if (console._stdout && console._stderr) {
            return true;
        }
    }
    catch (e) {
    }
    return false;
}
exports.isNodeJs = isNodeJs;
exports.default = isNodeJs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFFSCxTQUFnQixRQUFRO0lBRXZCLElBQ0E7UUFDQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbkIsYUFBYTtRQUNiLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxFQUN0QztZQUNDLE9BQU8sSUFBSSxDQUFBO1NBQ1g7S0FDRDtJQUNELE9BQU8sQ0FBQyxFQUNSO0tBRUM7SUFFRCxPQUFPLEtBQUssQ0FBQTtBQUNiLENBQUM7QUFsQkQsNEJBa0JDO0FBRUQsa0JBQWUsUUFBUSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC83LzIvMDAyLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc05vZGVKcygpXG57XG5cdHRyeVxuXHR7XG5cdFx0cmVxdWlyZSgnY29uc29sZScpO1xuXG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdGlmIChjb25zb2xlLl9zdGRvdXQgJiYgY29uc29sZS5fc3RkZXJyKVxuXHRcdHtcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHR9XG5cdGNhdGNoIChlKVxuXHR7XG5cblx0fVxuXG5cdHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQgZGVmYXVsdCBpc05vZGVKc1xuIl19