import { getTranslations } from "next-intl/server";
import SignUp from "./signup";

export async function generateMetadata({params}: {params: {locale: string}}) {
  const {locale} = await params;
  const t = await getTranslations("metadata.auth.signup");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "en" ? "/auth/signup" : `/${locale}/auth/signup`,
      languages: {
        "en-US": "/en/auth/signup",
        "ru-RU": "/ru/auth/signup",
      },
    },
  }
}


export default function SignUpPage() {
  return (
    <div>
      <SignUp />
    </div>
  )
}
