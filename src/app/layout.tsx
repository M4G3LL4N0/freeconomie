import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { MapPin, List, PlusCircle, Sun, Moon } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Freeconomie | The OS for Free Value",
  description: "Discover verified high-value free offerings - starting with premium car washes and expanding to trials, corporate perks, and public goods.",
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
                  FreeWash Finder
                </Link>
                <nav aria-label="Primary navigation">
                  <ul className="flex items-center gap-4">
                    <li>
                      <ThemeToggle />
                    </li>
                    <li>
                      <Link 
                        href="/map" 
                        className="flex items-center gap-1 hover:text-foreground/80 data-[active=true]:text-foreground data-[active=true]:font-medium"
                      >
                        <MapPin className="h-4 w-4" />
                        <span>Map</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/list" 
                        className="flex items-center gap-1 hover:text-foreground/80 data-[active=true]:text-foreground data-[active=true]:font-medium"
                      >
                        <List className="h-4 w-4" />
                        <span>List</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/submit" 
                        className="flex items-center gap-1 hover:text-foreground/80 data-[active=true]:text-foreground data-[active=true]:font-medium"
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span>Submit</span>
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
