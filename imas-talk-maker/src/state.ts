export const localStorageState = <T>(key: string, defaultValue: T): [T, (value: T) => void] => {
	const getValue = window.localStorage.getItem(key);
	return [
		getValue != null ? JSON.parse(getValue) as T : defaultValue,
		(value: T) => {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
	];
}
