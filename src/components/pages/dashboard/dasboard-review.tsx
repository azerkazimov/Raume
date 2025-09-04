"use client";

import { ReviewSchema } from "@/app/[locale]/(withoutnav)/dashboard/reviews/schema";
import { useEffect, useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewSchema[]>([]);
  
  const fetchReview = async () => {
    const res = await fetch("/api/reviews");
    const reviews = await res.json();
    setReviews(reviews);
  };
  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <div className="mt-12">
      {reviews.map((review: ReviewSchema) => (
        <div key={review.content} className="border-b border-gray-200 pb-4">
          <h3>{review.content}</h3>
          <p>{review.rating}</p>
        </div>
      ))}
    </div>
  );
}
