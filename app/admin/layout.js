import { Inter } from 'next/font/google';
import SideNav from '@/layout/SideNav';
import TopNav from '@/layout/TopNav';
import "../globals.css"
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Euodia Foods',
  description:
    'Welcome to Euodia foods, get your next meal with just a click of a button',
  openGraph: {
    title: 'Euodia Foods',
    description:
      'Welcome to Euodia foods, get your next meal with just a click of a button',
    url: 'https://euodiafoods.com',
    siteName: 'Euodia Services',
    images: [
      {
        url: 'https://euodiafoods.com',
        width: 800,
        height: 600,
        alt: 'Euodia OpenGraph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/favicon.ico', // Correct the path to start from the root
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon-32x32.png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        url: '/favicon-16x16.png',
        sizes: '16x16',
      },
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
};

export function generateViewport() {
  return {
    themeColor: '#ffffff',
  };
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className=" flex flex-col min-h-screen  h-full">
     
       <div className="flex  flex-col h-screen w-full mx-auto">
            <TopNav />
        <div className="flex flex-grow">
          <SideNav className="flex-shrink-0 w-64  dark:bg-[#0D0D0D] text-white" />
          <div className="flex p-4   dark:bg-[#212121] flex-col flex-grow">
            <div className="flex-grow bg-gray-100 p-6 w-auto h-full overflow-x-auto mt-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  );
}
