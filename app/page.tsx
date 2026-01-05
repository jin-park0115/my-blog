import { getSortedPostData } from "@/src/lib/posts";
import Link from "next/link";
import Write from "./components/Write";

export default async function Home() {
  const allPostsData = await getSortedPostData();

  return (
    <>
      <Write />
      <header className="fixed top-0 left-0 right-0 h-14 border-b border-gray-100 bg-white/80 backdrop-blur-md z-50 flex items-center px-6">
        <h1 className="text-lg font-bold tracking-tight">My Blog</h1>
        <div className="flex-1" />
        <button className="text-sm font-medium hover:bg-gray-100 px-3 py-1 rounded-md transition-colors">
          글쓰기
        </button>
      </header>
      <main className="max-w-4xl mx-auto pt-24 pb-20 px-6">
        <h2 className="text-3xl font-bold mb-8 border-b pb-4 border-gray-100">
          모든 포스트
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allPostsData.map((post) => (
            <Link
              href={`/posts/${post.id}`}
              key={post.id}
              className="group border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-all duration-200"
            >
              <span className="text-xs font-medium text-gray-400 mb-2 block lowercase italic">
                {post.date}
              </span>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
