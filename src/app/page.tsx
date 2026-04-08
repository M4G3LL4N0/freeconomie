import Link from "next/link";

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
                className="w-full p-4 rounded-lg border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-foreground/50"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground text-background px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
                Search
              </button>
            </div>
            
            <div className="grid gap-6 mb-12">
              <Link 
                href="/map" 
                className="p-6 rounded-lg bg-foreground text-background hover:bg-opacity-90 transition-colors text-center"
              >
                View Map
              </Link>
              <Link
                href="/list"
                className="p-6 rounded-lg border border-foreground/10 hover:bg-foreground/5 transition-colors text-center"
              >
                Browse Listings
              </Link>
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
