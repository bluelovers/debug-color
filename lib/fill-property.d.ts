declare function noop(...argv: any[]): void;
export declare const methods_stdout: readonly ["debug", "info", "log"];
export declare const methods_output: readonly ["table", "dir", "dirxml"];
export declare const methods_other: readonly ["clear", "group", "groupCollapsed", "groupEnd", "time", "timeEnd", "count"];
export declare const methods_inspector: readonly ["profile", "profileEnd", "timeStamp", "markTimeline", "timeline", "timelineEnd"];
export declare const methods_stderr: readonly ["assert", "error", "trace", "warn", "exception"];
export declare const methods: ("debug" | "error" | "info" | "log" | "trace" | "warn" | "exception" | "assert" | "clear" | "count" | "dir" | "dirxml" | "group" | "groupCollapsed" | "groupEnd" | "table" | "time" | "timeEnd" | "profile" | "profileEnd" | "timeStamp" | "markTimeline" | "timeline" | "timelineEnd")[];
export declare function fillProperty<T = Console>(target?: Console, ls?: ("debug" | "error" | "info" | "log" | "trace" | "warn" | "exception" | "assert" | "clear" | "count" | "dir" | "dirxml" | "group" | "groupCollapsed" | "groupEnd" | "table" | "time" | "timeEnd" | "profile" | "profileEnd" | "timeStamp" | "markTimeline" | "timeline" | "timelineEnd")[], fn?: typeof noop): Console;
export default fillProperty;
