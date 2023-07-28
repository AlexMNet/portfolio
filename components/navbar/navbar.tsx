'use client';
import { ModeToggle } from '../mode-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { Button } from '../ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Typography } from '../ui/typography';
import { Badge } from '../ui/badge';
import { MainNavbar } from './main-navbar';
import { MobileNavbar } from './mobile-navbar';

export type Links = { title: string; href: string }[];

const links: Links = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '/projects' },
  { title: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <div className="w-full h-4 dark:bg-slate-500 bg-black flex items-center justify-center py-4 gap-2">
          <Typography variant="p" weight="light" className="text-white">
            Welcome: {session?.user?.name}!
          </Typography>
          <Badge variant="secondary">Admin mode</Badge>
        </div>
      )}
      <div className="mx-auto w-full max-w-2xl py-12 lg:px-0 px-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="font-mono">AlexMaldonado.DEV </div>
            <div className="rounded-full h-4 w-4 dark:bg-blue-500 bg-black inline-block align-middle animate-pulse"></div>
          </div>
          <div className="flex items-center md:space-x-3 space-x-0">
            <MainNavbar links={links} pathname={pathname} session={session} />
            <ModeToggle />
            <div className="md:hidden ">
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
