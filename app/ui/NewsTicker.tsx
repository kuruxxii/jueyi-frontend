"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const news = [
  "大家好呀！我是Harry！欢迎来到觉意阅读！🎉",
  "每期视频的读书笔记也都会放在这里噢！大家可随时访问和下载！",
  "学习最重要的是坚持长期主义，希望Harry能够有幸陪伴你，终身学习，终身成长。共勉。",
];

export default function NewsTicker() {
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
  }, [xPercent]);

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
