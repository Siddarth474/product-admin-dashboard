import Image from "next/image";
import { Product } from "@/services/product.service";
import Link from "next/link";
import { formatPriceInINR } from "@/utils/currencyConvertor";
import { Pencil, Trash2 } from "lucide-react";

interface ProductMobileCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
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

export default function ProductMobileCard({
  product,
  onEdit,
  onDelete,
}: ProductMobileCardProps) {
  return (
    <article className="rounded-xl border border-zinc-300 bg-white p-4 shadow-xs">
      <div className="flex gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-zinc-300 bg-zinc-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <Link
              href={`/product/${product.id}`}
              className="line-clamp-2 text-sm font-semibold text-zinc-900 transition hover:text-zinc-500"
            >
              {product.title}
            </Link>

            <span className="shrink-0 text-sm font-semibold text-zinc-900">
              {formatPriceInINR(product.price)}
            </span>
          </div>

          <p className="mt-1 text-xs capitalize text-zinc-500">
            {product.category}
          </p>

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-zinc-100 pt-2.5">
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-600">
                <span className="text-yellow-500">★</span>{" "}
                {product.rating.toFixed(1)}
              </span>

              <StockBadge stock={product.stock} />
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onEdit(product)}
                title="Edit product"
                aria-label={`Edit ${product.title}`}
                className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-600 shadow-2xs transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onDelete(product)}
                title="Delete product"
                aria-label={`Delete ${product.title}`}
                className="rounded-lg border border-zinc-200 bg-white p-1.5 text-red-600 shadow-2xs transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
