/**
 * Created by user on 2018/7/2/002.
 */

export function isNodeJs()
{
	try
	{
		require('console');

		// @ts-ignore
		if (console._stdout && console._stderr)
		{
			return true
		}
	}
	catch (e)
	{

	}

	return false
}

export default isNodeJs
