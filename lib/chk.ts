
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
