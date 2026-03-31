/**
 * 工具函數模組測試
 * Utility functions module tests
 *
 * @module debug-color2/test/util
 */
/// <reference types="node" />
/// <reference types="jest" />

import { Console2 } from '../..';
import { createFnChalkByConsole, chalkByConsoleMaybe, createChalkStyleLog, hasConsoleStream, arrayIncludes } from '../../lib/util';

describe(`Util Module`, () =>
{

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

		test(`should match snapshot for default chalk behavior`, () =>
		{
			const result = chalkByConsoleMaybe();
			expect(result).toMatchSnapshot();
		});

	});

	describe(`createFnChalkByConsole`, () =>
	{

		test(`should create callback function that can access chalk`, () =>
		{
			const console2 = new Console2(null);
			const fn = createFnChalkByConsole(console2);

			const result = fn((chalk, _console) =>
			{
				return chalk.green('test');
			});

			expect(result).toBeDefined();
			expect(typeof result).toBe('string');
		});

		test(`should pass console instance to callback`, () =>
		{
			const console2 = new Console2(null);
			let receivedConsole: Console2 | undefined;

			createFnChalkByConsole(console2)((chalk, _console) =>
			{
				receivedConsole = _console;
				return chalk.bold('test');
			});

			expect(receivedConsole).toBe(console2);
		});

		test(`should match snapshot`, () =>
		{
			const console2 = new Console2(null);
			const fn = createFnChalkByConsole(console2);

			const result = fn((chalk, _console) =>
			{
				return chalk.red('error') + chalk.green('success');
			});

			expect(result).toMatchSnapshot();
		});

	});

	describe(`createChalkStyleLog`, () =>
	{

		test(`should throw error for invalid name`, () =>
		{
			const console2 = new Console2(null);

			expect(() =>
			{
				createChalkStyleLog(console2, '');
			}).toThrow();

			expect(() =>
			{
				createChalkStyleLog(console2, 'log');
			}).toThrow();
		});

	});

	describe(`hasConsoleStream`, () =>
	{

		test(`should return true for Console2`, () =>
		{
			const console2 = new Console2(null);
			expect(hasConsoleStream(console2)).toBe(true);
		});

		test(`should return false for plain object`, () =>
		{
			const obj = { foo: 'bar' };
			expect(hasConsoleStream(obj)).toBe(false);
		});

		test(`should match snapshot for stream detection`, () =>
		{
			const console2 = new Console2(null);
			const result = {
				hasStream: hasConsoleStream(console2),
				hasStdout: !!console2._stdout,
				hasStderr: !!console2._stderr,
			};

			expect(result).toMatchSnapshot();
		});

	});

	describe(`arrayIncludes`, () =>
	{

		test(`should return true when value exists in array`, () =>
		{
			const arr = ['a', 'b', 'c'];
			expect(arrayIncludes(arr, 'b')).toBe(true);
		});

		test(`should return false when value does not exist`, () =>
		{
			const arr = ['a', 'b', 'c'];
			expect(arrayIncludes(arr, 'd')).toBe(false);
		});

		test(`should return true for number in number array`, () =>
		{
			const arr = [1, 2, 3];
			expect(arrayIncludes(arr, 2)).toBe(true);
		});

		test(`should match snapshot`, () =>
		{
			const arr = ['foo', 'bar', 'baz'];
			expect(arrayIncludes(arr, 'bar')).toMatchSnapshot();
			expect(arrayIncludes(arr, 'qux')).toMatchSnapshot();
		});

	});

});
