import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shrynk - Browser-based Video Compression",
  description: "Compress videos in your browser with no quality loss. Fast, private, and secure.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    type: "website",
    title: "Shrynk - Browser-based Video Compression",
    description: "Compress videos in your browser with no quality loss. Fast, private, and secure.",
    siteName: "Shrynk"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} flex min-h-screen flex-col bg-gray-50`}>
        {/* Navigation */}
        <header className="fixed inset-x-0 top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-xl font-bold text-gray-900">Shrynk</span>
              </Link>
            </div>
            {/* <div className="flex gap-x-12">
              <Link 
                href="/video" 
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
              >
                Compress Video
              </Link>
              <a 
                href="https://github.com/ParasRaina01/shrynk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
              >
                GitHub
              </a>
            </div> */}
            <div className="lg:flex lg:flex-1 lg:justify-end">
              <Link
                href="/video"
                className="rounded-md bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Toast notifications */}
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#fff',
              borderRadius: '0.5rem',
            },
          }}
        />
      </body>
    </html>
  );
}
