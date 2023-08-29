import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provder';
import AuthProvider from './providers/AuthProvider';
import ToasterProvider from './providers/ToasterProvider';
import NextTopLoader from 'nextjs-toploader';
import ProjectModal from '@/components/project-modal';
import CreateModal from '@/components/create-modal';
import ContactModal from '@/components/contact-modal';
import ReorderModal from '@/components/reorder-modal';

export const metadata: Metadata = {
  title: 'Alex Maldonado - Software Engineer',
  description: 'Software Engineer based in Southern California',
  openGraph: {
    title: 'Alex Maldonado - Software Engineer',
    description: 'Software Engineer based in Southern California',
    images: [
      {
        url: 'https://res.cloudinary.com/dtbtmmgxx/image/upload/v1692226021/android-chrome-192x192_rr1vkd.png',
        width: 192,
        height: 192,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider />
            <ProjectModal />
            <CreateModal />
            <ContactModal />
            <ReorderModal />
            <NextTopLoader />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
