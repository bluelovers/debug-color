/**
 * 類型定義模組
 * Type definitions module
 *
 * @module debug-color2/lib/types
 * @created 2020/6/11
 */
import { Chalk, Level, ChalkOptions, Chalk as IChalk, Level as ILevel, ChalkOptions as IChalkOptions } from 'chalk';
import { DateTime } from 'luxon';
import { InspectOptions } from "util";
export type { InspectOptions } from 'util';
/** Chalk 類型 / Chalk type */
export type { Chalk, Level, ChalkOptions };
/** Chalk 介面 / Chalk interface */
export type { IChalk, ILevel, IChalkOptions };
import IWriteStream = NodeJS.WriteStream;
import { ICrossConsole, IMethods } from './types/CrossConsole';
/** 寫入串流介面 / Write stream interface */
export type { IWriteStream };
/**
 * 選項顏色屬性名稱
 * Options color property names
 */
export type IOptionsColorsProp = 'debug' | 'error' | 'info' | 'log' | 'trace' | 'warn' | 'success' | 'ok' | 'exception' | 'fail';
/**
 * 樣式函數名稱
 * Style function names
 */
export type IStylesFnNames = 'rgb' | 'hsl' | 'hsv' | 'hwb' | 'bgHex' | 'bgKeyword' | 'bgRgb' | 'bgHsl' | 'bgHsv' | 'bgHwb' | 'hex' | 'keyword';
/**
 * 樣式顏色名稱（排除函數名稱）
 * Style color names (excluding function names)
 */
export type IStylesColorNames = Exclude<keyof IStyles, IStylesFnNames>;
/**
 * 樣式介面 - 定義所有可用的 Chalk 樣式方法
 * Styles interface - defines all available Chalk style methods
 *
 * @interface IStyles
 */
