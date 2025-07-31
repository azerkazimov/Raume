import { PostProps } from "@/components/helpers/interfaces/post-props";
import Link from "next/link";

export default async function WorksPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post: PostProps) => (
          <Link key={post.id} href={`/works/${post.id}`}>
            <div className="flex flex-col gap-4 bg-white rounded-lg p-4 border border-gray-200 min-h-[200px] text-center">
              <h2 className="text-lg font-bold min-h-[50px]">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
