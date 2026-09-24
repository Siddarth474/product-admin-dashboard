"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/services/product.service";
import { formatPriceInINR } from "@/utils/currencyConvertor";
import { Pencil, Trash2 } from "lucide-react";

interface ProductTableRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
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

export default function ProductTableRow({
  product,
  onEdit,
  onDelete,
}: ProductTableRowProps) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <tr
      onClick={handleRowClick}
      className="group cursor-pointer transition-colors hover:bg-zinc-100/70"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-zinc-300 bg-zinc-100">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>

          <span className="truncate font-medium text-zinc-900 transition group-hover:text-zinc-600">
            {product.title}
          </span>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="rounded-full border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-medium capitalize text-zinc-700">
          {product.category}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="font-medium text-zinc-900">
          {formatPriceInINR(product.price)}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5">
          <span className="text-yellow-500">★</span>

          <span className="text-sm font-medium text-zinc-700">
            {product.rating.toFixed(1)}
          </span>
        </div>
      </td>

      <td className="px-6 py-4">
        <StockBadge stock={product.stock} />
      </td>

      <td className="px-6 py-4 text-right">
        <div
          className="flex items-center justify-end gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => onEdit(product)}
            title="Edit product"
            aria-label={`Edit ${product.title}`}
            className="rounded-lg border border-zinc-200 bg-white p-2 text-zinc-600 shadow-2xs transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(product)}
            title="Delete product"
            aria-label={`Delete ${product.title}`}
            className="rounded-lg border border-zinc-200 bg-white p-2 text-red-600 shadow-2xs transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
