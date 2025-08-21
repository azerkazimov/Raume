import { materials } from "@/components/features/data/materials"
import { NextResponse } from "next/server"

export async function GET(req: Request, {params}: {params: {href: string}}){
    const {href} = params

    const item = materials.find(item => item.href === `/products/${href}`)

    return NextResponse.json(item)
}