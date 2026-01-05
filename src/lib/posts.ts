import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostData() {
  // /posts 폴더 안의 파일 이름들을 가져온다.
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostData = fileNames.map((fileName) => {
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
  });
  // 날짜순으로 정렬
  return allPostData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
