/**
 * Console2 核心模組
 * Console2 core module
 *
 * 彩色化 Console 輸出的主要類別實現
 * Main class implementation for colorized console output
 *
 * @module debug-color2/lib/node
 * @created 2018/7/2
 */
import { Console } from 'console';
import { IChalkOptions } from './styles';
import { SYM_CHALK, SYM_CONSOLE, SYM_DATA } from './val';
import { IChalk, IOptions, IStyles, IConsoleWithStream, InspectOptions, ILevel, IWriteStream } from './types';
import { ICrossConsole } from './types/CrossConsole';
export * from './types';
/**
 * Console2 介面 - 擴展原生 Console 並包含 Chalk 樣式
 * Console2 interface - extends native Console with Chalk styles
 *
 * @interface Console2
 */
export interface Console2 extends IConsoleWithStream<Console>, IStyles, ICrossConsole {
    /** 可呼叫的函式 / Callable function */
    (...argv: any[]): void;
    /** 儲存原始 Console 實例的 Symbol / Symbol storing original Console instance */
    [SYM_CONSOLE]: IConsoleWithStream<Console> | Console2;
    /** 儲存 Chalk 實例的 Symbol / Symbol storing Chalk instance */
    [SYM_CHALK]: IChalk;
    /** 儲存選項資料的 Symbol / Symbol storing options data */
    [SYM_DATA]: IOptions;
    /**
     * 簡單的斷言測試，驗證值是否為真
     * A simple assertion test that verifies whether `value` is truthy.
     * If it is not, an `AssertionError` is thrown.
     * If provided, the error `message` is formatted using `util.format()` and used as the error message.
     */
    assert(value: any, message?: string, ...optionalParams: any[]): void;
    /**
     * 當 stdout 是 TTY 時，清除 TTY
     * When `stdout` is a TTY, calling `console.clear()` will attempt to clear the TTY.
     * When `stdout` is not a TTY, this method does nothing.
     */
    clear(): void;
    /**
     * 維護內部計數器並輸出呼叫次數
     * Maintains an internal counter specific to `label` and outputs to `stdout` the number of times `console.count()` has been called with the given `label`.
     */
    count(label?: string): void;
    /**
     * 重置內部計數器
     * Resets the internal counter specific to `label`.
     */
    countReset(label?: string): void;
    /**
     * debug 是 log 的別名
     * The `console.debug()` function is an alias for {@link console.log()}.
     */
    debug(message?: any, ...optionalParams: any[]): void;
    /**
     * 使用 util.inspect() 格式化並輸出物件
     * Uses {@link util.inspect()} on `obj` and prints the resulting string to `stdout`.
     * This function bypasses any custom `inspect()` function defined on `obj`.
     */
    dir(obj: any, options?: InspectOptions): void;
    /**
     * 輸出 XML 格式化（此方法不會產生任何 XML）
     * This method calls {@link console.log()} passing it the arguments received. Please note that this method does not produce any XML formatting
     */
    dirxml(...data: any[]): void;
    /**
     * 輸出到 stderr 並換行
     * Prints to `stderr` with newline.
     */
    error(message?: any, ...optionalParams: any[]): void;
    /**
     * 增加後續行縮排
     * Increases indentation of subsequent lines by two spaces.
     * If one or more `label`s are provided, those are printed first without the additional indentation.
     */
    group(...label: any[]): void;
    /**
     * group 的別名
     * The `console.groupCollapsed()` function is an alias for {@link console.group()}.
     */
    groupCollapsed(): void;
    /**
     * 減少縮排
     * Decreases indentation of subsequent lines by two spaces.
     */
    groupEnd(): void;
    /**
     * info 是 log 的別名
     * The {@link console.info()} function is an alias for {@link console.log()}.
     */
    info(message?: any, ...optionalParams: any[]): void;
    /**
     * 輸出到 stdout 並換行
     * Prints to `stdout` with newline.
     */
    log(message?: any, ...optionalParams: any[]): void;
    /**
     * 將陣列格式化為表格輸出
     * This method does not display anything unless used in the inspector.
     *  Prints to `stdout` the array `array` formatted as a table.
     */
    table(tabularData: any, properties?: string[]): void;
    /**
     * 啟動計時器
     * Starts a timer that can be used to compute the duration of an operation. Timers are identified by a unique `label`.
     */
    time(label?: string): void;
    /**
     * 停止計時器並輸出結果
     * Stops a timer that was previously started by calling {@link console.time()} and prints the result to `stdout`.
     */
    timeEnd(label?: string): void;
    /**
     * 輸出堆疊追蹤
     * Prints to `stderr` the string 'Trace :', followed by the {@link util.format()} formatted message and stack trace to the current position in the code.
     */
    trace(message?: any, ...optionalParams: any[]): void;
    /**
     * warn 是 error 的別名
     * The {@link console.warn()} function is an alias for {@link console.error()}.
     */
    warn(message?: any, ...optionalParams: any[]): void;
    /**
     * 啟動 CPU 效能分析
     * This method does not display anything unless used in the inspector.
     *  Starts a JavaScript CPU profile with an optional label.
     */
    profile(label?: string): void;
    /**
     * 停止 CPU 效能分析
     * This method does not display anything unless used in the inspector.
     *  Stops the current JavaScript CPU profiling session if one has been started and prints the report to the Profiles panel of the inspector.
     */
    profileEnd(): void;
    /**
     * 在時間軸新增事件
     * This method does not display anything unless used in the inspector.
     *  Adds an event with the label `label` to the Timeline panel of the inspector.
     */
    timeStamp(label?: string): void;
}
/**
 * Console2 類別 - 彩色化 Console 輸出
 * Console2 class - Colorized console output
 *
 * @class Console2
 */
