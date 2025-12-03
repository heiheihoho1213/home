import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Layout } from '../components/Layout';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Heiheihoho\'s Portfolio',
  description: 'A portfolio showcasing my projects, blogs, and gallery explorations.',
  icons: {
    icon: '/home/favicon.svg',
    apple: '/home/favicon.svg',
    shortcut: '/home/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/home/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/home/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <Layout>
            {children}
          </Layout>
        </LanguageProvider>
      </body>
    </html>
  );
}

