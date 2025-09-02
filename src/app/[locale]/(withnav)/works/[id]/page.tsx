import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function PostsPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await response.json();

  return (
    <div className="container flex flex-col gap-4 min-h-screen justify-center items-center">
      <div className="max-w-[500px] border border-gray-200 rounded-lg p-4 text-center flex flex-col gap-8 items-center">
        <h1 className="text-2xl font-bold">{post.title.toUpperCase()}</h1>
        <p className="text-sm text-gray-500">{post.body}</p>
        <Link
          href="/works"
          className="group text-sm text-gray-500 hover:underline flex gap-2 items-center"
        >
          <ArrowLeftIcon className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1.5" />
          <span>Go back to all works</span>
        </Link>
      </div>
    </div>
  );
}
