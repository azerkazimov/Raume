export default async function UserPage({params}: {params: {id: string}}) {
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
    const data = await response.json();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                {data.name}
            </h1>
            <p className="text-gray-600 text-center">
                {data.email}
            </p>
            <p className="text-gray-600 text-center">
                {data.phone}
            </p>
            <p className="text-gray-600 text-center">
                {data.website}
            </p>
            <p className="text-gray-600 text-center">
                {data.company.name}
            </p>
        </div>
    );
}