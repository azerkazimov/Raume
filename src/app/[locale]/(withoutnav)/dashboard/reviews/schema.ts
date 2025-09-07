import { z } from "zod";

export const reviewSchema = z.object({
    content: z.string().min(1, { message: "Content is required" }),
    rating: z.string().min(1, { message: "Rating is required" }),
});

export const reviewIdSchema = reviewSchema.extend({
    id: z.number().min(1, { message: "ID is required" }),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
export type ReviewIdSchema = z.infer<typeof reviewIdSchema>;