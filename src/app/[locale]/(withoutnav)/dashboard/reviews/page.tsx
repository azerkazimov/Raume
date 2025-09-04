"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { reviewSchema, ReviewSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Reviews from "@/components/pages/dashboard/dasboard-review";

export default function DashboardReviewsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = async (data: ReviewSchema) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const review = await response.json();
        console.log("Review created:", review);
        reset();
      } else {
        console.error("Failed to create review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-12">Reviews</h1>
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

        <Button type="submit" className="w-full cursor-pointer">
          {"Submit"}
        </Button>
      </form>

      <Reviews />
    </div>
  );
}
