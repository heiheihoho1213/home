import type { Metadata } from 'next';
import { LanguageProvider } from '../contexts/LanguageContext';
import { Layout } from '../components/Layout';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Neo-Brutalism Portfolio',
  description: 'A bold neo-brutalist portfolio showcasing experimental UI, blogs, and gallery explorations.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com" async></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
          body {
            font-family: 'Space Grotesk', sans-serif;
            background-color: #f3f4f6;
          }
          /* Custom Scrollbar */
          ::-webkit-scrollbar {
            width: 12px;
          }
          ::-webkit-scrollbar-track {
            background: #ffffff;
            border-left: 2px solid #000;
          }
          ::-webkit-scrollbar-thumb {
            background: #000;
            border: 2px solid #000;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #a29f9f;
          }
        ` }} />
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

