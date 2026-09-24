import { ProductReview } from "@/services/product.service";

interface ProductReviewsProps {
  reviews: ProductReview[];
}

function formatReviewDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <section className="mt-12 border-t border-zinc-300 pt-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
            Customer reviews
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Feedback from customers who purchased this product.
          </p>
        </div>

        <span className="text-sm text-zinc-500">{reviews.length} reviews</span>
      </div>

      {reviews.length === 0 ? (
        <div className="mt-6 rounded-xl border border-zinc-300 bg-white p-8 text-center shadow-xs">
          <p className="text-sm text-zinc-500">
            No reviews available for this product.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {reviews.map((review, index) => (
            <article
              key={`${review.reviewerEmail}-${index}`}
              className="rounded-xl border border-zinc-300 bg-white p-5 shadow-xs"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {review.reviewerName}
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-400">
                    {formatReviewDate(review.date)}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>

                  <span className="text-sm font-medium text-zinc-700">
                    {review.rating}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-600">
                {review.comment}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
