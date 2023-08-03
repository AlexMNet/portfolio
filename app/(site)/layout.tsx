import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer';
import SideNavbar from '@/components/navbar/sideNav';
import { ModeToggle } from '@/components/mode-toggle';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1 flex relative">
        <SideNavbar />
        <div className="h-100 w-full">
          <Navbar />
          {children}
        </div>
      </main>
    </div>
  );
}
