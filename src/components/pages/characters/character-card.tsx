import Image from "next/image";
import Link from "next/link";
import { Character } from "@/components/helpers/interfaces/character-props";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
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

  return (
    <Link 
      href={`/characters/${character.id}`}
      className="block group hover:scale-105 transition-transform duration-300"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(character.status)}`}></div>
            <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
              {character.status}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {character.name}
          </h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="font-medium">Species:</span>
              <span>{character.species}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">Gender:</span>
              <span>{character.gender}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">Origin:</span>
              <span className="truncate ml-2" title={character.origin.name}>
                {character.origin.name}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">Location:</span>
              <span className="truncate ml-2" title={character.location.name}>
                {character.location.name}
              </span>
            </div>
            
            <div className="pt-2 border-t">
              <span className="text-xs text-gray-500">
                Episodes: {character.episode.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
