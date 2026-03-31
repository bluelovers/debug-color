/**
 * 樣式模組測試
 * Styles module tests
 *
 * @module debug-color2/test/styles
 */
/// <reference types="node" />
/// <reference types="jest" />

import chalk from 'chalk';
import { getStyleNamesByChalk, styleNames, styleNamesFn, styleNamesWithoutFn } from '../../lib/styles';

describe(`Styles Module`, () =>
{

	describe(`getStyleNamesByChalk`, () =>
	{

		test(`should return style names from Chalk instance`, () =>
		{
			const result = getStyleNamesByChalk(chalk);
			expect(result).toMatchSnapshot();
		});

		test(`should return array containing common styles`, () =>
		{
			const result = getStyleNamesByChalk(chalk);
			expect(result).toContain('bold');
			expect(result).toContain('italic');
			expect(result).toContain('red');
			expect(result).toContain('green');
		});

	});

	describe(`styleNames`, () =>
	{

		test(`should match snapshot`, () =>
		{
			expect(styleNames).toMatchSnapshot();
		});

		test(`should be non-empty array`, () =>
		{
			expect(Array.isArray(styleNames)).toBe(true);
			expect(styleNames.length).toBeGreaterThan(0);
		});

	});

	describe(`styleNamesFn`, () =>
	{

		test(`should match snapshot`, () =>
		{
			expect(styleNamesFn).toMatchSnapshot();
		});

		test(`should contain function-type styles`, () =>
		{
			expect(styleNamesFn).toContain('rgb');
			expect(styleNamesFn).toContain('hsl');
			expect(styleNamesFn).toContain('hex');
		});

	});

	describe(`styleNamesWithoutFn`, () =>
	{

		test(`should match snapshot`, () =>
		{
			expect(styleNamesWithoutFn).toMatchSnapshot();
		});

		test(`should not contain function-type styles`, () =>
		{
			expect(styleNamesWithoutFn).not.toContain('rgb');
			expect(styleNamesWithoutFn).not.toContain('hex');
		});

		test(`should contain non-function styles`, () =>
		{
			expect(styleNamesWithoutFn).toContain('bold');
			expect(styleNamesWithoutFn).toContain('italic');
		});

	});

});
