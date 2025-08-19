import { UserProps } from "@/components/helpers/interfaces/user-props";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function Service() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`data not fetched`);
  }

  const data = await response.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Team
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((user: UserProps) => (
          <div
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
            key={user.id}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16  rounded-full flex items-center justify-center mb-4 text-gray-500 border border-gray-200 text-2xl font-bold shadow-md">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {user.name}
              </h2>
              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {user.email}
              </span>
            </div>
            <div className="w-full flex justify-center">
              <Link href={`/service/${user.id}`}>
                <Button className="cursor-pointer mt-4 bg-gray-500 hover:bg-gray-800">View</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
