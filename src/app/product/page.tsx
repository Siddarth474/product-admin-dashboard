import { Suspense } from "react";
import ProductsContent from "./components/ProductsContent";
import ProductListSkeleton from "./components/ProductListSkeleton";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-zinc-50">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <ProductListSkeleton />
          </div>
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

