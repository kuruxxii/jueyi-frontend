"use client";

import PageTitle from "@/app/ui/PageTitle";
import NewsTicker from "@/app/ui/NewsTicker";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";

type Journal = {
  title: string;
  description: string;
  vol: number;
  coverUrl: string;
  articles: string[];
  createdAt: string;
};

export default function JournalsPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  // Add a ref to track if the component is mounted
  /* 
  In React Strict Mode, useEffect (along with several other lifecycle methods) 
  is intentionally invoked twice during development.
  */
  const isMounted = useRef(false);

  useEffect(() => {
    const fetchPaginatedJournals = async (page: number) => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/journals?page=${page}`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );
        const { journals, totalPages } = await response.json();
        setJournals((prevJournals) => [...prevJournals, ...journals]);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("获取周刊失败", error);
      }
    };
    if (isMounted.current) {
      fetchPaginatedJournals(page);
    } else {
      isMounted.current = true;
    }
  }, [page]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <main className="flex flex-col min-h-screen max-w-[95rem] w-full mx-auto lg:pt-0 sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
      <PageTitle
        imgSrc="/images/titles/Magazine.svg"
        imgAlt="The word 'Magazine' in bold, uppercase lettering"
      />
      <NewsTicker />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-black border-collapse mb-6">
        {journals.map((journal) => (
          <article
            className="border border-black p-8 h-screen"
            key={journal.title}>
            <div className="flex items-center justify-between text-xl">
              {format(new Date(journal.createdAt), "yyyy-MM-dd")}
              <span>Vol. {journal.vol}</span>
            </div>
            <Link href={`/home/journals/${journal.vol}`}>
              <Image
                className="my-8 hover:scale-105 transition h-96"
                src={journal.coverUrl}
                alt={journal.title}
                width={430}
                height={430}
              />
            </Link>
            <h2 className="text-3xl font-extrabold mb-6">
              <Link href={`/home/journals/${journal.vol}`}>
                <span>{journal.title}</span>
              </Link>
            </h2>
            <p
              className="mt-3 mb-12 tracking-wide"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "8",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
              {journal.description}
            </p>
          </article>
        ))}
      </div>
      {page < totalPages && (
        <Button onClick={loadMore} className="block mx-auto">
          加载更多
        </Button>
      )}
    </main>
  );
}
