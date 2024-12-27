import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner";
import Footer from "./dashboard/_components/Footer";
import Header from "./dashboard/_components/Header";
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  fallback: ['system-ui', 'arial', 'sans-serif']
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  fallback: ['Courier New', 'monospace']
});

export const metadata = {
  metadataBase: new URL('https://www.RVai.com'),
  title: {
    default: 'RV AI - AI-Powered Interview Preparation',
    template: '%s | RV AI'
  },
  description: 'Elevate your interview skills with AI-powered mock interviews. Get personalized coaching, real-time feedback, and boost your confidence.',
  keywords: [
    'AI interview preparation', 
    'mock interviews', 
    'interview coaching', 
    'career development', 
    'job interview help'
  ],
  authors: [{ name: 'RV AI Team' }],
  creator: 'RV AI',
  publisher: 'RV AI',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://RVai-eta.vercel.app/',
    title: 'RV AI - AI-Powered Interview Preparation',
    description: 'Elevate your interview skills with AI-powered mock interviews. Get personalized coaching, real-time feedback, and boost your confidence.',
    siteName: 'RV AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RV AI - Revolutionizing Interview Preparation'
      }
    ]
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'RV AI - AI-Powered Interview Preparation',
    description: 'Elevate your interview skills with AI-powered mock interviews. Get personalized coaching, real-time feedback, and boost your confidence.',
    creator: '@RVAI',
    images: ['/twitter-image.png']
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  
  verification: {
    google: 'your-google-site-verification-code',
    // Add other verification codes as needed
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html 
        lang="en" 
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <body 
          className={`
            antialiased 
            min-h-screen 
            flex 
            flex-col 
            bg-white 
            text-gray-900 
            font-sans
          `}
        >
          <a 
            href="#main-content" 
            className="
              absolute 
              top-[-999px] 
              left-[-999px] 
              z-[-1] 
              focus:top-0 
              focus:left-0 
              focus:z-50 
              p-4 
              bg-indigo-600 
              text-white
            "
          >
            Skip to main content
          </a>
          
          <Header />
          <Toaster />
          
          <main 
            id="main-content" 
            className="
              flex-grow 
              pt-16 
              sm:pt-20 
              max-w-7xl 
              mx-auto 
              w-full 
              px-4 
              sm:px-6 
              lg:px-8
            "
          >
            {children}
          </main>
          
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}