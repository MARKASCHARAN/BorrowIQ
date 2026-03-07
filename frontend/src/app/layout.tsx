import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'BorrowIQ | AI-Powered On-Chain Credit',
  description: 'AI-Powered On-Chain Credit Intelligence for DeFi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#0A0A0F] text-white antialiased min-h-screen flex flex-col overflow-x-hidden`}>
        <Providers>
          {/* Background Particles layer */}
          <div className="fixed inset-0 z-[-1] overflow-hidden">
            <div className="particle w-[400px] h-[400px] top-[-100px] left-[-100px] bg-primary/20" />
            <div className="particle w-[500px] h-[500px] bottom-[20%] right-[-150px] bg-accent/20" style={{ animationDelay: '2s' }} />
            <div className="particle w-[300px] h-[300px] top-[40%] left-[20%] bg-glow/20" style={{ animationDelay: '4s' }} />
          </div>

          <Navbar />
          <main className="flex-grow w-full z-10 relative">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
