import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

export default function ArticlePreview({
  slug,
  title,
  coverUrl,
  introduction,
  author,
  read,
  topic,
  createdAt,
}: {
  slug: string;
  title: string;
  coverUrl: string;
  introduction: string;
  author: string;
  read: number;
  topic: string;
  createdAt: string;
}) {
  return (
    <article>
      <div className="border-b-2 border-black py-6 mb-6  grid md:grid-cols-[0fr_1fr] gap-6 sm:gap-12">
        <Link href={`articles/${slug}`} className="hidden sm:block h-60 w-60">
          <Image
            className="w-full h-full grayscale object-cover hover:scale-105 transition"
            src={coverUrl}
            alt={title}
            width={240}
            height={240}
          />
        </Link>
        <section className="flex flex-col justify-between h-60">
          <div className="mb-4 :md:mb-0">
            <h3 className="text-xl sm:text-3xl mb-3 font-black">
              <Link href={`articles/${slug}`}>{title}</Link>
            </h3>
            <p
              className="text-sm sm:text-base pt-2 overflow-hidden tracking-wide"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: "4",
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
              }}>
              {introduction}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <span className="flex flex-wrap">
                <p className="font-semibold pr-2">作者</p>
                <p>{author}</p>
              </span>
              <span className="flex flex-wrap">
                <p className="font-semibold pr-2">日期</p>
                {format(new Date(createdAt), "yyyy-MM-dd")}
              </span>
              <span className="flex flex-wrap">
                <p className="font-semibold pr-2">预计阅读时间</p>
                <p>{`${read}分钟`}</p>
              </span>
            </div>
            <span className="hidden 2xl:block 2xl:px-3 2xl:py-2 border border-black rounded-full w-fit">
              <p>{topic}</p>
            </span>
          </div>
        </section>
      </div>
    </article>
  );
}
