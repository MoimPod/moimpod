import Header from "@/components/Header";
import type { Metadata } from "next";
import Providers from "@/app/lib/Provider";
import localFont from "next/font/local";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "MoimPod: 취미 모임 플랫폼",
  description: "취미 모임 플랫폼",
};

const pretendard = localFont({
  src: "../../public/font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <QueryClientProvider client={queryClient}>
          <Providers>
            <div>
              <Header />
              <main>{children}</main>
            </div>
          </Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
}
