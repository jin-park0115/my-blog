import { getSortedPostData } from "@/src/lib/posts";
import Link from "next/link";
import Write from "./components/Write";

export default async function Home() {
  const allPostsData = await getSortedPostData();

  return (
    <>
      <Write />
      <div className="bg-red-500 flex items-center h-20 fixed top-0 left-0 right-0 z-50">
        <p className="flex-1 text-3xl text-center">My-blog</p>
        <p className="cursor-pointer">글쓰기</p>
      </div>
      <div className="mt-24 w-[80%] mx-auto grid grid-cols-2 gap-4">
        {allPostsData.map((post) => (
          <Link
            href={`/posts/${post.id}`}
            className="border bg-amber-100 p-4"
            key={post.id}
          >
            <p>{post.title}</p>
            <p>{post.date}</p>
            <p>{post.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
