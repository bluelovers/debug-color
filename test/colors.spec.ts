import { styleNames, styleNamesFn, IStylesNameWithoutFn, styleNamesWithoutFn } from '../lib/styles';
import { console, Console2 } from '..';
import { Console } from 'console';
import { SYM_CONSOLE, SYM_CHALK, SYM_DATA } from '../lib/val';

describe(`styleNamesWithoutFn`, () =>
{

	styleNamesWithoutFn
		.forEach((color) =>
		{
			test(color, () =>
			{

				let actual = console[color];

				expect(typeof actual).toMatchSnapshot();

				const data = {
					[SYM_CHALK]: actual[SYM_CHALK],
					[SYM_DATA]: actual[SYM_DATA],
				}

				expect(actual[SYM_CONSOLE]).toBeInstanceOf(Console);

				expect(actual.log).toBeInstanceOf(Function);
				expect(actual.dir).toBeInstanceOf(Function);
				expect(actual.error).toBeInstanceOf(Function);
				expect(actual.warn).toBeInstanceOf(Function);
				expect(actual.time).toBeInstanceOf(Function);
				expect(actual.timeEnd).toBeInstanceOf(Function);
				expect(actual.debug).toBeInstanceOf(Function);

				expect(data).toMatchSnapshot();

			});
		})
	;

})
