export default function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-4 w-40 rounded bg-zinc-200" />

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="aspect-square rounded-2xl bg-zinc-200" />
            <div className="space-y-5">
              <div className="h-6 w-24 rounded bg-zinc-200" />
              <div className="h-10 w-3/4 rounded bg-zinc-200" />

              <div className="h-5 w-32 rounded bg-zinc-200" />

              <div className="h-10 w-32 rounded bg-zinc-200" />

              <div className="border-t border-zinc-200 pt-6">
                <div className="h-4 w-28 rounded bg-zinc-200" />

                <div className="mt-3 h-20 w-full rounded bg-zinc-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
