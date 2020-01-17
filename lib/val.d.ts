/**
 * Created by user on 2018/6/26/026.
 */
/// <reference types="node" />
import { Chalk, ChalkOptions } from 'chalk';
import { InspectOptions } from 'util';
import { DateTime } from 'luxon';
import { IStylesColorNames } from './styles';
export { InspectOptions } from 'util';
export { ChalkOptions };
export declare const SYM_DEBUG_CONSOLE: unique symbol;
export declare const SYM_CHALK: unique symbol;
export declare const SYM_CONSOLE: unique symbol;
export declare const SYM_EVENT: unique symbol;
export declare const SYM_DATA: unique symbol;
export declare type IOptionsColorsProp = 'debug' | 'error' | 'info' | 'log' | 'trace' | 'warn' | 'success' | 'ok' | 'exception' | 'fail';
export interface IOptions {
    /**
     * enable log display or not
     */
    enabled?: boolean;
    /**
     * show label string
     */
    label?: boolean | string[];
    /**
     * show time label
     */
    time?: boolean;
    /**
     * allow change timeFormat
     *
     * @default '[HH:mm:ss.SSS]'
     */
    timeFormat?: string;
    timeFormatFn?<T extends unknown[]>(data: Parameters<IOptions["labelFormatFn"]>[0] & {
        failBackTimeFormat: string;
        date: DateTime;
    }): string;
    /**
     * allow change labelFormat
     *
     * @default `[${data.name.toString().toUpperCase()}]`
     */
    labelFormatFn?<T extends unknown[]>(data: {
        name: string;
        argv?: T;
        failBack: string;
    }): string;
    /**
     * set default inspectOptions
     */
    inspectOptions?: InspectOptions;
    chalkOptions?: ChalkOptions;
    /**
     * set color style
     */
    colors?: Record<IOptionsColorsProp | string, Chalk | IChalkLike | IStylesColorNames>;
    /**
     * check is node.js console
     */
    readonly stream?: boolean;
}
export declare const defaultColors: Partial<IOptions["colors"]>;
export interface IChalkLike {
    (string: any): string;
    (string: any, ...argv: any[]): string;
    (...argv: any[]): string;
}
declare const _default: typeof import("./val");
export default _default;
