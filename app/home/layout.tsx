"use client";

import Header from "../ui/Header";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/AuthContextProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);
  if (!isAuthenticated) {
    return null;
  }
  return (
    <>
      <Header />
      {children}
    </>
  );
}
