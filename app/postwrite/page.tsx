"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PostWrite() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { title, date, desc, content };
    console.log("보내는 데이터", postData);
    const res = await fetch("/api/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    console.log(res.status);
    if (res.ok) {
      alert("글을 성공적으로 등록하였습니다.");
      router.push("/");
      router.refresh();
    } else {
      alert("글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">새 글 작성</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2"
          type="text"
          placeholder="제목"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2"
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className="border p-2"
          type="text"
          placeholder="짧은 설명"
          onChange={(e) => setDesc(e.target.value)}
        />
        <textarea
          className="border p-2 h-40"
          placeholder="내용을 적어주세요 (마크다운 가능)"
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          저장하기
        </button>
      </form>
    </div>
  );
}
