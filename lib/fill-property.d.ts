declare function noop(...argv: any[]): void;
export declare const methods_stdout: readonly ["debug", "info", "log"];
export declare const methods_output: readonly ["table", "dir", "dirxml"];
export declare const methods_other: readonly ["clear", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "count"];
export declare const methods_inspector: readonly ["profile", "profileEnd", "timeStamp", "markTimeline", "timeline", "timelineEnd"];
export declare const methods_stderr: readonly ["assert", "error", "trace", "warn", "exception"];
export declare const methods: ("debug" | "info" | "log" | "table" | "dir" | "dirxml" | "clear" | "group" | "groupCollapsed" | "groupEnd" | "time" | "timeEnd" | "count" | "profile" | "profileEnd" | "timeStamp" | "markTimeline" | "timeline" | "timelineEnd" | "assert" | "error" | "trace" | "warn" | "exception")[];
export declare function fillProperty<T = Console>(target?: Console, ls?: ("debug" | "info" | "log" | "table" | "dir" | "dirxml" | "clear" | "group" | "groupCollapsed" | "groupEnd" | "time" | "timeEnd" | "count" | "profile" | "profileEnd" | "timeStamp" | "markTimeline" | "timeline" | "timelineEnd" | "assert" | "error" | "trace" | "warn" | "exception")[], fn?: typeof noop): Console;
export default fillProperty;
