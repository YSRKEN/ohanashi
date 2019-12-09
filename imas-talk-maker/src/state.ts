import * as React from 'react';

const getValue = <T>(key: string, defaultValue: T): T => {
  const getValue = window.localStorage.getItem(key);
  if (getValue === null) {
    return defaultValue;
  } else {
    return JSON.parse(getValue) as T;
  }
};

export const useLocalStorageState = <T>(
  key: string,
  defaultValue: T
): [T, (val: T) => void] => {
  const [value, setValue] = React.useState<T>(getValue(key, defaultValue));
  return [
    value,
    (val: T) => {
      setValue(val);
      window.localStorage.setItem(key, JSON.stringify(val));
    }
  ];
};
