import clsx from 'clsx';

export default function Pagination({ page, total, limit, onChange }) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((pageNumber) => {
    if (totalPages <= 7) return true;
    if (pageNumber === 1 || pageNumber === totalPages) return true;
    if (Math.abs(pageNumber - page) <= 1) return true;
    return false;
  });

  const uniquePages = [...new Set(pages)].sort((a, b) => a - b);

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-lg border border-slate-700 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        Trước
      </button>
      {uniquePages.map((pageNumber, index) => {
        const isCurrent = pageNumber === page;
        const prevPage = uniquePages[index - 1];
        const showEllipsis = prevPage && pageNumber - prevPage > 1;
        return (
          <div key={pageNumber} className="flex items-center">
            {showEllipsis && <span className="px-2 text-sm text-slate-500">…</span>}
            <button
              type="button"
              onClick={() => onChange(pageNumber)}
              className={clsx(
                'rounded-lg px-3 py-1 text-sm',
                isCurrent ? 'bg-sky-500 text-slate-900' : 'border border-slate-700'
              )}
            >
              {pageNumber}
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-lg border border-slate-700 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        Sau
      </button>
    </nav>
  );
}