export declare class Console2 {
    /**
     * 建構函式
     * Constructor
     *
     * @param target - 目標 Console 實例，預設為全域 console / Target Console instance, defaults to global console
     * @param options - 選項設定 / Options configuration
     */
    constructor(target?: Console2 | IConsoleWithStream<Console>, options?: IOptions);
    /**
     * 取得 stdout 串流
     * Get stdout stream
     */
    get _stdout(): IWriteStream;
    /**
     * 取得 stderr 串流
     * Get stderr stream
     */
    get _stderr(): IWriteStream;
    /**
     * 取得串流資訊
     * Get stream information
     * @returns 包含 stdout 和 stderr 的物件 / Object containing stdout and stderr
     */
    getStream(): {
        _stdout: IWriteStream;
        _stderr: IWriteStream;
    };
    /**
     * 取得 Chalk 實例
     * Get Chalk instance
     */
    get chalk(): IChalk;
    /**
     * 設定 Chalk 實例
     * Set Chalk instance
     */
    set chalk(value: IChalk);
    /**
     * 取得目前色彩等級
     * Get current color level
     */
    get levelColor(): ILevel;
    /**
     * 設定色彩等級
     * Set color level
     */
    set levelColor(value: ILevel);
    /**
     * 取得色彩啟用狀態
     * Get color enabled status
     */
    get enabledColor(): boolean;
    /**
     * 設定色彩啟用狀態
     * Set color enabled status
     */
    set enabledColor(value: boolean);
    /**
     * 取得 Chalk 選項
     * Get Chalk options
     */
    get chalkOptions(): IChalkOptions;
    /**
     * 設定 Chalk 選項
     * Set Chalk options
     */
    set chalkOptions(value: IChalkOptions);
    /**
     * 取得檢視選項
     * Get inspect options
     */
    get inspectOptions(): InspectOptions;
    /**
     * 設定檢視選項
     * Set inspect options
     */
    set inspectOptions(value: InspectOptions);
    /**
     * 設定檢視選項
     * Set inspect options
     *
     * @param value - 檢視選項物件 / Inspect options object
     */
    setInspectOptions(value: InspectOptions): void;
    /**
     * 取得 debug 啟用狀態
     * Get debug enabled status
     */
    get enabled(): boolean;
    /**
     * 設定 debug 啟用狀態
     * Set debug enabled status
     *
     * @param value - 啟用狀態 / Enabled status
     */
    set enabled(value: boolean);
    /**
     * 設定選項
     * Set options
     *
     * @param options - 選項物件 / Options object
     * @returns this 實例 / this instance
     */
    setOptions(options: IOptions): this;
    /**
     * 建立具有新選項的複製品
     * Create a copy with new options
     *
     * @param options - 新選項物件 / New options object
     * @returns 新的 Console2 實例 / New Console2 instance
     */
    withOptions(options: IOptions): this;
    /**
     * 建立 Console2 的淺層複製品
     * Create a shallow copy of Console2
     *
     * @returns 新的 Console2 實例 / New Console2 instance
     */
    protected _clone(): this;
    /**
     * 取得指定名稱的 Chalk 樣式屬性
     * Get Chalk style property by name
     *
     * @param name - Chalk 樣式名稱 / Chalk style name
     * @returns 新的 Console2 實例 / New Console2 instance
     */
    protected _chalkStyleProp(name: any): this;
    /**
     * 格式化日誌訊息
     * Format log message
     *
     * @param format - 格式化字串 / Format string
     * @param args - 格式化參數 / Format arguments
     * @returns 格式化後的字串 / Formatted string
     */
    protected _logFormat(format: any, ...args: any[]): string;
    /**
     * 輸出成功訊息（綠色）
     * Output success message (green)
     *
     * @param argv - 訊息參數 / Message arguments
     */
    success(...argv: any[]): any;
    /**
     * 輸出確定訊息（淺綠色）
     * Output OK message (light green)
     *
     * @param argv - 訊息參數 / Message arguments
     */
    ok(...argv: any[]): any;
    /**
     * 輸出失敗訊息（紅色）
     * Output fail message (red)
     *
     * @param argv - 訊息參數 / Message arguments
     */
    fail(...argv: any[]): any;
    /**
     * 格式化標籤
     * Format label
     *
     * @param data - 標籤資料 / Label data
     * @returns 格式化後的標籤 / Formatted label
     */
    protected _labelFormat(data: Parameters<IOptions["labelFormatFn"]>[0]): string;
    /**
     * 格式化錯誤參數
     * Format error arguments
     *
     * @param argv - 參數陣列 / Arguments array
     * @param name - 方法名稱 / Method name
     * @param failBack - 備用方法名稱 / Fallback method name
     * @returns 處理後的參數 / Processed arguments
     */
    protected _logErrorArgv(argv: any[], name?: string, failBack?: string): {
        name: string;
        arr: any[];
    };
    /**
     * 格式化日誌參數
     * Format log arguments
     *
     * @param argv - 參數陣列 / Arguments array
     * @param name - 方法名稱 / Method name
     * @param failBack - 備用方法名稱 / Fallback method name
     * @returns 處理後的參數 / Processed arguments
     */
    protected _logArgv(argv: any[], name?: string, failBack?: string): {
        name: string;
        arr: any[];
    };
    /**
     * 執行日誌輸出
     * Execute log output
     *
     * @param name - 日誌類型名稱 / Log type name
     * @param argv - 參數陣列 / Arguments array
     * @param failBack - 備用方法名稱 / Fallback method name
     * @returns 日誌輸出結果 / Log output result
     */
    protected _log(name: string, argv: any[], failBack?: string): any;
    /**
     * 執行錯誤日誌輸出
     * Execute error log output
     *
     * @param name - 日誌類型名稱 / Log type name
     * @param argv - 參數陣列 / Arguments array
     * @param failBack - 備用方法名稱 / Fallback method name
     * @returns 錯誤日誌輸出結果 / Error log output result
     */
    protected _logError(name: string, argv: any, failBack?: string): any;
    /**
     * 建立 Chalk 樣式方法
     * Create Chalk style method
     *
     * @param name - Chalk 樣式名稱 / Chalk style name
     * @returns 包裝後的函式 / Wrapped function
     */
    protected _chalkStyleMethod(name: any): (this: Console2, ...argv: any[]) => Console2;
    /**
     * 格式化時間標籤
     * Format time label
     *
     * @param data - 時間資料 / Time data
     * @returns 格式化後的時間標籤 / Formatted time label
     */
    protected _time(data?: Parameters<IOptions["labelFormatFn"]>[0]): string;
}
export default Console2;
