/**
 * Console2 日誌參數格式化測試
 * Console2 log arguments formatting tests
 *
 * 測試 Console2 內部用於處理日誌參數的函數
 * Tests Console2 internal functions for processing log arguments
 *
 * @module debug-color2/test/console/_logArgv
 */
/// <reference types="node" />
/// <reference types="jest" />

import { Console2 } from '../..';
import { SYM_DATA, SYM_CHALK, SYM_CONSOLE } from '../../lib/val';
import { _logArgv, _logErrorArgv } from '../../lib/console/_logArgv';
import chalk from 'chalk';

describe(`Console Internal - _logArgv`, () =>
{

	let console2: Console2;

	beforeEach(() =>
	{
		console2 = new Console2(null, {
			inspectOptions: {
				colors: true,
			},
		});
	});

	describe(`_logArgv basic formatting`, () =>
	{

		/**
		 * 測試：基本字串參數應該被正確格式化
		 * Test: Basic string arguments should be correctly formatted
		 */
		test(`should format basic string arguments`, () =>
		{
			const result = _logArgv.call(console2, ['hello world'], 'log', 'log');

			expect(result).toMatchSnapshot();
		});

		/**
		 * 測試：多個參數應該被連接
		 * Test: Multiple arguments should be joined
		 */
		test(`should join multiple arguments`, () =>
		{
			const result = _logArgv.call(console2, ['hello', 'world', '!'], 'log', 'log');

			expect(result).toMatchSnapshot();
		});

		/**
		 * 測試：應該返回正確的結構
		 * Test: Should return correct structure
		 */
		test(`should return correct structure with name and arr`, () =>
		{
			const result = _logArgv.call(console2, ['test message'], 'log');

			expect(result).toHaveProperty('name');
			expect(result).toHaveProperty('arr');
			expect(Array.isArray(result.arr)).toBe(true);
		});

	});

	describe(`_logArgv with different log types`, () =>
	{

		/**
		 * 測試：不同的日誌類型應該被正確處理
		 * Test: Different log types should be correctly handled
		 */
		test(`should handle different log types`, () =>
		{
			const logTypes = ['log', 'info', 'debug', 'warn', 'error'];
			const results = logTypes.map(type => ({
				type,
				result: _logArgv.call(console2, ['test'], type),
			}));

			expect(results).toMatchSnapshot();
		});

		/**
		 * 測試：未知類型應該回退到 failBack
		 * Test: Unknown type should fallback to failBack
		 */
		test(`should fallback to failBack for unknown types`, () =>
		{
			const result = _logArgv.call(console2, ['test'], 'unknownType', 'log');

			expect(result.name).toBe('log');
		});

	});

	describe(`_logArgv with time enabled`, () =>
	{

		/**
		 * 測試：啟用時間時應該包含時間戳
		 * Test: Should include timestamp when time is enabled
		 */
		test(`should include timestamp when time is enabled`, () =>
		{
			const consoleWithTime = new Console2(null, {
				time: true,
			});

			const result = _logArgv.call(consoleWithTime, ['test message'], 'log');

			expect(result.arr.length).toBeGreaterThan(1);
			expect(result).toMatchSnapshot();
		});

		/**
		 * 測試：自訂時間格式應該被應用
		 * Test: Custom time format should be applied
		 */
		test(`should apply custom time format`, () =>
		{
			const consoleWithTime = new Console2(null, {
				time: true,
				timeFormat: '[HH:mm]',
			});

			const result = _logArgv.call(consoleWithTime, ['test'], 'log');

			expect(result).toMatchSnapshot();
		});

	});

	describe(`_logArgv with label enabled`, () =>
	{

		/**
		 * 測試：啟用標籤時應該包含標籤
		 * Test: Should include label when label is enabled
		 */
		test(`should include label when label is enabled`, () =>
		{
			const consoleWithLabel = new Console2(null, {
				label: true,
			});

			const result = _logArgv.call(consoleWithLabel, ['test'], 'log');

			expect(result).toMatchSnapshot();
		});

		/**
		 * 測試：標籤陣列應該只對指定類型生效
		 * Test: Label array should only apply to specified types
		 */
		test(`should apply label array only to specified types`, () =>
		{
			const consoleWithLabel = new Console2(null, {
				label: ['log', 'info'],
			});

			const logResult = _logArgv.call(consoleWithLabel, ['test'], 'log');
			const errorResult = _logArgv.call(consoleWithLabel, ['test'], 'error');

			expect(logResult.arr.length).toBeGreaterThan(1);
			expect(errorResult.arr.length).toBe(1);
		});

	});

	describe(`_logArgv with custom colors`, () =>
	{

		/**
		 * 測試：自訂顏色應該被應用
		 * Test: Custom colors should be applied
		 */
		test(`should apply custom colors`, () =>
		{
			const consoleWithColor = new Console2(null, {
				colors: {
					log: 'green',
					error: 'red',
					warn: 'yellow',
				},
			});

			const result = _logArgv.call(consoleWithColor, ['test'], 'log');

			expect(result).toMatchSnapshot();
		});

		/**
		 * 測試：字串顏色應該被轉換為 Chalk 函數
		 * Test: String color should be converted to Chalk function
		 */
		test(`should convert string color to Chalk function`, () =>
		{
			const consoleWithColor = new Console2(null, {
				colors: {
					log: 'cyan',
				},
			});

			const result = _logArgv.call(consoleWithColor, ['test'], 'log');

			expect(result).toMatchSnapshot();
		});

	});

	describe(`_logArgv documented snapshots`, () =>
	{

		/**
		 * 測試：文件化快照 - 記錄各種配置下的行為
		 * Test: Documented snapshot - record behavior under various configurations
		 */
		test(`should document various configurations`, () =>
		{
			const testCases = [
				{
					explain: '✅ 基本日誌 / Basic log',
					'#id': 'logArgv-001',
					tags: 'basic, log',
					setup: () => new Console2(null, {
						inspectOptions: {
							colors: false,
						},
					}),
					inputArgs: ['hello'],
					inputName: 'log',
				},
				{
					explain: '✅ 錯誤日誌 / Error log',
					'#id': 'logArgv-002',
					tags: 'error',
					setup: () => new Console2(null, {
						inspectOptions: {
							colors: false,
						},
					}),
					inputArgs: ['error occurred'],
					inputName: 'error',
				},
				{
					explain: '✅ 啟用時間 / Time enabled',
					'#id': 'logArgv-003',
					tags: 'time, timestamp',
					setup: () => new Console2(null, { time: true }),
					inputArgs: ['test'],
					inputName: 'log',
				},
				{
					explain: '✅ 啟用標籤 / Label enabled',
					'#id': 'logArgv-004',
					tags: 'label, tag',
					setup: () => new Console2(null, { label: true }),
					inputArgs: ['test'],
					inputName: 'log',
				},
				{
					explain: '✅ 自訂顏色 / Custom colors',
					'#id': 'logArgv-005',
					tags: 'colors, custom',
					setup: () => new Console2(null, { colors: { log: 'green' } }),
					inputArgs: ['test'],
					inputName: 'log',
				},
				{
					explain: '✅ 多個參數 / Multiple arguments',
					'#id': 'logArgv-006',
					tags: 'multiple, args',
					setup: () => new Console2(null, {  }),
					inputArgs: ['a', 'b', 'c', 123],
					inputName: 'log',
				},
			];

			const results = testCases.map(tc => {
				const consoleInstance = tc.setup();
				const result = _logArgv.call(consoleInstance, tc.inputArgs, tc.inputName);

				return {
					explain: tc.explain,
					'#id': tc['#id'],
					tags: tc.tags,
					input: { argv: tc.inputArgs, name: tc.inputName },
					result: {
						name: result.name,
						arrCount: result.arr.length,
						arr: result.arr,
					},
				};
			});

			expect(results).toMatchSnapshot();
		});

	});

});

