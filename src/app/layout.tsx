import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { MapPin, List, PlusCircle, Sun, Moon, Home } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "FreeWash Finder | Verified Bay Area Car Washes",
  description: "Discover premium verified free car washes in the Bay Area. Part of the Freeconomie network - surfacing high-value free opportunities with rigorous verification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-background text-foreground">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        <div id="main-content" className="flex flex-col min-h-full">
          <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071120]/90 backdrop-blur-xl">
            <div className="container mx-auto px-6 py-4">
              <nav className="flex items-center justify-between gap-6">
                <Link href="/" className="text-lg font-semibold">
                  <span className="font-semibold">FreeWash Finder</span>
                  <span className="text-white/50"> by Freeconomie</span>
                </Link>
                <nav aria-label="Primary navigation">
                  <ul className="flex items-center gap-4">
                    <li>
                      <ThemeToggle />
                    </li>
                    <li>
                      <Link 
                        href="/" 
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 data-[active=true]:bg-white/10"
                      >
                        <Home className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only">Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/map" 
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 data-[active=true]:bg-white/10"
                      >
                        <MapPin className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only">Map</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/list" 
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 data-[active=true]:bg-white/10"
                      >
                        <List className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only">List</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/submit" 
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 data-[active=true]:bg-white/10"
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only">Submit</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
