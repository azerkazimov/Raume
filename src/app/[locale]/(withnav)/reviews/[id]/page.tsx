"use client";
import { ReviewIdSchema } from "@/app/[locale]/(withoutnav)/dashboard/reviews/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon, StarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function ReviewIdPage() {
  const { id } = useParams();
  const router = useRouter();
  const [review, setReview] = useState<ReviewIdSchema | null>(null);

  const t = useTranslations("ReviewsPage");

  // fetch review by id ... Your code here
  useEffect(() => {
    const fetchReview = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${id}`
        );
        const data = await response.json();
        setReview(data);
      } catch (error) {
        console.error("Error fetching review", error);
      }
    };

    fetchReview();
  }, [id]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex mb-8">
        <Button onClick={() => router.back()}>
          <ArrowLeftIcon />
          {t("back")}
        </Button>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {t("title")} #{review?.id}
            </span>
            <div className="flex items-center gap-1">
              <StarIcon className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-semibold">{review?.rating}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-md text-muted-foreground font-semibold">
                {t("content")}
              </h3>
              <p className="text-sm text-muted-foreground">{review?.content}</p>
            </div>

            <div className="flex justify-between">
              {review?.createdAt && (
                <div>
                  <h3 className="text-xs text-muted-foreground font-semibold">
                    {t("createdAt")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {review?.createdAt}
                  </p>
                </div>
              )}

              {review?.updatedAt && (
                <div>
                  <h3 className="text-xs text-muted-foreground font-semibold">
                    {t("updatedAt")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {review?.updatedAt}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
