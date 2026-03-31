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
export type { Chalk, Level, ChalkOptions }
/** Chalk 介面 / Chalk interface */
export type { IChalk, ILevel, IChalkOptions }

import IWriteStream = NodeJS.WriteStream;
import { methods } from './fill-property';
import { ICrossConsole, IMethods } from './types/CrossConsole';

/** 寫入串流介面 / Write stream interface */
export type { IWriteStream }

/**
 * 選項顏色屬性名稱
 * Options color property names
 */
export type IOptionsColorsProp =
	'debug'
	| 'error'
	| 'info'
	| 'log'
	| 'trace'
	| 'warn'
	| 'success'
	| 'ok'
	| 'exception'
	| 'fail';

/**
 * 樣式函數名稱
 * Style function names
 */
export type IStylesFnNames =
	'rgb'
	| 'hsl'
	| 'hsv'
	| 'hwb'
	| 'bgHex'
	| 'bgKeyword'
	| 'bgRgb'
	| 'bgHsl'
	| 'bgHsv'
	| 'bgHwb'
	| 'hex'
	| 'keyword'
	;

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
export interface IStyles
{
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
 * @interface IOptions
 */
export interface IOptions
{
	/**
	 * 啟用或停用日誌顯示
	 * Enable or disable log display
	 */
	enabled?: boolean,

	/**
	 * 顯示標籤字串
	 * Show label string
	 */
	label?: boolean | string[],

	/**
	 * 顯示時間標籤
	 * Show time label
	 */
	time?: boolean,

	/**
	 * 允許自定義時間格式
	 * Allow custom time format
	 *
	 * @default '[HH:mm:ss.SSS]'
	 */
	timeFormat?: string;

	/**
	 * 自定義時間格式函數
	 * Custom time format function
	 *
	 * @param data - 包含 DateTime 和 failBackTimeFormat 的物件 / Object containing DateTime and failBackTimeFormat
	 * @returns 格式化後的字串 / Formatted string
	 */
	timeFormatFn?<T extends unknown[]>(data: Parameters<IOptions["labelFormatFn"]>[0] & {
		failBackTimeFormat: string
		date: DateTime,
	}): string;

	/**
	 * 允許自定義標籤格式
	 * Allow custom label format
	 *
	 * @default `[${data.name.toString().toUpperCase()}]`
	 */
	labelFormatFn?<T extends unknown[]>(data: {
		name: string,
		argv?: T,
		failBack: string,
	}): string;

	/**
	 * 設定預設的 inspectOptions
	 * Set default inspectOptions
	 */
	inspectOptions?: InspectOptions,

	/** Chalk 選項 / Chalk options */
	chalkOptions?: ChalkOptions,

	/**
	 * 設定顏色樣式
	 * Set color styles
	 */
	colors?: Record<IOptionsColorsProp | string, Chalk | IChalkLike | IStylesColorNames>,

	/**
	 * 檢查是否為 Node.js console
	 * Check if is node.js console
	 */
	readonly stream?: boolean,
}

/**
 * 類似 Chalk 的函式介面
 * Chalk-like function interface
 *
 * @interface IChalkLike
 */
export interface IChalkLike
{
	/** 單一參數 / Single parameter */
	(string): string,

	/** 帶額外參數 / With additional parameters */
	(string, ...argv): string,

	/** 可變參數 / Variadic parameters */
	(...argv): string,
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
}

/**
 * 排除函數名稱的樣式名稱
 * Style names without function names
 *
 * @type IStylesNameWithoutFn
 */
export type IStylesNameWithoutFn = Exclude<keyof IStyles, IStylesFnNames>

/**
 * 樣式名稱陣列（排除函數）
 * Array of style names (excluding functions)
 *
 * @type IStylesNamesWithoutFn
 */
export type IStylesNamesWithoutFn = IStylesNameWithoutFn[]

/**
 * 填充屬性的類型
 * Fill property type
 *
 * @type IFillProperty
 */
export type IFillProperty<T, P extends string, U> = Record<Exclude<IMethods, keyof T>, U>

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
// @ts-ignore
export type IFillPropertyAuto<T extends Console> = Pick<ICrossConsole, Exclude<IMethods, keyof T>>
