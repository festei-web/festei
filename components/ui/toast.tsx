"use client";

import * as React from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  show: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5 text-success" aria-hidden />,
  error: <XCircle className="h-5 w-5 text-error" aria-hidden />,
  info: <Info className="h-5 w-5 text-info" aria-hidden />,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const show = React.useCallback((message: string, variant: ToastVariant = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, variant }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 4500);
  }, []);

  const dismiss = (id: number) => setToasts((t) => t.filter((toast) => toast.id !== id));

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        className="fixed inset-x-0 bottom-4 z-[700] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:px-6"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cn(
              "flex w-full max-w-sm items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-lg",
              "animate-in slide-in-from-bottom-2 fade-in duration-200"
            )}
          >
            {icons[t.variant]}
            <p className="flex-1 text-sm text-ink">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Fechar notificação"
              className="text-gray-medium hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast deve ser usado dentro de ToastProvider");
  return ctx;
}
