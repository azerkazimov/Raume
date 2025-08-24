import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import bcrypt from "bcryptjs";

export async function GET (){
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}

export async function POST (request: NextRequest){
    try {
        const body = await request.json();
        const { name, email, password } = body;

        const existingUser = await prisma.user.findUnique({
            where: {email}
        })

        if(existingUser){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await prisma.user.create({
            data:{
                name: name,
                email: email,
                password: hashedPassword
            }
        })

        return NextResponse.json({message: "User created successfully", user}, {status: 201})

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error" + error}, {status: 500})
    }
}