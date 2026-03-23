import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Blood Bank Panel',
  description: 'Dashboard for Blood Bank System',
};

export const viewport: Viewport = {
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='light' suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <NextTopLoader color='var(--sidebar-primary)' showSpinner={false} />
        <Toaster richColors position='top-right' duration={2000} closeButton={true} />
        {children}
      </body>
    </html>
  );
}
