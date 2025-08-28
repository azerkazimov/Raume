import { UserProps } from "@/components/features/helpers/interfaces/user-props";
import Counter from "@/components/features/shared/counter/counter";
import ServiceCard from "@/components/features/shared/service-card";


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
          <ServiceCard key={user.id} user={user} />
        ))}
      </div>
      <div className="flex justify-center">
        <Counter counter={5}/>
      </div>
    </div>
  );
}
