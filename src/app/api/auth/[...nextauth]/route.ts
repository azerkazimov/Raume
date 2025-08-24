import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import type { Session } from "next-auth"
import type { JWT } from "next-auth/jwt"
import bcrypt from "bcryptjs"
import { prisma } from "../../../../../prisma/prisma-client";
import { AuthProps } from "@/components/features/helpers/interfaces/auth-props";

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            image?: string | null
        }
    }
}

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Missing email or password");
                    }

                    const user = await prisma.user.findUnique({
                        where: {email: credentials.email}
                    })
                    if(!user){
                        throw new Error("User not found");
                    }

                    const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
                    if(!passwordsMatch){
                        throw new Error("Invalid password");
                    }

                    return {
                        id: String(user.id),
                        name: user.name,
                        email: user.email,
                    };
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt" as const
    },
    callbacks: {
        async session({ session, token }: { session: Session, token: JWT }) {
            session.user.id = token.sub as string
            return session
        },
        async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async profile(profile: AuthProps) {
            if(!profile.email) return null;

            const user = await prisma.user.findUnique({
                where: {email: profile.email}
            })

            await prisma.user.upsert({
                where: {email: profile.email},
                update: {
                    name: profile.name || "",
                    email: profile.email,
                    password: profile.password || "",
                },
                create: {
                    name: profile.name || "",
                    email: profile.email,
                    password: profile.password || "",
                }
            })

            return user
        }
    },
    pages: {
        signIn: "/auth/signin",
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }