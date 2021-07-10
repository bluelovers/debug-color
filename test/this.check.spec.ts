import { console, Console2 } from '../index';

describe(`describe`, () =>
{
	console.enabledColor = true;

	test(`color._logArgv`, () =>
	{
		let argv = [{
			data: {
				a: 777,
			}
		}];

		let m = console.magenta;

		// @ts-ignore
		let actual = m._logArgv(argv);
		// @ts-ignore
		let expected = console.magenta._logArgv(argv)

		expect(actual).toStrictEqual(expected);
		//expect(actual).toBeInstanceOf(Date);
		expect(actual).toMatchSnapshot();

	});

	test(`console._logArgv`, () =>
	{
		let argv = [{
			data: {
				a: 777,
			}
		}];

		let m = console;

		// @ts-ignore
		let actual = m._logArgv(argv);
		// @ts-ignore
		let expected = console._logArgv(argv)

		// @ts-ignore
		let actual2 = m.magenta._logArgv(argv);

		expect(actual).toStrictEqual(expected);
		// @ts-ignore
		expect(actual2).not.toStrictEqual(expected);

		expect(actual).toMatchSnapshot();
		expect(actual2).toMatchSnapshot();

	});

	test(`log`, () =>
	{
		let m = console.magenta;
		let log = m.log;

		expect(() => log(__filename)).not.toThrow()

		expect(() => log(111)).not.toThrow()

		log = console.log;

		expect(() => log(222)).not.toThrow()

		expect(() => console.log.call(m, 333)).not.toThrow()

		expect(() => Console2.prototype.log.call(m.green, 444)).not.toThrow()

		expect(() => log.call(console, 555)).not.toThrow()

		expect(() => console.magenta.log.call(console, 666)).not.toThrow()

	});

	test(`Promise log`, () =>
	{
		let m = console.magenta;
		let log = m.log;

		expect(Promise.resolve(999).then(log)).resolves.not.toThrow()

	});

})
