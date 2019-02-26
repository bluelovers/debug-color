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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsbC1wcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGwtcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxNQUFNLElBQUksR0FBRyxjQUFhLENBQUMsQ0FBQztBQUNmLFFBQUEsY0FBYyxHQUFHO0lBRTdCLE9BQU87SUFFUCxNQUFNO0lBQ04sS0FBSztDQUVMLENBQUM7QUFFVyxRQUFBLGNBQWMsR0FBRztJQUU3QixPQUFPO0lBRVAsS0FBSztJQUNMLFFBQVE7Q0FFUixDQUFDO0FBRVcsUUFBQSxhQUFhLEdBQUc7SUFFNUIsT0FBTztJQUVQLE9BQU87SUFDUCxnQkFBZ0I7SUFDaEIsVUFBVTtJQUVWLE1BQU07SUFDTixTQUFTO0lBRVQsT0FBTztDQUVQLENBQUM7QUFFVyxRQUFBLGlCQUFpQixHQUFHO0lBQ2hDLFNBQVM7SUFDVCxZQUFZO0lBQ1osV0FBVztJQUNYLGNBQWM7SUFFZCxVQUFVO0lBQ1YsYUFBYTtDQUNiLENBQUM7QUFFVyxRQUFBLGNBQWMsR0FBRztJQUM3QixRQUFRO0lBQ1IsT0FBTztJQUNQLE9BQU87SUFDUCxNQUFNO0lBRU4sV0FBVztDQUNYLENBQUM7QUFFVyxRQUFBLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFjLEVBQUUsc0JBQWMsRUFBRSx5QkFBaUIsRUFBRSxxQkFBYSxFQUFFLHNCQUFjLENBQUMsQ0FBQztBQUVuSCxTQUFnQixZQUFZLENBQWMsU0FBa0IsT0FBTyxFQUFFLEVBQUUsR0FBRyxlQUFPLEVBQUUsRUFBRSxHQUFHLElBQUk7SUFFM0YsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLE1BQU07UUFFMUIsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxFQUN2QjtZQUNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDdEI7SUFDRixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFBO0FBQ2QsQ0FBQztBQVhELG9DQVdDO0FBRUQsa0JBQWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOC82LzI5LzAyOS5cbiAqL1xuaW1wb3J0IENvbnNvbGUgPSByZXF1aXJlKCdjb25zb2xlJyk7XG5cbmNvbnN0IG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcbmV4cG9ydCBjb25zdCBtZXRob2RzX3N0ZG91dCA9IFtcblxuXHRcImRlYnVnXCIsXG5cblx0XCJpbmZvXCIsXG5cdFwibG9nXCIsXG5cbl07XG5cbmV4cG9ydCBjb25zdCBtZXRob2RzX291dHB1dCA9IFtcblxuXHRcInRhYmxlXCIsXG5cblx0XCJkaXJcIixcblx0XCJkaXJ4bWxcIixcblxuXTtcblxuZXhwb3J0IGNvbnN0IG1ldGhvZHNfb3RoZXIgPSBbXG5cblx0XCJjbGVhclwiLFxuXG5cdFwiZ3JvdXBcIixcblx0XCJncm91cENvbGxhcHNlZFwiLFxuXHRcImdyb3VwRW5kXCIsXG5cblx0XCJ0aW1lXCIsXG5cdFwidGltZUVuZFwiLFxuXG5cdFwiY291bnRcIixcblxuXTtcblxuZXhwb3J0IGNvbnN0IG1ldGhvZHNfaW5zcGVjdG9yID0gW1xuXHRcInByb2ZpbGVcIixcblx0XCJwcm9maWxlRW5kXCIsXG5cdFwidGltZVN0YW1wXCIsXG5cdFwibWFya1RpbWVsaW5lXCIsXG5cblx0XCJ0aW1lbGluZVwiLFxuXHRcInRpbWVsaW5lRW5kXCIsXG5dO1xuXG5leHBvcnQgY29uc3QgbWV0aG9kc19zdGRlcnIgPSBbXG5cdFwiYXNzZXJ0XCIsXG5cdFwiZXJyb3JcIixcblx0XCJ0cmFjZVwiLFxuXHRcIndhcm5cIixcblxuXHRcImV4Y2VwdGlvblwiLFxuXTtcblxuZXhwb3J0IGNvbnN0IG1ldGhvZHMgPSBbXS5jb25jYXQobWV0aG9kc19zdGRvdXQsIG1ldGhvZHNfc3RkZXJyLCBtZXRob2RzX2luc3BlY3RvciwgbWV0aG9kc19vdGhlciwgbWV0aG9kc19vdXRwdXQpO1xuXG5leHBvcnQgZnVuY3Rpb24gZmlsbFByb3BlcnR5PFQgPSBDb25zb2xlPih0YXJnZXQ6IENvbnNvbGUgPSBjb25zb2xlLCBscyA9IG1ldGhvZHMsIGZuID0gbm9vcClcbntcblx0bHMuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKVxuXHR7XG5cdFx0aWYgKCEobWV0aG9kIGluIHRhcmdldCkpXG5cdFx0e1xuXHRcdFx0dGFyZ2V0W21ldGhvZF0gPSBub29wO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIHRhcmdldFxufVxuXG5leHBvcnQgZGVmYXVsdCBmaWxsUHJvcGVydHk7XG4iXX0=