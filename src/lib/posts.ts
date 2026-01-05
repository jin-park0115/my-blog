import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export async function getSortedPostData() {
  // /posts 폴더 안의 파일 이름들을 가져온다.
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostData = await Promise.all(
    fileNames.map(async (fileName) => {
      // 파일 이름에서 .md 제거하여 id생성
      const id = fileName.replace(/\.md$/, "");
      // 마크다운 파일을 문자열로 읽어옴
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf-8");
      // gray-matter를 사용하여 메타데이터 파싱
      const matterResult = matter(fileContents);

      return {
        id,
        ...(matterResult.data as {
          date: string;
          title: string;
          description: string;
        }),
      };
    })
  );
  // 날짜순으로 정렬
  return allPostData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string) {
  const decodedId = decodeURIComponent(id);
  const fullPath = path.join(postsDirectory, `${decodedId}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as {
      date: string;
      title: string;
      description: string;
    }),
  };
}
