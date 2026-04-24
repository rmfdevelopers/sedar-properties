import { Nunito, Inter } from 'next/font/google';
import './globals.css';

const heading = Nunito({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '600', '700', '800', '900']
});

const body = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '500', '600']
});

export const metadata = {
  title: 'SEDAR Properties | Luxury Real Estate Lagos',
  description: 'Realty Redefined. Your trusted real estate partner in Lagos for buying, selling, and property management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}