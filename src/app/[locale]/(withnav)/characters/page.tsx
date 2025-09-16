import CharacterCard from "@/components/pages/characters/character-card";
import { CharactersResponse } from "@/components/features/helpers/interfaces/character-props";
import Counter from "@/components/features/shared/counter/counter";
import { getTranslations } from "next-intl/server";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "Characters - Raume",
//     description: "Characters",
//     robots: {
//         index: false,
//         follow: false,
//     },
//     openGraph: {
//         title: "Characters - Raume",
//         description: "Characters",
//         url: "https://www.raume.com/characters",
//         siteName: "Raume",
//         images: [
//             { url: "/logo.ico" },
//         ],
//     },
//     twitter: {
//         title: "Characters - Raume",
//         description: "Characters",
//     },
//     alternates: {
//         canonical: "https://www.raume.com/characters",
//     },
//     icons: {
//         icon: "/favicon.ico",
//     },
// }

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("metadata.characters");
  const { locale } = await params;
  return {
    title: t("title"),
    description: t("description"),

    alternates: {
      canonical: locale === "en" ? "/characters" : `/${locale}/characters`,
      languages: {
        "en-US": "/en/characters",
        "ru-RU": "/ru/characters",
      },
    },
  };
}

export default async function Characters() {
  const response = await fetch("https://rickandmortyapi.com/api/character/");
  const data: CharactersResponse = await response.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Rick and Morty Characters
        </h1>
        <p className="text-lg text-gray-600">
          Discover all {data.info.count} characters from the Rick and Morty
          universe
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {data.info.next && (
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Showing {data.results.length} of {data.info.count} characters
          </p>
        </div>
      )}
      <Counter counter={10} />
    </div>
  );
}
