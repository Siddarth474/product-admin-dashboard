import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-xl font-semibold text-zinc-400">
          ?
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-950">
          Product not found
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">
          The product you're looking for doesn't exist or may have been removed.
        </p>

        <Link
          href="/product"
          className="mt-6 inline-flex h-10 items-center rounded-lg bg-black px-5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Back to products
        </Link>
      </div>
    </main>
  );
}
