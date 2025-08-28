import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authPages = ["/auth/signin", "/auth/signup"];
const protectedPages = ["/dashboard"];

export async function middleware(req: NextRequest){

  const pathname = req.nextUrl.pathname;

  const isAuthPage = authPages.some(page => pathname.startsWith(page));

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if(session?.email) {
    if(isAuthPage){
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if(protectedPages.some(page => pathname.startsWith(page)) && !session?.email) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();

}