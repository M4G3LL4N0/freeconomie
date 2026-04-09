"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { captureEvent } from "@/lib/analytics";

export default function ErrorBoundary({ error }: { error: Error }) {
  useEffect(() => {
    toast.error(error.message);
    captureEvent('error_boundary', {
      message: error.message,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-white/60">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
