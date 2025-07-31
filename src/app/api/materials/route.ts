import { materials } from "@/components/data/materials";
import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json(materials)
}