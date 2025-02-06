import Header from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoimPod: 취미 모임 플랫폼",
  description: "취미 모임 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div>
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
