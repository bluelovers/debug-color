/**
 * Created by user on 2018/7/2/002.
 */
/// <reference types="node" />
import { Chalk, Level } from 'chalk';
import * as util from 'util';
import { SYM_CHALK, SYM_CONSOLE } from './val';
import { SYM_DATA } from './val';
import { IStyles } from './styles';
export { InspectOptions } from 'util';
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
export interface Console2 extends Console, IStyles {
    (...argv: any[]): void;
    [SYM_CONSOLE]: Console;
    [SYM_CHALK]: Chalk;
    [SYM_DATA]: IOptions;
}
export declare class Console2 {
    constructor(target?: Console, options?: IOptions);
    chalk: Chalk;
    levelColor: Level;
    enabledColor: boolean;
    inspectOptions: util.InspectOptions;
    enabled: boolean;
    setOptions(options: IOptions): this;
    withOptions(options: IOptions): this;
    protected _clone(): this;
    protected _chalkStyleProp(name: any): this;
    protected _logFormat(format: any, ...args: any[]): string;
    success(...argv: any[]): any;
    ok(...argv: any[]): any;
    fail(...argv: any[]): any;
    protected _log(name: string, argv: any, failBack?: string): any;
    protected _chalkStyleMethod(name: any): (...argv: any[]) => any;
    protected _time(): any;
}
export interface IChalkLike {
    (string: any): string;
    (string: any, ...argv: any[]): string;
    (...argv: any[]): string;
}
export default Console2;
