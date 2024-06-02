"use client";

import { useState, useEffect } from "react";
import PostNavigation from "@/app/ui/PostNavigation";
import { format } from "date-fns";
import ArticlePreview from "@/app/ui/journals/ArticlePreview";
import { usePathname } from "next/navigation";

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

type ArticlePreview = {
  slug: string;
  title: string;
  coverUrl: string;
  introduction: string;
  author: string;
  read: number;
  topic: Topic;
  origin: string;
  createdAt: string;
};

export type Journal = {
  title: string;
  description: string;
  vol: number;
  coverUrl: string;
  articles: string[];
  createdAt: string;
};

export default function JournalPage({ params }: { params: { vol: number } }) {
  const pathname = usePathname();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  const [journal, setJournal] = useState<Journal>();
  const [articlePreviews, setArticlePreviews] = useState<ArticlePreview[]>();
  useEffect(() => {
    const getArticlePreviewsInJournal = async () => {
      let url = `http://localhost:4000/api/journals/${params.vol}`;
      const response = await fetch(url, {
        credentials: "include",
        cache: "no-store",
      });
      const { journal, articlePreviews } = await response.json();
      setJournal(journal);
      setArticlePreviews(articlePreviews);
    };
    getArticlePreviewsInJournal();
  }, [params.vol]);
  if (!journal || !articlePreviews) {
    return (
      <main className="max-w-[95rem] w-full mx-auto sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
        <p>周刊为空</p>;
      </main>
    );
  }
  return (
    <main className="max-w-[95rem] w-full mx-auto sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
      <PostNavigation href="/home/journals">觉意周刊</PostNavigation>
      <article className="grid md:grid-cols-2 gap-6 md:gap-6 pb-6 md:pb-24">
        <h2 className="text-6xl font-black">{journal.title}</h2>
        <div>
          <span className="font-bold text-2xl">Harry说：</span>
          <p className="text-lg">{journal.description}</p>
        </div>
      </article>
      <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0 mb-8">
        <div className="flex flex-col sm:flex-row md:items-center gap-2 sm:gap-6">
          <span className="flex flex-wrap">
            <p className="font-semibold pr-2">Vol.</p>
            <p>{journal.vol}</p>
          </span>
          <span className="flex flex-wrap">
            <p className="font-semibold pr-2">日期</p>
            {format(new Date(journal.createdAt), "yyyy-MM-dd")}
          </span>
        </div>
      </div>
      <div>
        <img src={journal.coverUrl} alt={journal.title} className="" />
      </div>
      <section className="mx-auto mt-6 mb-24">
        {articlePreviews.map((article) => (
          <ArticlePreview key={article.slug} vol={params.vol} {...article} />
        ))}
      </section>
    </main>
  );
}
