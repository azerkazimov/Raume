import { getTranslations } from "next-intl/server";
import SignIn from "./signin";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Sign In - Raume",
//   description: "Sign In",
// }

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations("metadata.auth.signin");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "en" ? "/auth/signin" : `/${locale}/auth/signin`,
      languages: {
        "en-US": "/en/auth/signin",
        "ru-RU": "/ru/auth/signin",
      },
    },
  };
}

export default async function SignInPage() {
  return <SignIn />;
}
