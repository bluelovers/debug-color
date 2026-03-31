"use strict";
/**
 * Console2 方法綁定工具
 * Console2 method binding utility
 *
 * 用於將 Console2 的方法綁定到正確的 this 上下文
 * Used to bind Console2 methods to the correct this context
 *
 * @module debug-color2/lib/util/bindBaseMethods
 * @created 2021/7/10
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBindThis = setBindThis;
exports.bindBaseMethods = bindBaseMethods;
const tslib_1 = require("tslib");
const node_1 = tslib_1.__importDefault(require("../node"));
const fill_property_1 = require("../fill-property");
const val_1 = require("../val");
/**
 * 取得綁定後的函式
 * Get bound function
 *
 * 將原始的 Console 方法包裝成一个新的函式，確保 this 上下文正確
 * Wrap original Console method into a new function to ensure correct this context
 *
 * 處理邏輯：
 * 1. 取得目標物件上的原始函式
 * 2. 建立包裝函式，自動處理 this 的綁定
 * 3. 設定綁定的 this 上下文
 * 4. 設定函式名稱屬性
 *
 * Processing logic:
 * 1. Get original function from target object
 * 2. Create wrapper function that automatically handles this binding
 * 3. Set bound this context
 * 4. Set function name property
 *
 * @param target - Console2 實例 / Console2 instance
 * @param name - 方法名稱 / Method name
 * @returns 綁定後的函式 / Bound function
 */
// @ts-ignore
function _get(target, name) {
    // @ts-ignore
    let oldFn = target[name];
    // @ts-ignore
    let fn = function (...argv) {
        let self = this;
        /**
         * 判斷 this 的類型並設定正確的 self 上下文
         * Determine this type and set correct self context
         */
        if (this instanceof node_1.default) {
            self = this;
        }
        else if (typeof this !== 'undefined') {
            self = this;
        }
        else if (fn[val_1.SYM_THIS]) {
            self = fn[val_1.SYM_THIS];
        }
        // @ts-ignore
        return oldFn.apply(self, argv);
    };
    setBindThis(fn, target);
    Object.defineProperty(fn, 'name', {
        value: name,
        enumerable: false,
    });
    return fn;
}
/**
 * 設定綁定的 this 上下文
 * Set bound this context
 *
 * 透過 Object.defineProperty 為目標函式設定一個非可列舉的屬性，用於儲存綁定的 Console2 實例
 * Use Object.defineProperty to set a non-enumerable property on target function for storing bound Console2 instance
 *
 * @param target - 目標函式 / Target function
 * @param me - Console2 實例 / Console2 instance
 * @returns 設定後的函式 / Configured function
 */
function setBindThis(target, me) {
    Object.defineProperty(target, val_1.SYM_THIS, {
        get() {
            return me;
        },
        enumerable: false,
    });
    return target;
}
/**
 * 綁定所有基礎方法到目標物件
 * Bind all base methods to target object
 *
 * 將 Console2 的所有方法綁定到目標物件，確保 this 上下文正確
 * Bind all Console2 methods to target object to ensure correct this context
 *
 * @param target - 目標 Console2 實例 / Target Console2 instance
 * @returns 綁定後的目標物件 / Bound target object
 */
function bindBaseMethods(target) {
    fill_property_1.methods.forEach(m => {
        target[m] = _get(target, m);
    });
    return target;
}
//# sourceMappingURL=bindBaseMethods.js.map