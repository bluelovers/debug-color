
export function processPlatform()
{
	if (typeof process !== 'undefined')
	{
		return process.platform
	}
}
