export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-3 w-20 rounded-full bg-slate-800" />
        <div className="h-3 w-16 rounded-full bg-slate-800" />
      </div>
      <div className="mb-3 h-5 w-3/4 rounded-full bg-slate-800" />
      <div className="mb-2 h-5 w-2/3 rounded-full bg-slate-800" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded-full bg-slate-800" />
        <div className="h-3 w-5/6 rounded-full bg-slate-800" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="h-8 w-24 rounded-lg bg-slate-800" />
        <div className="h-4 w-16 rounded-full bg-slate-800" />
      </div>
    </div>
  );
}
