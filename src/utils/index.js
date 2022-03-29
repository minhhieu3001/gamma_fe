import { useEffect, useRef } from 'react';
import { uniqueId, concat } from 'lodash';

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

export const transformTree = (list = []) => {
  var res = [];
  list.map((pjItem) => {
    const item = concat(
      pjItem.models.map((model) => ({
        ...model,
        path: pjItem.name + '/models/' + model.filename,
      })),
      pjItem.includes.map((include) => ({
        ...include,
        path: pjItem.name + '/includes/' + include.filename,
      })),
    );
    res = concat(res, item);
  });
  return res;
};
