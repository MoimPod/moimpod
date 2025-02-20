import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="mx-auto flex w-full max-w-[1200px] flex-1 px-4 md:px-6 lg:bg-gray-50 lg:px-[102px]">
        {children}
      </div>
    </div>
  );
}
