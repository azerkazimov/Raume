import { ReviewSchema } from "../../(withoutnav)/dashboard/reviews/schema";

export default async function ReviewsPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`);
  const reviews = await response.json();
  return (
    <div className="container mx-auto h-screen">
      <h1 className="text-2xl font-bold my-12 text-center">Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review: ReviewSchema) => (
          <div
            key={review.content}
            className="p-4 border rounded-md border-gray-200 pb-4 flex flex-col gap-2 items-center justify-center"
          >
            <h1>{review.content}</h1>
            <p>{review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
