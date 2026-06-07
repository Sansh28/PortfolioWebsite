"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";

type ToastVariant = "success" | "error";

export type ToastState = {
  title: string;
  message: string;
  variant: ToastVariant;
} | null;

type ToastProps = {
  toast: ToastState;
  onClose: () => void;
};

export function Toast({ toast, onClose }: ToastProps) {
  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      onClose();
    }, 4200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [onClose, toast]);

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          className="fixed bottom-6 right-6 z-[80] w-[min(100%-2rem,24rem)] border border-bg-border/80 bg-bg-surface/95 p-4 backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <span
              className={`mt-0.5 inline-flex h-9 w-9 items-center justify-center ${
                toast.variant === "success"
                  ? "bg-accent-cyan/10 text-accent-cyan"
                  : "bg-red-500/10 text-red-300"
              }`}
            >
              {toast.variant === "success" ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-semibold text-text-primary">
                {toast.title}
              </p>
              <p className="mt-1 text-sm leading-6 text-text-muted">
                {toast.message}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center text-text-muted hover:bg-bg-border/70 hover:text-text-primary"
              aria-label="Close notification"
              data-cursor="hover"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
