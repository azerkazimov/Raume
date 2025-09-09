import { ReviewIdSchema } from "@/app/[locale]/(withoutnav)/dashboard/reviews/schema";

export const fetcher = async (url: string): Promise<ReviewIdSchema> => {
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Review not found");
        }
        throw new Error("Failed to fetch data");
    }

    return response.json();
}