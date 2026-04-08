import Link from "next/link";
import { MapPin, List, PlusCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">
              Free Car Washes Near You
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 text-center">
              Discover 100% verified free car washes, trials, and perks in your area.
            </p>
            
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Enter your location..."
                className="w-full p-4 pl-10 rounded-lg border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-foreground/50"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground text-background px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Search
              </button>
            </div>
            
            <div className="grid gap-4 mb-12">
              <Link 
                href="/map" 
                className="flex items-center justify-center gap-2 p-6 rounded-lg bg-foreground text-background hover:bg-opacity-90 transition-colors text-center font-medium"
              >
                <MapPin className="h-5 w-5" />
                View Interactive Map
              </Link>
              <Link
                href="/list"
                className="flex items-center justify-center gap-2 p-6 rounded-lg border border-foreground/10 hover:bg-foreground/5 transition-colors text-center font-medium"
              >
                <List className="h-5 w-5" />
                Browse All Listings
              </Link>
            </div>

            <div className="my-12 p-6 bg-foreground/5 rounded-lg border border-foreground/10">
              <h3 className="text-xl font-semibold mb-4 text-center">Trusted by Drivers Nationwide</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-background">
                  <p className="italic">"Saved me $20/month on car washes!"</p>
                  <p className="mt-2 text-sm text-foreground/60">- Sarah, Portland</p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                  <p className="italic">"Found 3 free washes near my office."</p>
                  <p className="mt-2 text-sm text-foreground/60">- Michael, Chicago</p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                  <p className="italic">"Perfect for trying new car washes."</p>
                  <p className="mt-2 text-sm text-foreground/60">- David, Austin</p>
                </div>
              </div>
            </div>

            <div className="text-center text-zinc-500 dark:text-zinc-400 text-sm">
              <p>Have a free wash to share?</p>
              <Link 
                href="/submit" 
                className="underline hover:text-foreground transition-colors"
              >
                Submit a location
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