export interface IStyles {
    /** RGB 顏色 / RGB color */
    rgb(r: number, g: number, b: number): this;
    /** HSL 顏色 / HSL color */
    hsl(h: number, s: number, l: number): this;
    /** HSV 顏色 / HSV color */
    hsv(h: number, s: number, v: number): this;
    /** HWB 顏色 / HWB color */
    hwb(h: number, w: number, b: number): this;
    /** 背景 HEX 顏色 / Background HEX color */
    bgHex(color: string): this;
    /** 背景關鍵字顏色 / Background keyword color */
    bgKeyword(color: string): this;
    /** 背景 RGB 顏色 / Background RGB color */
    bgRgb(r: number, g: number, b: number): this;
    /** 背景 HSL 顏色 / Background HSL color */
    bgHsl(h: number, s: number, l: number): this;
    /** 背景 HSV 顏色 / Background HSV color */
    bgHsv(h: number, s: number, v: number): this;
    /** 背景 HWB 顏色 / Background HWB color */
    bgHwb(h: number, w: number, b: number): this;
    /** HEX 顏色 / HEX color */
    hex(color: string): this;
    /** 關鍵字顏色 / Keyword color */
    keyword(color: string): this;
    /** 重置樣式 / Reset style */
    readonly reset: this;
    /** 粗體 / Bold */
    readonly bold: this;
    /** 模糊 / Dim */
    readonly dim: this;
    /** 斜體 / Italic */
    readonly italic: this;
    /** 底線 / Underline */
    readonly underline: this;
    /** 反轉 / Inverse */
    readonly inverse: this;
    /** 隱藏 / Hidden */
    readonly hidden: this;
    /** 刪除線 / Strikethrough */
    readonly strikethrough: this;
    /** 可見 / Visible */
    readonly visible: this;
    /** 黑色 / Black */
    readonly black: this;
    /** 紅色 / Red */
    readonly red: this;
    /** 綠色 / Green */
    readonly green: this;
    /** 黃色 / Yellow */
    readonly yellow: this;
    /** 藍色 / Blue */
    readonly blue: this;
    /** 洋紅色 / Magenta */
    readonly magenta: this;
    /** 青色 / Cyan */
    readonly cyan: this;
    /** 白色 / White */
    readonly white: this;
    /** 灰色 / Gray */
    readonly gray: this;
    /** 灰色（英式）/ Grey */
    readonly grey: this;
    /** 亮黑色 / Bright black */
    readonly blackBright: this;
    /** 亮紅色 / Bright red */
    readonly redBright: this;
    /** 亮綠色 / Bright green */
    readonly greenBright: this;
    /** 亮黃色 / Bright yellow */
    readonly yellowBright: this;
    /** 亮藍色 / Bright blue */
    readonly blueBright: this;
    /** 亮洋紅色 / Bright magenta */
    readonly magentaBright: this;
    /** 亮青色 / Bright cyan */
    readonly cyanBright: this;
    /** 亮白色 / Bright white */
    readonly whiteBright: this;
    /** 背景黑色 / Background black */
    readonly bgBlack: this;
    /** 背景紅色 / Background red */
    readonly bgRed: this;
    /** 背景綠色 / Background green */
    readonly bgGreen: this;
    /** 背景黃色 / Background yellow */
    readonly bgYellow: this;
    /** 背景藍色 / Background blue */
    readonly bgBlue: this;
    /** 背景洋紅色 / Background magenta */
    readonly bgMagenta: this;
    /** 背景青色 / Background cyan */
    readonly bgCyan: this;
    /** 背景白色 / Background white */
    readonly bgWhite: this;
    /** 背景亮黑色 / Background bright black */
    readonly bgBlackBright: this;
    /** 背景亮紅色 / Background bright red */
    readonly bgRedBright: this;
    /** 背景亮綠色 / Background bright green */
    readonly bgGreenBright: this;
    /** 背景亮黃色 / Background bright yellow */
    readonly bgYellowBright: this;
    /** 背景亮藍色 / Background bright blue */
    readonly bgBlueBright: this;
    /** 背景亮洋紅色 / Background bright magenta */
    readonly bgMagentaBright: this;
    /** 背景亮青色 / Background bright cyan */
    readonly bgCyanBright: this;
    /** 背景亮白色 / Background bright white */
    readonly bgWhiteBright: this;
}
/**
 * 選項介面 - Console2 的配置選項
 * Options interface - Console2 configuration options
 *
 * 用於配置 Console2 實例的各種選項
 * Used to configure various options for Console2 instance
 *
 * @interface IOptions
 *
 * @example
 * // 基本用法：創建啟用所有功能的 Console2 實例
 * // Basic usage: create Console2 instance with all features enabled
 * import { Console2 } from 'debug-color2';
 *
 * const console2 = new Console2(console, {
 *   enabled: true,      // 啟用日誌輸出 / Enable log output
 *   label: true,        // 顯示標籤（如 [LOG], [ERROR]）/ Show labels (like [LOG], [ERROR])
 *   time: true,         // 顯示時間戳 / Show timestamp
 *   timeFormat: '[HH:mm:ss.SSS]',  // 時間格式 / Time format
 * });
 *
 * @example
 * // 自定義顏色和標籤
 * // Custom colors and labels
 * const console2 = new Console2(console, {
 *   enabled: true,
 *   label: ['log', 'error', 'warn'],  // 只為這些方法顯示標籤 / Only show labels for these methods
 *   colors: {
 *     log: 'cyan',       // log 方法使用青色 / log uses cyan
 *     error: 'red',      // error 方法使用紅色 / error uses red
 *     warn: 'yellow',    // warn 方法使用黃色 / warn uses yellow
 *     success: 'green',  // success 方法使用綠色 / success uses green
 *   },
 * });
 *
 * @example
 * // 自定義時間和標籤格式化函數
 * // Custom time and label formatting functions
 * import { DateTime } from 'luxon';
 *
 * const console2 = new Console2(console, {
 *   time: true,
 *   timeFormatFn: (data) => {
 *     // 自定義時間格式 / Custom time format
 *     return `[${data.date.toFormat('yyyy-MM-dd HH:mm:ss')}]`;
 *   },
 *   labelFormatFn: (data) => {
 *     // 自定義標籤格式 / Custom label format
 *     return `[${data.name.toUpperCase()}]`;
 *   },
 * });
 */
