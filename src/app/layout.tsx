import type { Metadata } from "next";
import "./globals.css";

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
          {children}
        </div>
      </body>
    </html>
  );
}
