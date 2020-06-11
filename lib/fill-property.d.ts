declare function noop(...argv: any[]): void;
export declare const methods_stdout: readonly ["debug", "info", "log"];
export declare const methods_output: readonly ["table", "dir", "dirxml"];
export declare const methods_other: readonly ["clear", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "count"];
export declare const methods_inspector: readonly ["profile", "profileEnd", "timeStamp", "markTimeline", "timeline", "timelineEnd"];
export declare const methods_stderr: readonly ["assert", "error", "trace", "warn", "exception"];
export declare const methods: ("assert" | "clear" | "count" | "debug" | "dir" | "dirxml" | "error" | "group" | "groupCollapsed" | "groupEnd" | "info" | "log" | "table" | "time" | "timeEnd" | "trace" | "warn" | "profile" | "profileEnd" | "timeStamp" | "exception" | "markTimeline" | "timeline" | "timelineEnd")[];
export declare function fillProperty<T = Console>(target?: Console, ls?: ("assert" | "clear" | "count" | "debug" | "dir" | "dirxml" | "error" | "group" | "groupCollapsed" | "groupEnd" | "info" | "log" | "table" | "time" | "timeEnd" | "trace" | "warn" | "profile" | "profileEnd" | "timeStamp" | "exception" | "markTimeline" | "timeline" | "timelineEnd")[], fn?: typeof noop): Console;
export default fillProperty;