export interface IOptions {
    /**
     * 啟用或停用日誌顯示
     * Enable or disable log display
     *
     * 當設為 false 時，所有日誌輸出都會被忽略
     * When set to false, all log output will be ignored
     *
     * @default true
     *
     * @example
     * // 啟用日誌（預設）
     * // Enable logs (default)
     * const console2 = new Console2(console, { enabled: true });
     * console2.log('This will be shown');  // ✓ 輸出 / Output
     *
     * @example
     * // 停用日誌
     * // Disable logs
     * const console2 = new Console2(console, { enabled: false });
     * console2.log('This will NOT be shown');  // ✗ 不輸出 / Not output
     */
    enabled?: boolean;
    /**
     * 顯示標籤字串
     * Show label string
     *
     * 可設為 true（所有方法）、false（不顯示）、或字串陣列（指定方法）
     * Can be set to true (all methods), false (not show), or string array (specified methods)
     *
     * @default false
     *
     * @example
     * // 為所有方法顯示標籤
     * // Show labels for all methods
     * const console2 = new Console2(console, { label: true });
     * console2.log('Hello');   // [LOG] Hello
     * console2.error('Error'); // [ERROR] Error
     *
     * @example
     * // 只為特定方法顯示標籤
     * // Show labels only for specific methods
     * const console2 = new Console2(console, { label: ['log', 'error'] });
     * console2.log('Hello');    // [LOG] Hello
     * console2.error('Error'); // [ERROR] Error
     * console2.warn('Warning'); // Warning (no label)
     *
     * @example
     * // 不顯示標籤
     * // Don't show labels
     * const console2 = new Console2(console, { label: false });
     * console2.log('Hello');  // Hello (no label)
     */
    label?: boolean | string[];
    /**
     * 顯示時間標籤
     * Show time label
     *
     * 是否在輸出前方顯示時間戳
     * Whether to display timestamp before output
     *
     * @default false
     *
     * @example
     * // 啟用時間戳
     * // Enable timestamp
     * const console2 = new Console2(console, { time: true });
     * console2.log('Hello');  // [14:30:25.123] Hello
     *
     * @example
     * // 停用時間戳（預設）
     * // Disable timestamp (default)
     * const console2 = new Console2(console, { time: false });
     * console2.log('Hello');  // Hello
     */
    time?: boolean;
    /**
     * 允許自定義時間格式
     * Allow custom time format
     *
     * 使用 Luxon 的時間格式語法
     * Uses Luxon's time format syntax
     *
     * @default '[HH:mm:ss.SSS]'
     *
     * @example
     * // 簡單格式
     * // Simple format
     * const console2 = new Console2(console, { time: true, timeFormat: '[HH:mm:ss]' });
     * console2.log('Test');  // [14:30:25] Test
     *
     * @example
     * // 完整日期時間格式
     * // Full datetime format
     * const console2 = new Console2(console, { time: true, timeFormat: '[yyyy-MM-dd HH:mm:ss]' });
     * console2.log('Test');  // [2024-01-15 14:30:25] Test
     *
     * @example
     * // 只顯示時分
     * // Show only hour and minute
     * const console2 = new Console2(console, { time: true, timeFormat: '[HH:mm]' });
     * console2.log('Test');  // [14:30] Test
     *
     * @see https://moment.github.io/luxon/#/formatting?id=table-of-tokens Luxon 格式語法 / Luxon format syntax
     */
    timeFormat?: string;
    /**
     * 自定義時間格式函數
     * Custom time format function
 *
     * 允許完全自定義時間戳的生成邏輯
     * Allows completely custom timestamp generation logic
     *
     * @param data - 包含 DateTime 和 failBackTimeFormat 的物件 / Object containing DateTime and failBackTimeFormat
     * @returns 格式化後的字串 / Formatted string
     *
     * @example
     * // 使用自定義函數
     * // Use custom function
     * import { DateTime } from 'luxon';
     *
     * const console2 = new Console2(console, {
     *   time: true,
     *   timeFormatFn: (data) => {
     *     // data.date = DateTime 實例 / DateTime instance
     *     // data.failBackTimeFormat = 預設格式字串 / Default format string
     *     // data.name = 方法名稱 / Method name
     *     return `[${data.date.toFormat('yyyy-MM-dd')}]`;
     *   },
     * });
     * console2.log('Test');  // [2024-01-15] Test
     *
     * @example
     * // 根據方法名稱動態生成時間格式
     * // Dynamically generate time format based on method name
     * const console2 = new Console2(console, {
     *   time: true,
     *   timeFormatFn: (data) => {
     *     if (data.name === 'error') {
     *       return `[${data.date.toFormat('yyyy-MM-dd HH:mm:ss.SSS')}]`;
     *     }
     *     return `[${data.date.toFormat('HH:mm:ss')}]`;
     *   },
     * });
     */
    timeFormatFn?<T extends unknown[]>(data: Parameters<IOptions["labelFormatFn"]>[0] & {
        failBackTimeFormat: string;
        date: DateTime;
    }): string;
    /**
     * 允許自定義標籤格式
     * Allow custom label format
     *
     * 允許完全自定義標籤的生成邏輯
     * Allows completely custom label generation logic
     *
     * @param data - 標籤格式資料 / Label format data
     * @returns 格式化後的標籤字串 / Formatted label string
     *
     * @example
     * // 自定義標籤格式函數
     * // Custom label format function
     * const console2 = new Console2(console, {
     *   label: true,
     *   labelFormatFn: (data) => {
     *     // data.name = 方法名稱（如 'log', 'error'）/ Method name (like 'log', 'error')
     *     // data.argv = 傳入的參數陣列 / Passed argument array
     *     // data.failBack = 備用方法名稱 / Fallback method name
     *     return `[${data.name.toUpperCase()}]`;
     *   },
     * });
     * console2.log('Hello');  // [LOG] Hello
     * console2.error('Error');  // [ERROR] Error
     *
     * @example
     * // 根據參數動態生成標籤
     * // Dynamically generate label based on arguments
     * const console2 = new Console2(console, {
     *   label: true,
     *   labelFormatFn: (data) => {
     *     if (data.argv && data.argv.length > 0 && typeof data.argv[0] === 'string') {
     *       return `[${data.argv[0].toUpperCase()}]`;
     *     }
     *     return `[${data.name.toUpperCase()}]`;
     *   },
     * });
     */
    labelFormatFn?<T extends unknown[]>(data: {
        name: string;
        argv?: T;
        failBack: string;
    }): string;
    /**
     * 設定預設的 inspectOptions
     * Set default inspectOptions
     *
     * 用於配置 util.inspect 的選項
     * Used to configure util.inspect options
     *
     * @see https://nodejs.org/api/util.html#utilinspectoptions-object
     *
     * @example
     * // 自定義 inspect 選項
     * // Custom inspect options
     * const console2 = new Console2(console, {
     *   inspectOptions: {
     *     colors: true,        // 启用颜色 / Enable colors
     *     depth: 3,            // 顯示深度 / Display depth
     *     showHidden: true,   // 顯示隱藏屬性 / Show hidden properties
     *     compact: true,      // 緊湊格式 / Compact format
     *   },
     * });
     */
    inspectOptions?: InspectOptions;
    /**
     * Chalk 選項
     * Chalk options
     *
     * 用於配置 Chalk 的選項（如是否啟用顏色）
     * Used to configure Chalk options (like whether to enable colors)
     *
     * @example
     * // 啟用顏色輸出
     * // Enable color output
     * import chalk from 'chalk';
     *
     * const console2 = new Console2(console, {
     *   chalkOptions: {
     *     level: chalk.Level.All,  // 啟用所有顏色 / Enable all colors
     *   },
     * });
     *
     * @example
     * // 停用顏色輸出
     * // Disable color output
     * const console2 = new Console2(console, {
     *   chalkOptions: {
     *     level: 0,  // 停用顏色 / Disable colors
     *   },
     * });
     *
     * @see https://github.com/chalk/chalk#chalksupported-output-levels Chalk 等級說明 / Chalk level description
     */
    chalkOptions?: ChalkOptions;
    /**
     * 設定顏色樣式
     * Set color styles
     *
     * 為不同的日誌方法設定自定義顏色
     * Set custom colors for different log methods
     *
     * @example
     * // 基本用法：使用預設顏色名稱
     * // Basic usage: use default color names
     * const console2 = new Console2(console, {
     *   colors: {
     *     log: 'cyan',      // log 方法使用青色 / log uses cyan
     *     error: 'red',     // error 方法使用紅色 / error uses red
     *     warn: 'yellow',   // warn 方法使用黃色 / warn uses yellow
     *     info: 'blue',     // info 方法使用藍色 / info uses blue
     *     debug: 'gray',    // debug 方法使用灰色 / debug uses gray
     *     success: 'green', // success 方法使用綠色 / success uses green
     *     ok: 'green',      // ok 方法使用綠色 / ok uses green
     *     fail: 'red',      // fail 方法使用紅色 / fail uses red
     *   },
     * });
     *
     * @example
     * // 使用 Chalk 函式（需要參數的樣式）
     * // Use Chalk functions (styles that need parameters)
     * const console2 = new Console2(console, {
     *   colors: {
     *     log: chalk.rgb(0, 255, 0),      // 自定義 RGB 顏色 / Custom RGB color
     *     error: chalk.hex('#FF0000'),    // 自定義 HEX 顏色 / Custom HEX color
     *     warn: chalk.hsl(60, 100, 50),  // 自定義 HSL 顏色 / Custom HSL color
     *   },
     * });
     *
     * @example
     * // 使用組合樣式
     * // Use combined styles
     * const console2 = new Console2(console, {
     *   colors: {
     *     log: chalk.bold.green,  // 粗體 + 綠色 / Bold + green
     *     error: chalk.bold.red.bgWhite,  // 粗體 + 紅色 + 白底 / Bold + red + white background
     *   },
     * });
     *
     * @example
     * // 為自定義方法設定顏色
     * // Set color for custom method
     * const console2 = new Console2(console, {
     *   colors: {
     *     myLog: 'magenta',  // 自定義方法顏色 / Custom method color
     *   },
     * });
     */
    colors?: Record<IOptionsColorsProp | string, Chalk | IChalkLike | IStylesColorNames>;
    /**
     * 檢查是否為 Node.js console
     * Check if is node.js console
     *
     * 設定是否使用 Node.js 的串流輸出
     * Set whether to use Node.js stream output
     *
     * @default true
     *
     * @example
     * // 使用 Node.js 串流（預設）
     * // Use Node.js stream (default)
     * const console2 = new Console2(console, { stream: true });
     * // 輸出到 stdout/stderr / Output to stdout/stderr
     *
     * @example
     * // 停用串流模式
     * // Disable stream mode
     * const console2 = new Console2(console, { stream: false });
     * // 不使用 Node.js 串流 / Don't use Node.js stream
     */
    readonly stream?: boolean;
}
/**
 * 類似 Chalk 的函式介面
 * Chalk-like function interface
 *
 * @interface IChalkLike
 */
