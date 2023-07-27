import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provder';
import AuthProvider from './providers/AuthProvider';
import ToasterProvider from './providers/ToasterProvider';

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
      <body className="min-h-screen">
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterProvider />
            <div>{children}</div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
