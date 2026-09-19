import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TradePilot',
  description: 'Real-market analysis with manual account and risk tracking.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
