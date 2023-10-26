'use client'
import { Navbar } from '@/components/navbar/navbar';
import SideNavbar from '@/components/navbar/sideNav';
import { SplashScreen } from '@/components/splash-screen';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [loading, setLoading] = useState(isHome)

  useEffect(()=> {
    if (loading) return

  }, [loading])

  return (
    <>
    {loading && isHome ? (<SplashScreen finishLoading={()=> setLoading(false)} />): (
      <div className="min-h-screen flex">
      <SideNavbar />
      <div className="bg-primary-foreground flex-1">
        <Navbar />
        {children}
      </div>
    </div>
    )}
    </>
  )
}
