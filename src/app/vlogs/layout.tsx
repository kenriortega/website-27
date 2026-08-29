import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type VlogsLayoutProps = {
  children: React.ReactNode;
};

export default function VlogsLayout({ children }: VlogsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-16 sm:py-20">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
