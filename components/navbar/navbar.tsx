'use client';
import { ModeToggle } from '../mode-toggle';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Typography } from '../ui/typography';
import { Badge } from '../ui/badge';
import { MobileNavbar } from './mobile-navbar';

export type Links = { title: string; href: string }[];

const links: Links = [
  { title: 'Home', href: '/' },
  { title: 'Work', href: '/work' },
  { title: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <div className="w-full h-4 dark:bg-slate-500 bg-black flex items-center justify-center py-4 gap-2 lg:hidden">
          <Typography variant="p" weight="light" className="text-white">
            Welcome: {session?.user?.name}!
          </Typography>
          <Badge variant="secondary">Admin mode</Badge>
        </div>
      )}
      <div className="mx-auto w-full px-4 py-2 ">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <div className="font-mono">AlexMaldonado.DEV </div>
            <div className="rounded-full h-4 w-4 dark:bg-blue-500 bg-black inline-block align-middle animate-pulse"></div>
          </Link>
          <div className="flex items-center md:ml-auto">
            <ModeToggle />
            <div className="md:hidden">
              <MobileNavbar
                links={links}
                pathname={pathname}
                session={session}
              />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
