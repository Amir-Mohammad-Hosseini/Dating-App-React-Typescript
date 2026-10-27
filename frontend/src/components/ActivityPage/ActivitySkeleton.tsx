export default function ActivitySkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul
      role="status"
      aria-label="Loading"
      className="grid grid-cols-1 gap-3 lg:grid-cols-2"
    >
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="flex animate-pulse items-center gap-3 rounded-2xl border border-white/5 bg-[#2E2F34] p-3 sm:gap-4 sm:p-4"
        >
          <div className="size-14 shrink-0 rounded-full bg-white/10" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 rounded-full bg-white/10" />
            <div className="h-3 w-44 max-w-full rounded-full bg-white/5" />
          </div>
          <div className="h-9 w-20 shrink-0 rounded-full bg-white/10" />
        </li>
      ))}
    </ul>
  );
}
