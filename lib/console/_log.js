"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._log = _log;
const val_1 = require("../val");
const _logArgv_1 = require("./_logArgv");
const _get_enabled_1 = require("./_get_enabled");
/**
 * 執行日誌輸出
 * Execute log output
 *
 * 根據 debug 啟用狀態，決定是否執行日誌輸出
 * 若啟用，則呼叫 _logArgv 處理參數並透過原始 Console 輸出
 * Decide whether to execute log output based on debug enabled status
 * If enabled, call _logArgv to process arguments and output via original Console
 *
 * @param this - Console2 實例 / Console2 instance
 * @param name - 日誌類型名稱 / Log type name
 * @param argv - 參數陣列 / Arguments array
 * @param failBack - 備用方法名稱 / Fallback method name
 * @returns 日誌輸出結果 / Log output result
 */
function _log(name, argv, failBack = 'log') {
    var _a;
    if ((0, _get_enabled_1._get_enabled)(this.enabled)) {
        let data = ((_a = this._logArgv) !== null && _a !== void 0 ? _a : _logArgv_1._logArgv).call(this, argv, name, failBack);
        return this[val_1.SYM_CONSOLE][data.name](...data.arr);
    }
}
//# sourceMappingURL=_log.js.map