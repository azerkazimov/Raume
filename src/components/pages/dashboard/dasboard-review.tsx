"use client";

import { ReviewIdSchema } from "@/app/[locale]/(withoutnav)/dashboard/reviews/schema";
import { Button } from "@/components/ui/button";

interface ReviewsProps {
  reviews: ReviewIdSchema[];
  editReview: (review: ReviewIdSchema) => void;
  deleteReview: (id: string) => void;
}

export default function Reviews({
  reviews,
  editReview,
  deleteReview,
}: ReviewsProps) {
  return (
    <div className="mt-12">
      {reviews.map((review: ReviewIdSchema) => (
        <div key={review.id} className="border-b border-gray-200 pb-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h3>{review.content}</h3>
              <p>{review.rating}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => editReview(review)}>Edit</Button>
              <Button onClick={() => deleteReview(review.id.toString())}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}