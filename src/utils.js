import React from "react";

export function getStickyState(defaultValue, key) {
  const stickyValue = window.sessionStorage.getItem(key);

  return stickyValue !== null
    ? JSON.parse(stickyValue)
    : defaultValue;
}

export function setStickyState(value, key) {
  window.sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSuperStickyState(defaultValue, key) {
  const stickyValue = window.localStorage.getItem(key);

  return stickyValue !== null
    ? JSON.parse(stickyValue)
    : defaultValue;
}

export function setSuperStickyState(value, key) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    return getStickyState(defaultValue, key);
  });

  React.useEffect(() => {
    setStickyState(value, key);
  }, [key, value]);

  return [value, setValue];
}

export function useSuperStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    return getSuperStickyState(defaultValue, key);
  });

  React.useEffect(() => {
    setSuperStickyState(value, key);
  }, [key, value]);

  return [value, setValue];
}
