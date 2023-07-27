'use client';
import { ModeToggle } from './mode-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Typography } from './ui/typography';
import { Badge } from './ui/badge';

const links: { title: string; href: string }[] = [
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
          <Typography variant="p" weight="light">
            Welcome: {session?.user?.name}!
          </Typography>
          <Badge variant="secondary">Admin mode</Badge>
        </div>
      )}
      <div className="mx-auto w-full max-w-2xl py-12 lg:px-0 px-4">
        <nav className="flex items-center justify-center sm:justify-between">
          <div className="hidden sm:flex items-center space-x-2">
            <div>AlexMaldonado.DEV </div>
            <div className="rounded-full h-4 w-4 dark:bg-blue-500 bg-black inline-block align-middle animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-3">
            <NavigationMenu>
              <NavigationMenuList>
                {links.map((link) => (
                  <NavigationMenuItem key={link.title}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        active={pathname === link.href}
                        className={navigationMenuTriggerStyle()}
                      >
                        {link.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                {session?.user && (
                  <NavigationMenuItem>
                    <Button
                      variant="outline"
                      className="bg-red-500"
                      size="sm"
                      onClick={() => signOut({ callbackUrl: '/' })}
                    >
                      <LogOut size={16} />
                    </Button>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </>
  );
}
