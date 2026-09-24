export default function ProductListSkeleton() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-zinc-300 bg-white shadow-xs md:block">
        <div className="divide-y divide-zinc-200">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse items-center gap-6 px-6 py-4"
            >
              <div className="h-12 w-12 rounded-lg bg-zinc-200" />

              <div className="h-4 w-48 rounded bg-zinc-200" />

              <div className="ml-auto h-4 w-20 rounded bg-zinc-200" />

              <div className="h-4 w-16 rounded bg-zinc-200" />

              <div className="h-4 w-20 rounded bg-zinc-200" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex animate-pulse gap-4 rounded-xl border border-zinc-300 bg-white p-4 shadow-xs"
          >
            <div className="h-20 w-20 shrink-0 rounded-lg bg-zinc-200" />

            <div className="flex-1 space-y-3">
              <div className="h-4 w-3/4 rounded bg-zinc-200" />
              <div className="h-3 w-1/2 rounded bg-zinc-200" />
              <div className="h-3 w-1/3 rounded bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
