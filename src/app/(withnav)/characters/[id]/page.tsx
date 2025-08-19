import Image from "next/image";
import Link from "next/link";
import { Character } from "@/components/helpers/interfaces/character-props";

export default async function CharacterPage({params}: {params: {id: string}}) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
    const character: Character = await response.json();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Alive":
                return "bg-green-500";
            case "Dead":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back button */}
            <Link 
                href="/characters" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Characters
            </Link>

            <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
                <div className="md:flex">
                    {/* Character Image */}
                    <div className="md:w-1/2">
                        <Image
                            src={character.image}
                            alt={character.name}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Character Details */}
                    <div className="md:w-1/2 p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <h1 className="text-3xl font-bold text-gray-900">{character.name}</h1>
                            <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full ${getStatusColor(character.status)}`}></div>
                                <span className="text-lg font-medium text-gray-700">{character.status}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Species</h3>
                                    <p className="text-lg text-gray-900">{character.species}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Gender</h3>
                                    <p className="text-lg text-gray-900">{character.gender}</p>
                                </div>
                            </div>

                            {character.type && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Type</h3>
                                    <p className="text-lg text-gray-900">{character.type}</p>
                                </div>
                            )}

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Origin</h3>
                                <p className="text-lg text-gray-900">{character.origin.name}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Last Known Location</h3>
                                <p className="text-lg text-gray-900">{character.location.name}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Episodes</h3>
                                <p className="text-lg text-gray-900">{character.episode.length} episodes</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Created</h3>
                                <p className="text-lg text-gray-900">{formatDate(character.created)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}