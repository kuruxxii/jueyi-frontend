"use client";

import PageTitle from "@/app/ui/PageTitle";
import NewsTicker from "@/app/ui/NewsTicker";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Pagination from "@/app/ui/Pagination";
import ArticlePreview from "@/app/ui/articles/ArticlePreview";
import Sidebar from "@/app/ui/Sidebar";
import { HOST } from "@/lib/url";

type ArticlePreview = {
  slug: string;
  title: string;
  coverUrl: string;
  introduction: string;
  author: string;
  read: number;
  topic: string;
  createdAt: string;
};
type Topic =
  | "all"
  | "personal"
  | "business"
  | "technology"
  | "humanities"
  | "workplace"
  | "school";

export default function ArticlePreviewsPage() {
  const [articlePreviews, setArticlePreviews] = useState<ArticlePreview[]>([]);
  const topicMap = {
    all: "全部",
    personal: "个人成长",
    business: "商业财经",
    technology: "科技前沿",
    humanities: "人文社科",
    workplace: "职场专题",
    school: "校园学习专题",
  };
  const topics: Topic[] = [
    "all",
    "personal",
    "business",
    "technology",
    "humanities",
    "workplace",
    "school",
  ];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const selectedTopic = searchParams.get("topic") || "all";
  const currentPage = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState<number>(0);
  const handleFilter = (topic: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (topic) {
      params.set("topic", topic);
    } else {
      params.delete("topic");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  useEffect(() => {
    const getFilteredArticlePreviewTotalPages = async () => {
      let url = `http://${HOST}/api/articles/pages`;
      if (selectedTopic !== "all") {
        url += `?topic=${selectedTopic}`;
      }
      const response = await fetch(url, {
        credentials: "include",
        cache: "no-store",
      });
      const json = await response.json();
      setTotalPages(json);
    };
    getFilteredArticlePreviewTotalPages();
  }, [selectedTopic]);
  useEffect(() => {
    const getFilteredArticlePreviews = async () => {
      let url = `http://${HOST}/api/articles?page=${currentPage}`;
      if (selectedTopic !== "all") {
        url += `&topic=${selectedTopic}`;
      }
      const response = await fetch(url, {
        credentials: "include",
        cache: "no-store",
      });
      const articlePreviews = await response.json();
      setArticlePreviews(articlePreviews);
    };
    getFilteredArticlePreviews();
  }, [currentPage, selectedTopic]);

  return (
    <main className="flex flex-col min-h-screen max-w-[95rem] w-full mx-auto lg:pt-0 sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
      <PageTitle
        imgSrc="/images/titles/ARTICLES.svg"
        imgAlt="The word 'Magazine' in bold, uppercase lettering"
      />
      <NewsTicker />
      <div className="flex flex-wrap justify-between items-center gap-2 md:gap-0 my-6">
        <p className="font-semibold uppercase text-lg">领域专题</p>
        {articlePreviews && (
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Button
                className={`px-3 py-2 bg-white text-black hover:bg-black hover:text-white border border-black rounded-full ${
                  topic === selectedTopic
                    ? "bg-black text-paperwhite"
                    : "border-black"
                }`}
                key={topic}
                onClick={() => handleFilter(topic)}>
                {topicMap[topic]}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-24">
        <div className="lg:w-3/4">
          {articlePreviews.map((article) => (
            <ArticlePreview
              key={article.slug}
              selectedTopic={selectedTopic}
              currentPage={currentPage.toString()}
              {...article}
            />
          ))}
        </div>
        <div className="hidden lg:block 2xl:w-1/4">
          <Sidebar
            selectedTopic={selectedTopic}
            currentPage={currentPage.toString()}
          />
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
