/**
 * Created by user on 2018/6/26/026.
 */
/// <reference types="node" />
import { Chalk } from 'chalk';
import * as util from 'util';
import * as val from './val';
export { InspectOptions } from 'util';
export declare const SYM_DEBUG_CONSOLE: unique symbol;
export declare const SYM_CHALK: unique symbol;
export declare const SYM_CONSOLE: unique symbol;
export declare const SYM_EVENT: unique symbol;
export declare const SYM_DATA: unique symbol;
export default val;
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
     * set default inspectOptions
     */
    inspectOptions?: util.InspectOptions;
    /**
     * set color style
     */
    colors?: {
        debug?: any;
        error?: any;
        info?: any;
        log?: any;
        trace?: any;
        warn?: any;
        success?: any;
        ok?: any;
        [k: string]: string | Chalk | IChalkLike;
    };
    /**
     * check is node.js console
     */
    readonly stream?: boolean;
}
export declare const defaultColors: IOptions["colors"];
export interface IChalkLike {
    (string: any): string;
    (string: any, ...argv: any[]): string;
    (...argv: any[]): string;
}
