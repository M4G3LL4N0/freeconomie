import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { MapPin, List, PlusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "FreeWash Finder",
  description: "The Google Maps of free value. Discover verified free car washes, trials, and perks near you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-background text-foreground">
        <div className="flex flex-col min-h-full">
          <header className="border-b border-foreground/10">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex items-center justify-between">
                <Link href="/" className="text-lg font-semibold">
                  FreeWash Finder
                </Link>
                <div className="flex gap-4">
                  <Link 
                    href="/map" 
                    className="flex items-center gap-1 hover:text-foreground/80 data-[active=true]:text-foreground data-[active=true]:font-medium"
                  >
                    <MapPin className="h-4 w-4" />
                    Map
                  </Link>
                  <Link 
                    href="/list" 
                    className="flex items-center gap-1 hover:text-foreground/80 data-[active=true]:text-foreground data-[active=true]:font-medium"
                  >
                    <List className="h-4 w-4" />
                    List
                  </Link>
                  <Link 
                    href="/submit" 
                    className="flex items-center gap-1 hover:text-foreground/80 data-[active=true]:text-foreground data-[active=true]:font-medium"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Submit
                  </Link>
                </div>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
