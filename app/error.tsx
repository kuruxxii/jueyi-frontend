"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="max-w-[95rem] w-full h-screen mx-auto sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2 flex justify-center items-center">
      <div className="flex flex-col">
        <h2 className="text-center pb-8">非常抱歉！好像出了点问题！</h2>
        <Button onClick={() => reset()}>重新加载</Button>
      </div>
    </main>
  );
}
