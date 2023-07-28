'use client';

import { useState } from 'react';
import Link from 'next/link';

import { signOut } from 'next-auth/react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import type { Session } from 'next-auth';
import type { Links } from './navbar';

interface MobileNavbarProps {
  session: Session | null;
  pathname: string;
  links: Links;
}

export function MobileNavbar({ session, pathname, links }: MobileNavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>AlexMaldonado.dev</SheetTitle>
        </SheetHeader>
        <div className="w-full flex items-center justify-center">
          <NavigationMenu orientation="vertical" className="flex flex-col">
            <NavigationMenuList className="flex flex-col">
              {links.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      onClick={() => setOpen(false)}
                      active={pathname === link.href}
                      className={navigationMenuTriggerStyle()}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              {session?.user && (
                <>
                  <NavigationMenuItem>
                    <Link href="/admin" legacyBehavior passHref>
                      <NavigationMenuLink
                        active={pathname === '/admin'}
                        onClick={() => setOpen(false)}
                        className={navigationMenuTriggerStyle()}
                      >
                        Admin
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="mt-4">
                    <Button
                      variant="outline"
                      className="bg-red-500"
                      size="sm"
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        setOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </SheetContent>
    </Sheet>
  );
}
