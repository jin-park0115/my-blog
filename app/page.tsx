import { getSortedPostData } from "@/src/lib/posts";
import Link from "next/link";

export default function Home() {
  const allPostsData = getSortedPostData();
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8">내 블로그 글 목록</h1>
      <ul className="space-y-4">
        {allPostsData.map(({ id, date, title, description }) => (
          <li
            key={id}
            className="border p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <Link href={`/posts/${id}`}>
              <small className="text-gray-500">{date}</small>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