export interface IChalkLike {
    /** 單一參數 / Single parameter */
    (string: any): string;
    /** 帶額外參數 / With additional parameters */
    (string: any, ...argv: any[]): string;
    /** 可變參數 / Variadic parameters */
    (...argv: any[]): string;
}
/**
 * 具有串流的 Console 介面
 * Console with stream interface
 *
 * @type IConsoleWithStream
 */
export type IConsoleWithStream<T extends object = Console> = T & {
    /** 標準輸出串流 / Standard output stream */
    _stdout?: IWriteStream;
    /** 標準錯誤串流 / Standard error stream */
    _stderr?: IWriteStream;
};
/**
 * 排除函數名稱的樣式名稱
 * Style names without function names
 *
 * @type IStylesNameWithoutFn
 */
export type IStylesNameWithoutFn = Exclude<keyof IStyles, IStylesFnNames>;
/**
 * 樣式名稱陣列（排除函數）
 * Array of style names (excluding functions)
 *
 * @type IStylesNamesWithoutFn
 */
export type IStylesNamesWithoutFn = IStylesNameWithoutFn[];
/**
 * 填充屬性的類型
 * Fill property type
 *
 * @type IFillProperty
 */
export type IFillProperty<T, P extends string, U> = Record<Exclude<IMethods, keyof T>, U>;
/**
 * 取得陣列元素類型
 * Get array element type
 *
 * @type IValueOfArray
 */
export type IValueOfArray<T extends any[]> = T extends (infer U)[] ? U : never;
/**
 * 自動填充屬性的類型（用於 Console）
 * Auto fill property type (for Console)
 *
 * @type IFillPropertyAuto
 */
export type IFillPropertyAuto<T extends Console> = Pick<ICrossConsole, Exclude<IMethods, keyof T>>;
