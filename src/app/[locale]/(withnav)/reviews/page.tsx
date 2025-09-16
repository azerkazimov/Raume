import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ReviewIdSchema } from "../../(withoutnav)/dashboard/reviews/schema";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Reviews - Raume",
//   description: "Reviews",
// }

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("metadata.reviews");
  const { locale } = await params;
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "en" ? "/reviews" : `/${locale}/reviews`,
      languages: {
        "en-US": "/en/reviews",
        "ru-RU": "/ru/reviews",
      },
    },
  };
}

export default async function ReviewsPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`);
  const reviews = await response.json();
  const t = await getTranslations("ReviewsPage");

  return (
    <div className="container mx-auto h-screen">
      <h1 className="text-2xl font-bold my-12 text-center">Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review: ReviewIdSchema) => (
          <Link href={`/reviews/${review.id}`} key={review.id}>
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-gray-100 hover:scale-101">
              <CardHeader className="flex flex-col gap-4">
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {t("title")} #{review.id}
                  </span>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>{review.rating}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground line-clamp-3 flex justify-between items-center">
                <p>{review.content}</p>
                <Button className="cursor-pointer">{t("view")}</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
        ›
      </div>
    </div>
  );
}
