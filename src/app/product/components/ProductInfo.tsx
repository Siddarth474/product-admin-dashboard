import { Product } from "@/services/product.service";
import { formatPriceInINR } from "@/utils/currencyConvertor";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const stockStatus =
    product.stock === 0
      ? "Out of stock"
      : product.stock <= 10
        ? `${product.stock} left in stock`
        : "In stock";

  const stockColor =
    product.stock === 0
      ? "text-red-600"
      : product.stock <= 10
        ? "text-amber-600"
        : "text-emerald-600";

  return (
    <div className="flex flex-col">
      <div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium capitalize text-zinc-600">
          {product.category}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        {product.title}
      </h1>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-lg text-yellow-500">★</span>

          <span className="font-medium text-zinc-900">
            {product.rating.toFixed(1)}
          </span>
        </div>

        <span className="text-sm text-zinc-400">•</span>

        <span className="text-sm text-zinc-500">
          {product.reviews.length} reviews
        </span>
      </div>

      <div className="mt-6">
        <span className="text-3xl font-semibold tracking-tight text-zinc-950">
          {formatPriceInINR(product.price)}
        </span>
      </div>

      <div className="mt-8 border-t border-zinc-200 pt-6">
        <h2 className="text-sm font-semibold text-zinc-950">Description</h2>

        <p className="mt-3 text-sm leading-7 text-zinc-600">
          {product.description}
        </p>
      </div>
      
      <div className="mt-6 flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4">
        <div>
          <p className="text-sm font-medium text-zinc-900">Availability</p>

          <p className={`mt-1 text-sm font-medium ${stockColor}`}>
            {stockStatus}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500">Product ID</p>

          <p className="mt-1 text-sm font-medium text-zinc-700">
            #{product.id}
          </p>
        </div>
      </div>
    </div>
  );
}
