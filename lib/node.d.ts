/**
 * Created by user on 2018/7/2/002.
 */
/// <reference types="node" />
import { Chalk, Level, ChalkOptions } from 'chalk';
import { IStyles } from './styles';
import { IOptions, SYM_CHALK, SYM_CONSOLE, SYM_DATA, InspectOptions } from './val';
import WriteStream = NodeJS.WriteStream;
export declare type IConsoleWithStream<T extends object = Console> = T & {
    _stdout?: WriteStream;
    _stderr?: WriteStream;
};
export { InspectOptions };
export interface Console2 extends IConsoleWithStream<Console>, IStyles {
    (...argv: any[]): void;
    [SYM_CONSOLE]: IConsoleWithStream<Console> | Console2;
    [SYM_CHALK]: Chalk;
    [SYM_DATA]: IOptions;
    /**
     * A simple assertion test that verifies whether `value` is truthy.
     * If it is not, an `AssertionError` is thrown.
     * If provided, the error `message` is formatted using `util.format()` and used as the error message.
     */
    assert(value: any, message?: string, ...optionalParams: any[]): void;
    /**
     * When `stdout` is a TTY, calling `console.clear()` will attempt to clear the TTY.
     * When `stdout` is not a TTY, this method does nothing.
     */
    clear(): void;
    /**
     * Maintains an internal counter specific to `label` and outputs to `stdout` the number of times `console.count()` has been called with the given `label`.
     */
    count(label?: string): void;
    /**
     * Resets the internal counter specific to `label`.
     */
    countReset(label?: string): void;
    /**
     * The `console.debug()` function is an alias for {@link console.log()}.
     */
    debug(message?: any, ...optionalParams: any[]): void;
    /**
     * Uses {@link util.inspect()} on `obj` and prints the resulting string to `stdout`.
     * This function bypasses any custom `inspect()` function defined on `obj`.
     */
    dir(obj: any, options?: NodeJS.InspectOptions): void;
    /**
     * This method calls {@link console.log()} passing it the arguments received. Please note that this method does not produce any XML formatting
     */
    dirxml(...data: any[]): void;
    /**
     * Prints to `stderr` with newline.
     */
    error(message?: any, ...optionalParams: any[]): void;
    /**
     * Increases indentation of subsequent lines by two spaces.
     * If one or more `label`s are provided, those are printed first without the additional indentation.
     */
    group(...label: any[]): void;
    /**
     * The `console.groupCollapsed()` function is an alias for {@link console.group()}.
     */
    groupCollapsed(): void;
    /**
     * Decreases indentation of subsequent lines by two spaces.
     */
    groupEnd(): void;
    /**
     * The {@link console.info()} function is an alias for {@link console.log()}.
     */
    info(message?: any, ...optionalParams: any[]): void;
    /**
     * Prints to `stdout` with newline.
     */
    log(message?: any, ...optionalParams: any[]): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  Prints to `stdout` the array `array` formatted as a table.
     */
    table(tabularData: any, properties?: string[]): void;
    /**
     * Starts a timer that can be used to compute the duration of an operation. Timers are identified by a unique `label`.
     */
    time(label?: string): void;
    /**
     * Stops a timer that was previously started by calling {@link console.time()} and prints the result to `stdout`.
     */
    timeEnd(label?: string): void;
    /**
     * Prints to `stderr` the string 'Trace :', followed by the {@link util.format()} formatted message and stack trace to the current position in the code.
     */
    trace(message?: any, ...optionalParams: any[]): void;
    /**
     * The {@link console.warn()} function is an alias for {@link console.error()}.
     */
    warn(message?: any, ...optionalParams: any[]): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  Starts a JavaScript CPU profile with an optional label.
     */
    profile(label?: string): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  Stops the current JavaScript CPU profiling session if one has been started and prints the report to the Profiles panel of the inspector.
     */
    profileEnd(): void;
    /**
     * This method does not display anything unless used in the inspector.
     *  Adds an event with the label `label` to the Timeline panel of the inspector.
     */
    timeStamp(label?: string): void;
}
export declare class Console2 {
    constructor(target?: Console2 | IConsoleWithStream<Console>, options?: IOptions);
    get _stdout(): WriteStream;
    get _stderr(): WriteStream;
    getStream(): {
        _stdout: WriteStream;
        _stderr: WriteStream;
    };
    get chalk(): Chalk;
    set chalk(value: Chalk);
    get levelColor(): Level;
    set levelColor(value: Level);
    get enabledColor(): boolean;
    set enabledColor(value: boolean);
    get chalkOptions(): ChalkOptions;
    set chalkOptions(value: ChalkOptions);
    get inspectOptions(): InspectOptions;
    set inspectOptions(value: InspectOptions);
    setInspectOptions(value: InspectOptions): void;
    get enabled(): boolean;
    set enabled(value: boolean);
    setOptions(options: IOptions): this;
    withOptions(options: IOptions): this;
    protected _clone(): this;
    protected _chalkStyleProp(name: any): this;
    protected _logFormat(format: any, ...args: any[]): string;
    success(...argv: any[]): any;
    ok(...argv: any[]): any;
    fail(...argv: any[]): any;
    protected _labelFormat(data: Parameters<IOptions["labelFormatFn"]>[0]): string;
    protected _log(name: string, argv: any, failBack?: string): any;
    protected _chalkStyleMethod(name: any): (this: Console2, ...argv: any[]) => Console2;
    protected _time(data?: Parameters<IOptions["labelFormatFn"]>[0]): string;
}
export default Console2;
