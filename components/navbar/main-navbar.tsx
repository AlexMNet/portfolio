import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import Link from 'next/link';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import type { Links } from './navbar';
import type { Session } from 'next-auth';

interface MainNavbarProps {
  links: Links;
  pathname: string;
  session: Session | null;
}

export function MainNavbar({ links, pathname, session }: MainNavbarProps) {
  return (
    <NavigationMenu className="hidden md:block">
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
          <>
            <NavigationMenuItem>
              <Link href="/admin" legacyBehavior passHref>
                <NavigationMenuLink
                  active={pathname === '/admin'}
                  className={navigationMenuTriggerStyle()}
                >
                  Admin
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="outline"
                className="bg-red-500 text-white"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut size={16} />
              </Button>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
