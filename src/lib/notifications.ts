import toast from "react-hot-toast";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";

export const showSuccess = (message: string) => {
  toast.custom((t) => (
    <div className={`rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-emerald-100 backdrop-blur-sm flex items-center gap-2 transition-all ${t.visible ? 'animate-in fade-in' : 'animate-out fade-out'}`}>
      <CheckCircle className="h-5 w-5 text-emerald-300" />
      <span>{message}</span>
    </div>
  ), {
    position: 'bottom-center',
    duration: 3000
  });
};

export const showError = (message: string) => {
  toast.custom((t) => (
    <div className={`rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-rose-100 backdrop-blur-sm flex items-center gap-2 transition-all ${t.visible ? 'animate-in fade-in' : 'animate-out fade-out'}`}>
      <XCircle className="h-5 w-5 text-rose-300" />
      <span>{message}</span>
    </div>
  ), {
    position: 'bottom-center',
    duration: 4000
  });
};

export const showLoading = (message: string) => {
  return toast.custom((t) => (
    <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-cyan-100 backdrop-blur-sm flex items-center gap-2">
      <RefreshCw className="h-5 w-5 animate-spin text-cyan-300" />
      <span>{message}</span>
    </div>
  ), {
    position: 'bottom-center',
    duration: Infinity
  });
};
