import './globals.css';
import { Inter } from 'next/font/google';
import { ReduxProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Viral Content Wizard',
  description: 'Build viral content ideas fast.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
