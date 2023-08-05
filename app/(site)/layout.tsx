import { Navbar } from '@/components/navbar/navbar';
import SideNavbar from '@/components/navbar/sideNav';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full w-100">
      <SideNavbar />
      <div className="w-full bg-primary-foreground flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
