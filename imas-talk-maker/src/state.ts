import * as React from 'react';

export const localStorageState = <T>(key: string, defaultValue: T): [T, (val: T) => void] => {
	const getValue = window.localStorage.getItem(key);
	const [value, setValue] = React.useState<T>(getValue == null ? defaultValue : JSON.parse(getValue) as T);
	return [
		value,
		(val: T) => {
			setValue(val);
			window.localStorage.setItem(key, JSON.stringify(val));
		}
	];
}
