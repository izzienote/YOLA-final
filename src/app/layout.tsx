import type { Metadata } from 'next';
import Footer from '@/components/layout/footer/footer';
import Header from '@/components/layout/header/header';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';
import TQProvider from '@/lib/providers/TQProvider';

export const metadata: Metadata = {
  title: '너 혼자 산다',
  description: '혼자 사는 사람들의 소소한 일상 기록',
  icons: {
    icon: '/images/favicon.svg'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <TQProvider>
          <Header />
          <main className="mx-auto flex min-h-[calc(100vh-150px-100px)] w-full max-w-[1280px] flex-col items-center">
            {children}
          </main>
          <Toaster />
        </TQProvider>
        <Footer />
      </body>
    </html>
  );
}
