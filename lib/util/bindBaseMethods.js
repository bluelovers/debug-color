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
 *
 * @example
 * // _get 將原始 Console 方法包裝，確保 this 指向正確的 Console2 實例
 * // _get wraps original Console methods to ensure this points to correct Console2 instance
 *
 * // 例如：當調用 console2.log('msg') 時
 * // For example: when calling console2.log('msg')
 * // 包裝後的函式會確保 this 指向 console2，而非全域物件
 * // The wrapped function ensures this points to console2, not global object
 *
 * // 內部實現：
 * // Internal implementation:
 * // const fn = _get(console2, 'log');
 * // fn('hello'); // 內部會呼叫 console2._log('hello') 並保持 this = console2
 *
 * @example
 * // 為何需要 this 綁定：
 * // Why this binding is needed:
 *
 * // 如果沒有綁定，直接調用時 this 可能會是其他值
 * // If no binding, when called directly this might be other values
 * const logFn = console2.log;
 * logFn('msg'); // this 是 undefined（strict mode）或 window（非 strict）
 *
 * // 透過 _get 包裝後，this 會永遠指向正確的 Console2 實例
 * // After wrapping with _get, this will always point to correct Console2 instance
 * const boundLog = _get(console2, 'log');
 * boundLog('msg'); // this 正確指向 console2
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
 *
 * @example
 * // setBindThis 使用 Object.defineProperty 設定 SYM_THIS 屬性
 * // setBindThis uses Object.defineProperty to set SYM_THIS property
 *
 * // 這是一個 getter 函式，每次存取都會返回綁定的 Console2 實例
 * // This is a getter function, every access returns the bound Console2 instance
 *
 * // 在 _get 中，包裝函式會檢查 fn[SYM_THIS] 來取得正確的 this
 * // In _get, the wrapper function checks fn[SYM_THIS] to get correct this
 *
 * @example
 * // 內部實現原理：
 * // Internal implementation principle:
 *
 * Object.defineProperty(fn, SYM_THIS, {
 *   get() { return me },  // 存取時返回綁定的實例
 *   enumerable: false,   // 屬性不可列舉，避免被 for...in 遍歷
 * });
 *
 * // 這樣即使函式被當作回調函式傳遞，this 仍然是正確的
 * // This way even if the function is passed as callback, this is still correct
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
 *
 * @example
 * // bindBaseMethods 會為 Console2 的所有方法建立 this 綁定
 * // bindBaseMethods creates this binding for all Console2 methods
 *
 * // 這保證了即使將方法當作回調傳遞，this 仍然正確
 * // This ensures that even when passing methods as callbacks, this is still correct
 *
 * // 使用場景：
 * // Usage scenarios:
 * // 1. 將 console2.log 傳遞給其他函式
 * // 1. Passing console2.log to other functions
 * setTimeout(console2.log, 1000, 'delayed message');
 * // 沒有綁定的話，this 會是 timeout，輸出會失敗
 * // Without binding, this would be timeout and output would fail
 *
 * // 2. 作為事件處理器
 * // 2. As event handler
 * element.addEventListener('click', console2.log);
 * // 沒有綁定的話，this 會是 element
 * // Without binding, this would be element
 *
 * @example
 * // 自動調用流程：
 * // Automatic call flow:
 * // Console2 構造函式會自動調用 bindBaseMethods(this)
 * // Console2 constructor automatically calls bindBaseMethods(this)
 *
 * // 這確保了每個 Console2 實例的所有方法都有正確的 this 綁定
 * // This ensures every Console2 instance's methods have correct this binding
 */
function bindBaseMethods(target) {
    fill_property_1.methods.forEach(m => {
        target[m] = _get(target, m);
    });
    return target;
}
//# sourceMappingURL=bindBaseMethods.js.map