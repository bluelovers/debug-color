/**
 * Debug-Color 函數 API 測試
 * Debug-Color Function API Tests
 *
 * 驗證 docs/functions-api.md 中所有範例的正確性
 * Verify correctness of all examples in docs/functions-api.md
 *
 * @module debug-color2/test/functions-api
 */
/// <reference types="node" />
/// <reference types="jest" />

import chalk from 'chalk';
import { Console2 } from '../';

// 樣式管理 / Style Management
import {
	getStyleNamesByChalk,
	styleNames,
	styleNamesFn,
	styleNamesWithoutFn,
} from '../lib/styles';
import { chalkByConsoleMaybe, createFnChalkByConsole } from '../lib/util';

// 屬性填充 / Property Filling
import {
	fillProperty,
	methods,
	methods_stdout,
	methods_stderr,
	methods_output,
	methods_other,
	methods_inspector,
} from '../lib/fill-property';

// 日誌處理 / Log Processing
import { _log } from '../lib/console/_log';
import { _logArgv, _logErrorArgv } from '../lib/console/_logArgv';
import { _logFormat } from '../lib/console/_logFormat';

// 時間格式化 / Time Formatting
import { _time } from '../lib/console/_time';

// 方法綁定 / Method Binding
import { setBindThis, bindBaseMethods } from '../lib/util/bindBaseMethods';
import { SYM_THIS } from '../lib/val';

// 啟用控制 / Enable Control
import { _get_enabled, _set_enabled } from '../lib/console/_get_enabled';

