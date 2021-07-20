import Console2 from '../node';

export function _get_enabled(enabled: boolean): enabled is true
{
	return enabled !== false
}

export function _set_enabled(enabled: boolean): enabled is true
{
	return (enabled ?? false) !== false
}
