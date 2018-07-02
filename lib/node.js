"use strict";
/**
 * Created by user on 2018/7/2/002.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="node" />
const chalk_1 = require("chalk");
const luxon_1 = require("luxon");
const util = require("util");
const chk_1 = require("./chk");
const FillProperty = require("./fill-property");
const styles_1 = require("./styles");
const val_1 = require("./val");
const util_1 = require("./util");
class Console2 {
    constructor(target = console, options) {
        this[val_1.SYM_CONSOLE] = target;
        this[val_1.SYM_CHALK] = chalk_1.default.constructor();
        // @ts-ignore
        this[val_1.SYM_DATA] = Object.create({
            colors: Object.create(val_1.defaultColors),
        });
        // @ts-ignore
        this[val_1.SYM_DATA].stream = !!(console._stdout && console._stderr);
        if (this[val_1.SYM_CHALK].enabled && !chk_1.default()) {
            this[val_1.SYM_CHALK].enabled = false;
        }
        else if (!this[val_1.SYM_CHALK].enabled && util_1.isForceColor()) {
            this[val_1.SYM_CHALK].enabled = true;
        }
        Object.assign(this[val_1.SYM_DATA], options || {});
    }
    get chalk() {
        return this[val_1.SYM_CHALK];
    }
    set chalk(value) {
        this[val_1.SYM_CHALK] = value;
    }
    get levelColor() {
        return this[val_1.SYM_CHALK].level;
    }
    set levelColor(value) {
        this[val_1.SYM_CHALK].level = value;
    }
    get enabledColor() {
        return this[val_1.SYM_CHALK].enabled;
    }
    set enabledColor(value) {
        this[val_1.SYM_CHALK].enabled = value;
    }
    get inspectOptions() {
        return this[val_1.SYM_DATA].inspectOptions;
    }
    set inspectOptions(value) {
        this[val_1.SYM_DATA].inspectOptions = value;
    }
    get enabled() {
        return this[val_1.SYM_DATA].enabled !== false;
    }
    set enabled(value) {
        this[val_1.SYM_DATA].enabled = value === true;
    }
    setOptions(options) {
        Object.assign(this[val_1.SYM_DATA], options);
        return this;
    }
    withOptions(options) {
        let o = this._clone();
        o[val_1.SYM_CHALK] = this[val_1.SYM_CHALK];
        o[val_1.SYM_DATA] = Object.assign({}, this[val_1.SYM_DATA], options);
        return o;
    }
    _clone() {
        const self = this;
        let o = function Console2Method(...argv) {
            // @ts-ignore
            return o.log(...argv);
        };
        /**
         * allow hacking parent object
         */
        // @ts-ignore
        //o.__proto__ = this.__proto__.constructor.prototype;
        o.__proto__ = this;
        //o = o.bind(o);
        o[val_1.SYM_CONSOLE] = self[val_1.SYM_CONSOLE];
        o[val_1.SYM_DATA] = self[val_1.SYM_DATA];
        // @ts-ignore
        return o;
    }
    _chalkStyleProp(name) {
        let o = this._clone();
        o[val_1.SYM_CHALK] = this[val_1.SYM_CHALK][name];
        return o;
    }
    _logFormat(format, ...args) {
        return util.format(format, ...args);
    }
    success(...argv) {
        return this._log('success', argv);
    }
    ok(...argv) {
        return this._log('ok', argv);
    }
    fail(...argv) {
        return this._log('fail', argv, 'error');
    }
    _log(name, argv, failBack = 'log') {
        if (!this.enabled) {
            return;
        }
        // @ts-ignore
        let s = this._logFormat(...argv);
        let o = this[val_1.SYM_CHALK](s);
        let arr = [];
        let data = this[val_1.SYM_DATA];
        if (data.time) {
            arr.push(this._time());
        }
        if (data.label) {
            let _ok = true;
            if (Array.isArray(data.label) && !data.label.includes(name)) {
                _ok = false;
            }
            _ok && arr.push(`[${name.toString().toUpperCase()}]`);
        }
        arr.push(o);
        if (arr.length && data.colors && data.colors[name]) {
            let c = data.colors[name];
            if (typeof c === 'string') {
                c = chalk_1.default[c];
            }
            arr = arr.map(v => c(v));
        }
        if (process.platform == 'win32' && this.enabledColor) {
            /**
             * @FIXME fix bug on windows when after bold
             *
             * https://github.com/chalk/chalk/issues/145#issuecomment-288985903
             */
            arr = arr.map(v => '\u001B[0m' + v + '\u001B[0m');
        }
        if (!(name in this[val_1.SYM_CONSOLE])) {
            name = failBack;
        }
        return this[val_1.SYM_CONSOLE][name](...arr);
    }
    _chalkStyleMethod(name) {
        return function chalkStyleMethod(...argv) {
            let o = this._clone();
            o[val_1.SYM_CHALK] = this[val_1.SYM_CHALK][name](...argv);
            return o;
        };
    }
    _time() {
        return luxon_1.DateTime.local().toFormat('[HH:mm:ss.SSS]');
    }
}
exports.Console2 = Console2;
util.inherits(Console2, Function);
// @ts-ignore
Console2.prototype.Console = Console2;
styles_1.styleNames.forEach(function (name) {
    if (styles_1.styleNamesFn.includes(name)) {
        Object.defineProperty(Console2.prototype, name, {
            get() {
                return this._chalkStyleMethod(name);
            },
        });
    }
    else {
        Object.defineProperty(Console2.prototype, name, {
            get() {
                return this._chalkStyleProp(name);
            },
        });
    }
});
FillProperty.methods.forEach(function (name) {
    if (name == 'dir') {
        Console2.prototype[name] = function chalkStyleLogOthers(object, options) {
            if (!this.enabled) {
                return;
            }
            if (!options && this[val_1.SYM_DATA].inspectOptions) {
                options = this[val_1.SYM_DATA].inspectOptions;
            }
            if (options) {
                return this[val_1.SYM_CONSOLE][name](object, options);
            }
            return this[val_1.SYM_CONSOLE][name](object);
        };
    }
    else if (name == 'assert') {
        Console2.prototype[name] = function chalkStyleLogAssert(value, ...argv) {
            if (!this.enabled) {
                return;
            }
            if (!value) {
                let o;
                if (argv.length) {
                    let s = this._logFormat(...argv);
                    o = this[val_1.SYM_CHALK](s);
                }
                return this[val_1.SYM_CONSOLE][name](value, o);
            }
        };
    }
    else if (FillProperty.methods_stdout.includes(name)) {
        Console2.prototype[name] = function chalkStyleLog(...argv) {
            return this._log(name, argv);
        };
    }
    else if (FillProperty.methods_stderr.includes(name)) {
        Console2.prototype[name] = function chalkStyleLog(...argv) {
            return this._log(name, argv, 'error');
        };
    }
    else {
        Console2.prototype[name] = function chalkStyleLogOthers(...argv) {
            if (!this.enabled) {
                return;
            }
            return this[val_1.SYM_CONSOLE][name](...argv);
        };
    }
});
exports.default = Console2;
