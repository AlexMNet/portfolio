import { Navbar } from '@/components/navbar/navbar';
import SideNavbar from '@/components/navbar/sideNav';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <SideNavbar />
      <div className="bg-primary-foreground flex-1">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
