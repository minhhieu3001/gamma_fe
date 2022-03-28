import { useEffect, useRef } from 'react';

export const setItem = (name, obj) => {
  localStorage.setItem(name, JSON.stringify(obj));
};

export const getItem = (name) => {
  const obj = localStorage.getItem(name);
  if (!obj) return null;
  return JSON.parse(obj);
};

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}
