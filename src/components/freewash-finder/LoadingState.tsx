import { RefreshCw } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export default function LoadingState({ 
  message = "Loading...", 
  className = "" 
}: LoadingStateProps) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm flex items-center gap-3 ${className}`}>
      <RefreshCw className="h-5 w-5 animate-spin text-white" />
      <span className="text-white/80">{message}</span>
    </div>
  );
}
