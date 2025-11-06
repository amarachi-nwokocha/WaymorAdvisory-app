import './globals.css';
import './font.css';
import { Montserrat, Open_Sans } from 'next/font/google';
import { Toaster } from "react-hot-toast";


const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const metadata = {
  title: 'Waymor Advisory',
  description: 'Financial advisory and strategy consulting firm.',
  keywords: ['Financial advisory', 'Strategy consulting', 'Waymor Advisory', 'Business growth', 'Corporate consulting'],
  authors: [{ name: 'Waymor Advisory' }],
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        {/* Favicon / logo in the browser tab */}
        <link rel="icon" href="/logo5.png" />
        {/* Meta tags for SEO */}
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />
        <meta name="author" content="Waymor Advisory" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo5.png" />
        <meta property="og:url" content="https://www.waymoradvisory.com" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/logo5.png" />
      </head>
      <body>
        {children}
          <Toaster position="top-center" reverseOrder={false} />
        </body>
    </html>
  );
}
