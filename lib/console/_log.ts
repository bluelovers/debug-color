import Console2 from '../node';
import { SYM_CONSOLE } from '../val';
import { _logArgv } from './_logArgv';
import { _get_enabled } from './_get_enabled';

export function _log(this: Console2, name: string, argv: any[], failBack = 'log')
{
	if (_get_enabled(this.enabled))
	{
		let data = (this._logArgv ?? _logArgv).call(this, argv, name, failBack);

		return this[SYM_CONSOLE][data.name](...data.arr);
	}
}
