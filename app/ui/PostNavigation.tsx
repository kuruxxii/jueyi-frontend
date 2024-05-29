import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type PostNavigationProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export default function PostNavigation({
  children,
  href,
}: PostNavigationProps) {
  return (
    <div className="flex items-center justify-between py-4 md:pt-14 md:pb-24">
      <Link
        className="flex items-center gap-2 text-lg font-extrabold"
        href={href}>
        <ArrowLeft />
        返回
      </Link>
      <p className="font-semibold text-lg md:text-[2rem]">{children}</p>
    </div>
  );
}
