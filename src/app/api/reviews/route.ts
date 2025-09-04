import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
    const reviews = await prisma.review.findMany();
    return NextResponse.json(reviews);
}

export async function POST(req: Request) {
    try {
        const { content, rating } = await req.json();

        const review = await prisma.review.create({
            data: { 
                content, 
                rating 
            }
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json(
            { error: "Failed to create review" },
            { status: 500 }
        );
    }
}
