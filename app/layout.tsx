import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provder';

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <div>Header</div>
            <div className="flex-1">{children}</div>
            <div>Footer</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
