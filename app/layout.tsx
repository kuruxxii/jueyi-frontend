import type { Metadata } from "next";
import "./globals.css";
import Container from "./ui/Container";
import ContextProviders from "@/lib/ContextProviders";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "觉意阅读",
  description: "觉意阅读官方",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body className="bg-paperwhite">
        <ContextProviders>
          <Container>{children}</Container>
        </ContextProviders>
        <Toaster />
      </body>
    </html>
  );
}
