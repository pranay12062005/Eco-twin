import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastStore {
  toasts: (ToastOptions & { id: number })[];
  showToast: (options: ToastOptions) => void;
  removeToast: (id: number) => void;
}

let toastId = 0;

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  showToast: (options) => {
    const id = ++toastId;
    set((state) => ({ toasts: [...state.toasts, { ...options, id, type: options.type || 'info', duration: options.duration || 3000 }] }));
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

// The global provider that should be rendered once in App.tsx
export function ToastProvider() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-12 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: any; onRemove: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, toast.duration);
    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  const Icon = toast.type === 'success' ? CheckCircle2 : toast.type === 'error' ? AlertCircle : Info;
  const color = toast.type === 'success' ? 'var(--primary)' : toast.type === 'error' ? 'var(--danger)' : 'var(--text-primary)';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg pointer-events-auto"
      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
    >
      <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />
      <span className="text-sm font-medium">{toast.message}</span>
    </motion.div>
  );
}
