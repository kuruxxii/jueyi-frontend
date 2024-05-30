import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUserRound } from "lucide-react";

type MenuItem = {
  href: string;
  label: string;
};

const menu: MenuItem[] = [
  {
    href: "/home/articles",
    label: "精选文章",
  },
  {
    href: "/home/journals",
    label: "觉意周刊",
  },
  {
    href: "https://space.bilibili.com/611092306?spm_id_from=333.999.0.0",
    label: "好书推荐",
  },
];

export default function Header() {
  return (
    <header>
      <div className="flex justify-between items-center py-3 border-b border-black">
        <div>
          <Link href="/home/articles">
            <div className="font-bold text-3xl tracking-wide">觉意阅读</div>
          </Link>
        </div>
        <Sheet>
          <SheetTrigger aria-labelledby="button-label">
            <span id="button-label" hidden>
              Menu
            </span>
            <svg
              aria-hidden="true"
              className="md:hidden"
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect width="25" height="4" fill="black" />
              <rect y="6" width="25" height="4" fill="black" />
              <rect y="12" width="25" height="4" fill="black" />
            </svg>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="w-full pt-14"
            aria-label="Menu Toggle">
            <nav
              className="flex flex-col flex-1 justify-end gap-6 font-light"
              aria-labelledby="mobile-nav">
              {menu.map((menuItem, index) => (
                <Link key={index} href={menuItem.href}>
                  {menuItem.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <nav
          className="flex-1 items-center justify-end gap-6 hidden md:flex"
          aria-labelledby="desktop-nav">
          {menu.map((menuItem, index) => (
            <Link key={index} href={menuItem.href}>
              {menuItem.label}
            </Link>
          ))}
          <svg
            width="15"
            height="1"
            viewBox="0 0 15 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="15" height="1" fill="black" />
          </svg>
          <CircleUserRound strokeWidth={1} />
        </nav>
      </div>
    </header>
  );
}