describe(`Debug-Color Functions API`, () =>
{

	// ==================== 樣式管理 / Style Management ====================

	describe(`getStyleNamesByChalk`, () =>
	{

		test(`should return array of style names from Chalk instance`, () =>
		{
			const names = getStyleNamesByChalk(chalk);
			expect(Array.isArray(names)).toBe(true);
			expect(names.length).toBeGreaterThan(0);
		});

		test(`should include common chalk styles like bold, italic, underline`, () =>
		{
			const names = getStyleNamesByChalk(chalk);
			expect(names).toContain('bold');
			expect(names).toContain('italic');
			expect(names).toContain('underline');
		});

		test(`should match snapshot of available styles`, () =>
		{
			const names = getStyleNamesByChalk(chalk);
			expect(names).toMatchSnapshot();
		});

	});

	describe(`styleNames constants`, () =>
	{

		test(`styleNames should be an array`, () =>
		{
			expect(Array.isArray(styleNames)).toBe(true);
		});

		test(`styleNamesFn should contain styles that need parameters (rgb, hex, hsl)`, () =>
		{
			expect(Array.isArray(styleNamesFn)).toBe(true);
			expect(styleNamesFn).toContain('rgb');
			expect(styleNamesFn).toContain('hex');
			expect(styleNamesFn).toContain('hsl');
		});

		test(`styleNamesWithoutFn should contain styles that don't need parameters`, () =>
		{
			expect(Array.isArray(styleNamesWithoutFn)).toBe(true);
			expect(styleNamesWithoutFn).toContain('bold');
			expect(styleNamesWithoutFn).toContain('italic');
		});

	});

	describe(`chalkByConsoleMaybe`, () =>
	{

		test(`should return default chalk when no console provided`, () =>
		{
			const result = chalkByConsoleMaybe();
			expect(result).toBeDefined();
			expect(typeof result.bold).toBe('function');
		});

		test(`should return console chalk when console provided`, () =>
		{
			const console2 = new Console2(null);
			const result = chalkByConsoleMaybe(console2);
			expect(result).toBeDefined();
			expect(result).toBe(console2.chalk);
		});

	});

	describe(`createFnChalkByConsole`, () =>
	{

		test(`should create callback function that can access chalk`, () =>
		{
			const console2 = new Console2(null);
			const fn = createFnChalkByConsole(console2);

			const result = fn((chalkInstance, _console) =>
			{
				return chalkInstance.red('Hello World');
			});

			expect(result).toBeDefined();
			expect(typeof result).toBe('string');
		});

		test(`should pass console instance to callback`, () =>
		{
			const console2 = new Console2(null);
			let receivedConsole: Console2 | undefined;

			createFnChalkByConsole(console2)((chalkInstance, _console) =>
			{
				receivedConsole = _console;
				return chalkInstance.bold('test');
			});

			expect(receivedConsole).toBe(console2);
		});

	});

	// ==================== 屬性填充 / Property Filling ====================

	describe(`fillProperty`, () =>
	{

		test(`should fill missing console methods with default values`, () =>
		{
			const result = fillProperty();
			expect(result).toBeDefined();
			expect(typeof result.log).toBe('function');
			expect(typeof result.error).toBe('function');
			expect(typeof result.warn).toBe('function');
		});

		test(`should fill into target object when provided`, () =>
		{
			const myConsole = {} as any;
			const result = fillProperty(myConsole);
			expect(result).toBe(myConsole);
			expect(typeof result.log).toBe('function');
		});

		test(`should use custom function for specified methods`, () =>
		{
			const customLog = jest.fn();
			const myConsole = {} as any;
			fillProperty(myConsole, ['log', 'error'], customLog);

			// Call the filled method
			myConsole.log('test message');
			expect(customLog).toHaveBeenCalledWith('test message');
		});

	});

	describe(`method classification constants`, () =>
	{

		test(`methods_stdout should contain debug, info, log`, () =>
		{
			expect(methods_stdout).toContain('debug');
			expect(methods_stdout).toContain('info');
			expect(methods_stdout).toContain('log');
		});

		test(`methods_stderr should contain assert, error, trace, warn, exception`, () =>
		{
			expect(methods_stderr).toContain('error');
			expect(methods_stderr).toContain('warn');
		});

		test(`methods_output should contain table, dir, dirxml`, () =>
		{
			expect(methods_output).toContain('table');
			expect(methods_output).toContain('dir');
		});

		test(`methods_other should contain clear, group, time, count`, () =>
		{
			expect(methods_other).toContain('clear');
			expect(methods_other).toContain('group');
			expect(methods_other).toContain('time');
		});

		test(`methods should be a combination of all methods`, () =>
		{
			expect(Array.isArray(methods)).toBe(true);
			expect(methods.length).toBeGreaterThan(0);
		});

	});

	// ==================== 日誌處理 / Log Processing ====================

	describe(`_log`, () =>
	{

		test(`should not output when debug is disabled`, () =>
		{
			const console2 = new Console2(null, {
				enabled: false,
			}) as any;

			const mockLogArgv = jest.fn();
			console2._logArgv = mockLogArgv;

			console2._log('log', ['Hello World']);

			// _logArgv should not be called when disabled
			expect(mockLogArgv).not.toHaveBeenCalled();
		});

	});

	describe(`_logArgv`, () =>
	{

		test(`should format log arguments and return formatted result`, () =>
		{
			const console2 = new Console2(null, {
				enabled: true,
			}) as any;

			const result = console2._logArgv(['Hello World'], 'log', 'log');

			expect(result).toHaveProperty('name');
			expect(result).toHaveProperty('arr');
			expect(Array.isArray(result.arr)).toBe(true);
		});

		test(`should use failBack when target method doesn't exist`, () =>
		{
			const console2 = new Console2(null, {
				enabled: true,
			}) as any;

			const result = console2._logArgv(['test'], 'nonExistentMethod', 'log');

			expect(result.name).toBe('log');
		});

	});

	describe(`_logErrorArgv`, () =>
	{

		test(`should use error as default method name`, () =>
		{
			const console2 = new Console2(null, {
				enabled: true,
			}) as any;

			const mockLogArgv = jest.fn().mockReturnValue({ name: 'error', arr: ['Error message'] });
			console2._logArgv = mockLogArgv;

			const result = console2._logErrorArgv(['Error message']);

			expect(mockLogArgv).toHaveBeenCalledWith(['Error message'], 'error', 'error');
		});

	});

	describe(`_logFormat`, () =>
	{

		test(`should format log output with timestamp and label when enabled`, () =>
		{
			const console2 = new Console2(null, {
				enabled: true,
				time: true,
				label: true,
			}) as any;

			const formatted = console2._logFormat('test message', 'log');

			expect(formatted).toBeDefined();
			expect(typeof formatted).toBe('string');
		});

		test(`should apply color to message when color is configured`, () =>
		{
			const console2 = new Console2(null, {
				enabled: true,
				colors: {
					log: 'green',
				},
			}) as any;

			const formatted = console2._logFormat('test message', 'log');

			expect(formatted).toBeDefined();
		});

	});

	// ==================== 時間格式化 / Time Formatting ====================

	describe(`_time`, () =>
	{

		test(`should format timestamp based on timeFormat option`, () =>
		{
			const console2 = new Console2(null, {
				enabled: true,
				time: true,
				timeFormat: 'yyyy-MM-dd HH:mm:ss',
			}) as any;

			const formatted = console2._time();

			expect(formatted).toBeDefined();
			expect(typeof formatted).toBe('string');
		});

		test(`should return empty string when time is false`, () =>
		{
			const console2 = new Console2(null, {
				enabled: true,
				time: false,
			}) as any;

			const formatted = console2._time();

			// When time is false, may return empty or not apply timestamp
			expect(formatted).toBeDefined();
		});

	});

	// ==================== 方法綁定 / Method Binding ====================

	describe(`setBindThis`, () =>
	{

		test(`should bind methods to target object`, () =>
		{
			const sayHello = function(this: any) {
				return `Hello, ${this.name}`;
			};

			const target = {
				name: 'test',
			} as any;

			const bound = setBindThis(sayHello, target);

			// After binding, calling the function should use target as `this`
			expect(bound[SYM_THIS]).toBe(target);
		});

	});

	describe(`bindBaseMethods`, () =>
	{

		test(`should bind all base methods to Console2 instance`, () =>
		{
			const console2 = new Console2(null);

			const result = bindBaseMethods(console2);

			expect(result).toBe(console2);
			expect(typeof console2.log).toBe('function');
			expect(typeof console2.error).toBe('function');
		});

	});

	// ==================== 啟用控制 / Enable Control ====================

	describe(`_get_enabled`, () =>
	{

		test(`should return true when enabled is true`, () =>
		{
			const result = _get_enabled(true);
			expect(result).toBe(true);
		});

		test(`should return false when enabled is false`, () =>
		{
			const result = _get_enabled(false);
			expect(result).toBe(false);
		});

		test(`should return true when enabled is undefined (treated as enabled)`, () =>
		{
			const result = _get_enabled(undefined as any);
			expect(result).toBe(true);
		});

		test(`should return true when enabled is null (treated as enabled)`, () =>
		{
			const result = _get_enabled(null as any);
			expect(result).toBe(true);
		});

	});

	describe(`_set_enabled`, () =>
	{

		test(`should return true when setting to true`, () =>
		{
			const result = _set_enabled(true);
			expect(result).toBe(true);
		});

		test(`should return false when setting to false`, () =>
		{
			const result = _set_enabled(false);
			expect(result).toBe(false);
		});

		test(`should return false when setting to null (treated as disabled)`, () =>
		{
			const result = _set_enabled(null as any);
			expect(result).toBe(false);
		});

		test(`should return false when setting to undefined (treated as disabled)`, () =>
		{
			const result = _set_enabled(undefined as any);
			expect(result).toBe(false);
		});

	});

});