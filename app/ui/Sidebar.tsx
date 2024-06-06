import Link from "next/link";
import { useState, useEffect } from "react";
import { HOST } from "@/lib/url";

type Recommendation = {
  slug: string;
  title: string;
  author: string;
};

export default function Sidebar({
  selectedTopic,
  currentPage,
}: {
  selectedTopic: string;
  currentPage: string;
}) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>();
  useEffect(() => {
    const getRecommendations = async () => {
      let url = `http://${HOST}/api/articles/recommendations`;
      const response = await fetch(url, {
        credentials: "include",
      });
      const json = await response.json();
      setRecommendations(json);
    };
    getRecommendations();
  }, []);
  if (recommendations) {
    return (
      <aside>
        <article>
          <h2 className="font-semibold mt-4 mb-8">推荐阅读</h2>
          {recommendations.map((article, index) => (
            <article key={article.title}>
              <div
                className={`grid grid-cols-[0fr_1fr] ${
                  index !== 0 ? "py-4" : "pb-4"
                } gap-8 ${index !== 2 ? "border-b-2 border-black" : ""}`}>
                <p className="text-2xl font-semibold">{`0${index + 1}`}</p>
                <article className="flex flex-col gap-4">
                  <h3 className="text-2xl font-semibold">
                    <Link
                      href={`/home/articles/${selectedTopic}/${currentPage}/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <span className="flex gap-2">
                    <p className="font-semibold">作者</p>
                    <p>{article.author}</p>
                  </span>
                </article>
              </div>
            </article>
          ))}
        </article>
      </aside>
    );
  } else {
    return <p>no</p>;
  }
}
