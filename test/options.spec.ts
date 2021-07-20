import { Console2 } from '..';

describe(`describe`, () =>
{

	test(`console2.enabled = void 0`, () =>
	{

		let console2 = new Console2();

		expect(console2.enabled).toStrictEqual(true);

		console2.enabled = void 0;

		expect(console2.enabled).toStrictEqual(false);

		console2.enabled = true;

		expect(console2.enabled).toStrictEqual(true);

		console2.enabled = null;

		expect(console2.enabled).toStrictEqual(false);

		console2.enabled = true;

		expect(console2.enabled).toStrictEqual(true);

		console2.enabled = false;

		expect(console2.enabled).toStrictEqual(false);

	});

})
