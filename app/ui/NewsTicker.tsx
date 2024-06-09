"use client";

import gsap from "gsap";
import { useState, useEffect, useRef } from "react";
import { HOST } from "@/lib/url";

export default function NewsTicker() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const getNews = async () => {
      try {
        let url = `http://${HOST}/api/news`;
        const response = await fetch(url, {
          credentials: "include",
        });
        const { content } = await response.json();
        if (response.ok) {
          setNews(content);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNews();
  }, []);
  const newsText = useRef<HTMLDivElement | null>(null);
  let xPercent = 0;
  const animationDuration = 20;

  useEffect(() => {
    const ticker = newsText.current;

    if (ticker) {
      const tickerWidth = ticker.offsetWidth;

      gsap.set(ticker, { x: xPercent });

      const animation = gsap.to(ticker, {
        x: -tickerWidth,
        duration: animationDuration,
        ease: "linear",
        repeat: -1,
        onRepeat: () => {
          gsap.set(ticker, { x: 0 });
        },
      });

      return () => {
        animation.kill();
      };
    }
  }, [xPercent, news]);

  return (
    <div className="flex bg-black text-white py-5 max-w-[95rem] w-full mx-auto relative overflow-hidden">
      <div className="bg-black z-10 px-6">
        <span className="flex gap-2 bg-black font-semibold uppercase whitespace-nowrap">
          <p>GREETINGS!</p>
          <p>+++</p>
        </span>
      </div>
      <div ref={newsText} className="flex gap-4 sliding-ticker relative">
        {news.map((newsItem, index) => (
          <div
            key={index}
            className={`whitespace-nowrap ${
              index === news.length - 1 ? "overflow-visible" : "overflow-hidden"
            }`}
            style={{ right: index === news.length - 1 ? "0" : "" }}>
            <p>{newsItem}+++</p>
          </div>
        ))}
      </div>
    </div>
  );
}
