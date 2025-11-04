import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'oldest', label: 'Cũ nhất' },
  { value: 'likes_desc', label: 'Nhiều like nhất' },
  { value: 'likes_asc', label: 'Ít like nhất' },
];

export default function Filters({ categories = [], selectedCategory, onCategoryChange, sort, onSortChange }) {
  const categoryOptions = [{ value: '', label: 'Tất cả danh mục' }, ...categories.map((cat) => ({ value: cat, label: cat }))];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Listbox value={selectedCategory ?? ''} onChange={onCategoryChange}>
        <div className="relative w-full min-w-[220px] sm:w-56">
          <Listbox.Button className="flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm">
            <span>{categoryOptions.find((opt) => opt.value === (selectedCategory ?? ''))?.label}</span>
            <ChevronUpDownIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-700 bg-slate-900 text-sm shadow-lg focus:outline-none">
            {categoryOptions.map((option) => (
              <Listbox.Option
                key={option.value || 'all'}
                value={option.value}
                className={({ active, selected }) =>
                  clsx(
                    'cursor-pointer px-4 py-2',
                    active ? 'bg-slate-800 text-sky-200' : 'text-slate-200',
                    selected && 'bg-slate-800'
                  )
                }
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      <Listbox value={sort} onChange={onSortChange}>
        <div className="relative w-full min-w-[220px] sm:w-48">
          <Listbox.Button className="flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm">
            <span>{SORT_OPTIONS.find((option) => option.value === sort)?.label}</span>
            <ChevronUpDownIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-700 bg-slate-900 text-sm shadow-lg focus:outline-none">
            {SORT_OPTIONS.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active, selected }) =>
                  clsx(
                    'cursor-pointer px-4 py-2',
                    active ? 'bg-slate-800 text-sky-200' : 'text-slate-200',
                    selected && 'bg-slate-800'
                  )
                }
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
