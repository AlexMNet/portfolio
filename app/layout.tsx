import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provder';
import AuthProvider from './providers/AuthProvider';
import ToasterProvider from './providers/ToasterProvider';
import NextTopLoader from 'nextjs-toploader';
import ProjectModal from '@/components/project-modal';
import CreateModal from '@/components/create-modal';
import ContactModal from '@/components/contact-modal';

export const metadata: Metadata = {
  title: 'Alex Maldonado - Software Engineer',
  description: 'Software Engineer based in Southern California',
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
            <NextTopLoader />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
