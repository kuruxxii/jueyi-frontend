"use client";

import { useState, useEffect } from "react";
import PostNavigation from "@/app/ui/PostNavigation";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";

type Topic =
  | "personal"
  | "business"
  | "technology"
  | "humanities"
  | "workplace"
  | "school";
const topicMap = {
  personal: "个人成长",
  business: "商业财经",
  technology: "科技前沿",
  humanities: "人文社科",
  workplace: "职场专题",
  school: "校园学习专题",
};

type Article = {
  slug: string;
  title: string;
  coverUrl: string;
  introduction: string;
  author: string;
  read: number;
  topic: Topic;
  origin: string;
  content: string;
  createdAt: string;
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article>();
  useEffect(() => {
    const getAnArticle = async () => {
      let url = `http://localhost:4000/api/articles/${params.slug}`;
      const response = await fetch(url, {
        credentials: "include",
        cache: "no-store",
      });
      const json = await response.json();
      setArticle(json);
    };
    getAnArticle();
  }, [params.slug]);
  if (!article) {
    return (
      <main className="max-w-[95rem] w-full mx-auto sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
        <p>Article not found</p>;
      </main>
    );
  }
  return (
    <main className="max-w-[95rem] w-full mx-auto sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
      <PostNavigation href="/home/articles">精选文章</PostNavigation>
      <article className="grid md:grid-cols-2 gap-6 md:gap-6 pb-6 md:pb-24">
        <h2 className="text-6xl font-black">{article.title}</h2>
        <p>{article.introduction}</p>
      </article>
      <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0 mb-8">
        <div className="flex flex-col sm:flex-row md:items-center gap-2 sm:gap-6">
          <span className="flex flex-wrap">
            <p className="font-semibold pr-2">作者</p>
            <p>{article.author}</p>
          </span>
          <span className="flex flex-wrap">
            <p className="font-semibold pr-2">日期</p>
            {format(new Date(article.createdAt), "yyyy-MM-dd")}
          </span>
          <span className="flex flex-wrap">
            <p className="font-semibold pr-2">预计阅读时间</p>
            <p>{`${article.read}分钟`}</p>
          </span>
        </div>
        <span className="px-3 py-2 border border-black rounded-full w-fit">
          <p className="uppercase">{article.topic}</p>
        </span>
      </div>
      <div>
        <img src={article.coverUrl} alt={article.title} className="grayscale" />
      </div>
      <article className="max-w-[800px] prose lg:prose-lg mx-auto mt-6 mb-24">
        <Markdown>{article.content}</Markdown>
      </article>
    </main>
  );
}
