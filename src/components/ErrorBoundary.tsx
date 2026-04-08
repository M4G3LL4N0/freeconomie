"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ErrorBoundary({ error }: { error: Error }) {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-white/60">{error.message}</p>
      </div>
    </div>
  );
}
