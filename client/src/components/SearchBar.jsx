import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce.js';

export default function SearchBar({ defaultValue = '', onSearch }) {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    onSearch?.(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  return (
    <label className="relative flex-1 max-w-xl" htmlFor="search-posts">
      <span className="sr-only">Tìm kiếm bài viết</span>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
      <input
        id="search-posts"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Tìm bài viết, từ khoá..."
        className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
      />
    </label>
  );
}
