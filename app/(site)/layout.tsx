import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex">{children}</main>
      <Footer />
    </div>
  );
}
