import Image from "next/image";
import { Product } from "@/services/product.service";

interface ProductMobileCardProps {
  product: Product;
}

export default function ProductMobileCard({ product }: ProductMobileCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        {/* Main information */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 className="line-clamp-2 text-sm font-semibold text-zinc-900">
              {product.title}
            </h2>

            <span className="shrink-0 text-sm font-semibold text-zinc-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="mt-1 text-xs capitalize text-zinc-500">
            {product.category}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs text-zinc-600">
              <span className="text-yellow-500">★</span>{" "}
              {product.rating.toFixed(1)}
            </span>

            <StockBadge stock={product.stock} />
          </div>
        </div>
      </div>
    </article>
  );
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span className="text-xs font-medium text-red-600">Out of stock</span>
    );
  }

  if (stock <= 10) {
    return (
      <span className="text-xs font-medium text-amber-600">{stock} left</span>
    );
  }

  return (
    <span className="text-xs font-medium text-emerald-600">
      {stock} in stock
    </span>
  );
}
