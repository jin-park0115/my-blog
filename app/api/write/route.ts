import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

// 서버 사이드 기능(fs, path)
/*
  fs(File System): node.js 코테 할때 보던거, 파일을 읽고 쓰는 Node.js 내장 모듈이다.
*/

export async function POST(request: Request) {
  try {
    // 클라이언트가 보낸 JSON 데이터를 파싱한다.
    const body = await request.json();
    const { title, date, desc, content } = body;

    // 파일명을 생성한다. 제목의 공백을 하이픈으로 변경.
    const fileName = title.replace(title.replace(/\s+/g, "-")).toLowerCase();
    const filePath = path.join(process.cwd(), "posts", `${fileName}.md`);
    // 마크다운 형식의 문자열을 만든다. front matter 포함
    const fileContent = `---
title: "${title}"
date: "${date}"
description: "${desc}"
---

${content}`;
    // 실제로 posts 폴더에 파일을 물리적으로 생성한다.
    fs.writeFileSync(filePath, fileContent, "utf-8");
    // 성공 응답을 보낸다.
    return NextResponse.json({ message: "파일 저장 성공!" }, { status: 201 });
  } catch (error) {
    console.error("파일 저장 에러:", error);
    return NextResponse.json(
      { message: "파일 저장 중 오류 발생" },
      { status: 500 }
    );
  }
}
