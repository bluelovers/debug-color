/**
 * Console2 日誌格式化測試
 * Console2 log format tests
 *
 * 測試 Console2 內部用於日誌格式化的函數
 * Tests Console2 internal functions for log formatting
 *
 * @module debug-color2/test/console/_logFormat
 */
/// <reference types="node" />
/// <reference types="jest" />

import { _logFormat } from '../../lib/console/_logFormat';

describe(`Console Internal - _logFormat`, () =>
{

	describe(`_logFormat with string arguments`, () =>
	{

		/**
		 * 測試：單一字串參數應該直接回傳
		 * Test: Single string argument should return as-is
		 */
		test(`should return single string argument`, () =>
		{
			const result = _logFormat('hello');
			expect(result).toBe('hello');
		});

		/**
		 * 測試：多個字串參數應該用空格連接
		 * Test: Multiple string arguments should be joined with space
		 */
		test(`should join multiple string arguments`, () =>
		{
			const result = _logFormat('hello', 'world');
			expect(result).toBe('hello world');
		});

		/**
		 * 測試：快照記錄字串參數結果
		 * Test: Snapshot records string argument results
		 */
		test(`should match snapshot for string arguments`, () =>
		{
			const testCases = [
				{ input: ['single'], expected: 'single' },
				{ input: ['hello', 'world'], expected: 'hello world' },
				{ input: ['a', 'b', 'c'], expected: 'a b c' },
			];

			const results = testCases.map(tc => ({
				explain: '✅ 字串參數格式化 / String arguments formatting',
				input: { argv: tc.input },
				result: _logFormat(...tc.input),
			}));

			expect(results).toMatchSnapshot();
		});

	});

	describe(`_logFormat with object arguments`, () =>
	{

		/**
		 * 測試：物件參數應該被格式化為字串
		 * Test: Object arguments should be formatted to string
		 */
		test(`should format object to string`, () =>
		{
			const obj = { name: 'test', value: 123 };
			const result = _logFormat(obj);

			expect(typeof result).toBe('string');
			expect(result).toContain('test');
		});

		/**
		 * 測試：混合物件和字串應該正確格式化
		 * Test: Mixed objects and strings should format correctly
		 */
		test(`should format mixed object and string`, () =>
		{
			const result = _logFormat('message:', { foo: 'bar' });

			expect(typeof result).toBe('string');
			expect(result).toMatchSnapshot();
		});

		/**
		 * 測試：快照記錄物件參數結果
		 * Test: Snapshot records object argument results
		 */
		test(`should match snapshot for object arguments`, () =>
		{
			const testCases = [
				{
					explain: '✅ 簡單物件 / Simple object',
					input: [{ name: 'test' }],
				},
				{
					explain: '✅ 巢狀物件 / Nested object',
					input: [{ user: { name: 'Alice', age: 30 } }],
				},
				{
					explain: '✅ 混合參數 / Mixed arguments',
					input: ['User:', { name: 'Bob', active: true }],
				},
			];

			const results = testCases.map(tc => ({
				explain: tc.explain,
				input: { argv: tc.input },
				result: _logFormat(...tc.input),
			}));

			expect(results).toMatchSnapshot();
		});

	});

	describe(`_logFormat with number arguments`, () =>
	{

		/**
		 * 測試：數字參數應該被轉換為字串
		 * Test: Number arguments should be converted to string
		 */
		test(`should convert number to string`, () =>
		{
			const result = _logFormat(42);
			expect(result).toBe('42');
		});

		/**
		 * 測試：多個數字應該用空格連接
		 * Test: Multiple numbers should be joined with space
		 */
		test(`should join multiple numbers`, () =>
		{
			const result = _logFormat(1, 2, 3);
			expect(result).toBe('1 2 3');
		});

		/**
		 * 測試：快照記錄數字參數結果
		 * Test: Snapshot records number argument results
		 */
		test(`should match snapshot for number arguments`, () =>
		{
			const testCases = [
				{ input: [0], expected: '0' },
				{ input: [100], expected: '100' },
				{ input: [-5], expected: '-5' },
				{ input: [1.5], expected: '1.5' },
			];

			const results = testCases.map(tc => ({
				explain: '✅ 數字參數格式化 / Number arguments formatting',
				input: { argv: tc.input },
				result: _logFormat(...tc.input),
			}));

			expect(results).toMatchSnapshot();
		});

	});

	describe(`_logFormat with special values`, () =>
	{

		/**
		 * 測試：undefined 應該被格式化為 'undefined'
		 * Test: undefined should be formatted as 'undefined'
		 */
		test(`should format undefined`, () =>
		{
			const result = _logFormat(undefined);
			expect(result).toBe('undefined');
		});

		/**
		 * 測試：null 應該被格式化為 'null'
		 * Test: null should be formatted as 'null'
		 */
		test(`should format null`, () =>
		{
			const result = _logFormat(null);
			expect(result).toBe('null');
		});

		/**
		 * 測試：NaN 應該被格式化為 'NaN'
		 * Test: NaN should be formatted as 'NaN'
		 */
		test(`should format NaN`, () =>
		{
			const result = _logFormat(NaN);
			expect(result).toBe('NaN');
		});

		/**
		 * 測試：Infinity 應該被格式化為 'Infinity'
		 * Test: Infinity should be formatted as 'Infinity'
		 */
		test(`should format Infinity`, () =>
		{
			const result = _logFormat(Infinity);
			expect(result).toBe('Infinity');
		});

		/**
		 * 測試：快照記錄特殊值結果
		 * Test: Snapshot records special value results
		 */
		test(`should match snapshot for special values`, () =>
		{
			const specialValues = [
				{ explain: '✅ undefined', input: [undefined], expected: 'undefined' },
				{ explain: '✅ null', input: [null], expected: 'null' },
				{ explain: '✅ NaN', input: [NaN], expected: 'NaN' },
				{ explain: '✅ Infinity', input: [Infinity], expected: 'Infinity' },
				{ explain: '✅ -Infinity', input: [-Infinity], expected: '-Infinity' },
				{ explain: '✅ true', input: [true], expected: 'true' },
				{ explain: '✅ false', input: [false], expected: 'false' },
			];

			const results = specialValues.map(sv => ({
				explain: sv.explain,
				input: { argv: sv.input },
				result: _logFormat(...sv.input),
			}));

			expect(results).toMatchSnapshot();
		});

	});

	describe(`_logFormat with format specifiers`, () =>
	{

		/**
		 * 測試：%s 格式化應該被正確處理
		 * Test: %s format specifier should be handled correctly
		 */
		test(`should handle %s specifier`, () =>
		{
			const result = _logFormat('Hello %s', 'World');
			expect(result).toBe('Hello World');
		});

		/**
		 * 測試：%d 格式化應該被正確處理
		 * Test: %d format specifier should be handled correctly
		 */
		test(`should handle %d specifier`, () =>
		{
			const result = _logFormat('Value: %d', 42);
			expect(result).toBe('Value: 42');
		});

		/**
		 * 測試：%j 格式化應該被正確處理（JSON）
		 * Test: %j format specifier should be handled correctly (JSON)
		 */
		test(`should handle %j specifier for JSON`, () =>
		{
			const result = _logFormat('%j', { a: 1 });
			expect(result).toContain('"a":1');
		});

		/**
		 * 測試：快照記錄格式化標記結果
		 * Test: Snapshot records format specifier results
		 */
		test(`should match snapshot for format specifiers`, () =>
		{
			const testCases = [
				{ explain: '✅ %s 標記 / %s specifier', input: ['Hello %s', 'World'] },
				{ explain: '✅ %d 標記 / %d specifier', input: ['Count: %d', 100] },
				{ explain: '✅ %j 標記 / %j specifier', input: ['%j', { key: 'value' }] },
				{ explain: '✅ 多個標記 / Multiple specifiers', input: ['%s: %d', 'Answer', 42] },
			];

			const results = testCases.map(tc => ({
				explain: tc.explain,
				input: { argv: tc.input },
				result: _logFormat(...tc.input),
			}));

			expect(results).toMatchSnapshot();
		});

	});

	describe(`_logFormat documented snapshots`, () =>
	{

		/**
		 * 測試：文件化快照 - 記錄完整功能行為
		 * Test: Documented snapshot - record complete function behavior
		 */
		test(`should document complete behavior`, () =>
		{
			const testCases = [
				{
					explain: '✅ 空參數 / Empty arguments',
					'#id': 'format-001',
					tags: 'basic, empty',
					input: [],
				},
				{
					explain: '✅ 單一參數 / Single argument',
					'#id': 'format-002',
					tags: 'basic, single',
					input: ['message'],
				},
				{
					explain: '✅ 多個字串 / Multiple strings',
					'#id': 'format-003',
					tags: 'basic, strings',
					input: ['a', 'b', 'c'],
				},
				{
					explain: '✅ 混合類型 / Mixed types',
					'#id': 'format-004',
					tags: 'mixed, string-number',
					input: ['count:', 123, 'status:', 'active'],
				},
				{
					explain: '✅ 陣列參數 / Array argument',
					'#id': 'format-005',
					tags: 'array',
					input: [[1, 2, 3]],
				},
				{
					explain: '✅ 函式參數 / Function argument',
					'#id': 'format-006',
					tags: 'function',
					input: [function testFn() {}],
				},
			];

			const results = testCases.map(tc => ({
				explain: tc.explain,
				'#id': tc['#id'],
				tags: tc.tags,
				input: { argv: tc.input },
				result: _logFormat(...tc.input),
			}));

			expect(results).toMatchSnapshot();
		});

	});

});