describe(`Console Internal - _logErrorArgv`, () =>
{

	let console2: Console2;

	beforeEach(() =>
	{
		console2 = new Console2(null, {
			inspectOptions: {
				colors: true,
			},
		});
	});

	describe(`_logErrorArgv basic behavior`, () =>
	{

		/**
		 * 測試：基本行為應該與 _logArgv 相同
		 * Test: Basic behavior should be the same as _logArgv
		 */
		test(`should have same behavior as _logArgv`, () =>
		{
			const result = _logErrorArgv.call(console2, ['error message'], 'error', 'error');

			expect(result).toHaveProperty('name');
			expect(result).toHaveProperty('arr');
		});

		/**
		 * 測試：預設應該使用 error 作為方法名
		 * Test: Should use error as default method name
		 */
		test(`should use error as default method name`, () =>
		{
			const result = _logErrorArgv.call(console2, ['test']);

			expect(result.name).toBe('error');
		});

		/**
		 * 測試：快照記錄錯誤日誌結果
		 * Test: Snapshot records error log results
		 */
		test(`should match snapshot for error log`, () =>
		{
			const result = _logErrorArgv.call(console2, ['error occurred'], 'error');

			expect(result).toMatchSnapshot();
		});

	});

	describe(`_logErrorArgv with custom failBack`, () =>
	{

		/**
		 * 測試：自訂 failBack 應該被正確應用
		 * Test: Custom failBack should be correctly applied
		 */
		test(`should apply custom failBack`, () =>
		{
			const result = _logErrorArgv.call(console2, ['test'], 'nonExistent', 'warn');

			expect(result.name).toBe('warn');
		});

	});

	describe(`_logErrorArgv documented snapshots`, () =>
	{

		/**
		 * 測試：文件化快照 - 記錄錯誤處理行為
		 * Test: Documented snapshot - record error handling behavior
		 */
		test(`should document error handling behavior`, () =>
		{
			const testCases = [
				{
					explain: '✅ 基本錯誤 / Basic error',
					'#id': 'errorArgv-001',
					tags: 'error, basic',
					inputArgs: ['error occurred'],
				},
				{
					explain: '✅ 警告回退 / Warn fallback',
					'#id': 'errorArgv-002',
					tags: 'error, fallback',
					inputArgs: ['test'],
					inputName: 'fail',
					inputFailBack: 'warn',
				},
				{
					explain: '✅ 多個參數 / Multiple arguments',
					'#id': 'errorArgv-003',
					tags: 'error, multiple',
					inputArgs: ['Error:', 'code:', 500],
				},
			];

			const results = testCases.map(tc => ({
				explain: tc.explain,
				'#id': tc['#id'],
				tags: tc.tags,
				input: { argv: tc.inputArgs, name: tc.inputName ?? 'error', failBack: tc.inputFailBack ?? 'error' },
				result: _logErrorArgv.call(
					console2,
					tc.inputArgs,
					tc.inputName ?? 'error',
					tc.inputFailBack ?? 'error'
				),
			}));

			expect(results).toMatchSnapshot();
		});

	});

});
