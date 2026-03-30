import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Accent = 'green' | 'orange' | 'amber' | 'blue';
type SortKey = 'newest' | 'eco' | 'name' | 'wears';
type Theme = 'light' | 'dark';

interface UIStore {
  theme: Theme;
  accent: Accent;
  activeCategory: string;
  sortBy: SortKey;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setAccent: (a: Accent) => void;
  setCategory: (c: string) => void;
  setSortBy: (s: SortKey) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      accent: 'green',
      activeCategory: 'All',
      sortBy: 'newest',

      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      },
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        set({ theme: next });
      },
      setAccent: (accent) => {
        document.documentElement.setAttribute('data-accent', accent);
        set({ accent });
      },
      setCategory: (activeCategory) => set({ activeCategory }),
      setSortBy: (sortBy) => set({ sortBy }),
    }),
    { name: 'eco-twin-ui' }
  )
);
