import { useCallback, useRef } from 'react';

export function useDebounce(fn, delay) {
  const id = useRef(null);
  const debounceFn = useCallback((...args) => {
    clearTimeout(id.current);
    id.current = setTimeout(() => {
      fn(...args);
    }, delay);
  });
  return debounceFn;
}
