
export function isNodeJs()
{
	try
	{
		if (
			typeof process !== 'undefined' && 
			process.release.name.search(/node|io.js/) !== -1
		) {
			return true;
      }
		return false;
	}
	catch (e)
	{

	}
}

export default isNodeJs
