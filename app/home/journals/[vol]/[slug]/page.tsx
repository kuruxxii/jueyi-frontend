"use client";

import { useState, useEffect } from "react";
import PostNavigation from "@/app/ui/PostNavigation";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";
import { usePathname, useParams } from "next/navigation";
import { HOST } from "@/lib/url";
import Image from "next/image";

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

export default function ArticlePage() {
  const params = useParams<{ vol: string; slug: string }>();
  const pathname = usePathname();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  const [article, setArticle] = useState<Article>();
  const [nope, setNope] = useState(false);
  useEffect(() => {
    const getAnArticle = async () => {
      try {
        let url = `${HOST}/api/articles/${params.slug}`;
        const response = await fetch(url, {
          credentials: "include",
        });
        const json = await response.json();
        if (response.ok) {
          setArticle(json);
        } else {
          setNope(true);
        }
      } catch (error) {
        console.log(error);
        setNope(true);
      }
    };
    getAnArticle();
  }, [params.slug]);
  if (nope) {
    return (
      <main className="max-w-[95rem] w-full h-screen mx-auto sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2 flex justify-center items-center">
        <p className="text-2xl pb-16">前面的區域，以後再來探索吧！</p>
      </main>
    );
  }
  if (!article) {
    return (
      <main className="max-w-[95rem] w-full h-screen mx-auto sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2 flex justify-center items-center">
        <p className="text-2xl pb-16">火速載入中！ ！</p>
      </main>
    );
  } else {
    return (
      <main className="max-w-[95rem] w-full mx-auto sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
        <PostNavigation href={`/home/journals/${params.vol}`}>
          觉意周刊
        </PostNavigation>
        <article className="grid md:grid-cols-2 gap-6 md:gap-6 pb-6 md:pb-24">
          <h2 className="text-6xl font-black">{article.title}</h2>
          <div>
            <span className="font-bold text-2xl">Harry说：</span>
            <p className="text-lg">{article.introduction}</p>
          </div>
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
          {/* <img src={article.coverUrl} alt={article.title} /> */}
          <Image
            src={article.coverUrl}
            alt={article.title}
            width={1522}
            height={856}
            // priority={true}
            placeholder="empty"
            quality={10}
            loading="lazy"
          />
        </div>
        <article className="max-w-[900px] prose-lg lg:prose-2xl mx-auto mt-6 mb-24 text-black">
          <Markdown>{article.content}</Markdown>
        </article>
      </main>
    );
  }
}
