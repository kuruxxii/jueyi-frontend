import type { Metadata } from "next";
import "./globals.css";
import Container from "./ui/Container";

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
    <html lang="en" className="scroll-smooth">
      <body>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
