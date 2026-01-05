import { getPostData } from "@/src/lib/posts";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postData = await getPostData(id);
  return (
    <article className="max-w-2xl mx-auto p-10">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-8 inline-block"
      >
        ← 목록으로 돌아가기
      </Link>
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">{postData.title}</h1>
        <p className="text-gray-500">{postData.date}</p>
      </header>

      {/* HTML 콘텐츠 주입 */}
      <div
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </article>
  );
}
