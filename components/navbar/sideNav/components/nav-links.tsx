'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const links: { title: string; href: string }[] = [
  { title: 'Home', href: '/' },
  { title: 'Work', href: '/work' },
  { title: 'Contact', href: '/contact' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="w-full flex flex-col items-center justify-center my-6">
      <ul className="space-y-4 flex items-center justify-center flex-col">
        {links.map((link) => (
          <li key={link.title}>
            <Button variant="link" size="lg" asChild>
              <Link
                href={link.href}
                className={pathname === link.href ? 'underline' : ''}
              >
                <Typography variant="largeText">{link.title}</Typography>
              </Link>
            </Button>
          </li>
        ))}
        {session?.user.role === 'admin' && (
          <>
            <li>
              <Button variant="link" size="lg" asChild>
                <Link
                  href={'/admin'}
                  className={pathname.startsWith('/admin') ? 'underline' : ''}
                >
                  <Typography variant="largeText">Admin</Typography>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                variant="destructive"
                size="lg"
              >
                <Typography variant="smallText">Logout</Typography>
              </Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
