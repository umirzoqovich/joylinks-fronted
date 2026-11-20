'use client';

import { useEffect, useState } from 'react';

/** Qiymatni kechiktirib qaytaradi (qidiruvda har bir harfda so'rov yubormaslik uchun) */
export function useDebouncedValue<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
