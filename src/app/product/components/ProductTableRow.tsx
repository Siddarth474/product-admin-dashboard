import Image from "next/image";
import { Product } from "@/services/product.service";

interface ProductTableRowProps {
  product: Product;
}

export default function ProductTableRow({ product }: ProductTableRowProps) {
  return (
    <tr className="group transition-colors hover:bg-zinc-50">
      {/* Product */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium text-zinc-900">
              {product.title}
            </p>

            <p className="mt-1 text-xs text-zinc-500">ID #{product.id}</p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-4">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium capitalize text-zinc-700">
          {product.category}
        </span>
      </td>

      {/* Price */}
      <td className="px-6 py-4">
        <span className="font-medium text-zinc-900">
          ${product.price.toFixed(2)}
        </span>
      </td>

      {/* Rating */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5">
          <span className="text-yellow-500">★</span>

          <span className="text-sm font-medium text-zinc-700">
            {product.rating.toFixed(1)}
          </span>
        </div>
      </td>

      {/* Stock */}
      <td className="px-6 py-4">
        <StockBadge stock={product.stock} />
      </td>
    </tr>
  );
}

function StockBadge({ stock }: { stock: number }) {
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 10;

  if (isOutOfStock) {
    return (
      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
        Out of stock
      </span>
    );
  }

  if (isLowStock) {
    return (
      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
        {stock} left
      </span>
    );
  }

  return (
    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
      {stock} in stock
    </span>
  );
}
