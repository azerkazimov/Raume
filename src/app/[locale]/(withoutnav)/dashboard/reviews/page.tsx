"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import Reviews from "@/components/pages/dashboard/dasboard-review";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewIdSchema, reviewSchema, ReviewSchema } from "./schema";
import { useEffect, useState } from "react";

export default function DashboardReviewsPage() {
  const [reviews, setReviews] = useState<ReviewIdSchema[]>([]);
  const [editingReview, setEditingReview] = useState<ReviewIdSchema | null>(
    null
  );
  
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await fetch("/api/reviews");
    const reviews = await response.json();
    setReviews(reviews);
  };

  const onSubmit = async (data: ReviewSchema) => {
    try {
      const method = editingReview ? "PUT" : "POST";
      const url = editingReview
        ? `/api/reviews/${editingReview.id}`
        : "/api/reviews";
      const body = data;

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // refresh review list
        await fetchReviews();
        setEditingReview(null);
        reset({
          content: "",
          rating: "",
        });
      } else {
        console.error("Failed to create review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setReviews(reviews.filter((review) => review.id !== Number(id)));
      } else {
        const errorData = await response.json();
        console.error("Failed to delete review", errorData);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const editReview = (review: ReviewIdSchema) => {
    setEditingReview(review);
    setValue("content", review.content);
    setValue("rating", review.rating);
    reset(review);
  };

  const cancelEdit = () => {
    setEditingReview(null);
    reset({
      content: "",
      rating: "",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-12">Dashboard Reviews</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="content">Content</label>
          <Input type="text" id="content" {...register("content")} />
          {errors.content && (
            <span className="text-red-500">{errors.content.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <Input type="string" id="rating" {...register("rating")} />
          {errors.rating && (
            <span className="text-red-500">{errors.rating.message}</span>
          )}
        </div>

        <div className="flex gap-2">
          <Button type="submit" className=" cursor-pointer">
            {editingReview ? "Update" : "Submit"}
          </Button>
          {editingReview && (
            <Button
              type="button"
              className=" cursor-pointer"
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <Reviews
        reviews={reviews}
        editReview={editReview}
        deleteReview={deleteReview}
      />
    </div>
  );
}
