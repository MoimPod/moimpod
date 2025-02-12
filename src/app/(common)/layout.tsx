export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1200px] flex-1 sm:px-4 md:px-6 lg:bg-gray-50 lg:px-[102px]">{children}</div>
  );
}
