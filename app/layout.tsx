import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const lexend = localFont({
  src: '../public/fonts/Lexend-VariableFont_wght.ttf',
  variable: '--font-lexend',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Event Calendar',
  description: 'Event Calendar',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} antialiased`}>

          {children}

      </body>
    </html>
  );
}
