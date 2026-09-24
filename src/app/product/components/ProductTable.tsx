import { Product } from "@/services/product.service";
import ProductTableRow from "./ProductTableRow";

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({
  products,
}: ProductTableProps) {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-zinc-300 bg-white shadow-xs md:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-225 border-collapse">
          <thead>
            <tr className="border-b border-zinc-300 bg-zinc-100/70">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Product
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Category
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Price
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Rating
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Stock
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200">
            {products.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}