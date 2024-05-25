"use client";

import PageTitle from "@/app/ui/PageTitle";
import NewsTicker from "@/app/ui/NewsTicker";
import { useState, useEffect } from "react";

type Topic =
  | "个人成长"
  | "商业财经"
  | "科技前沿"
  | "人文社科"
  | "职场专题"
  | "校园学习专题";

type ArticlePreview = {
  slug: string;
  title: string;
  coverUrl: string;
  introduction: string;
  author: string;
  read: number;
  topic: Topic;
};

export default function ArticlePreviewPage() {
  const [articlePreviews, setArticlePreviews] = useState<ArticlePreview[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | "全部">("全部");
  return (
    <main className="flex flex-col min-h-screen max-w-[95rem] w-full mx-auto lg:pt-0 sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
      <PageTitle
        imgSrc="/images/titles/Magazine.svg"
        imgAlt="The word 'Magazine' in bold, uppercase lettering"
      />
      <NewsTicker />
    </main>
  );
}
