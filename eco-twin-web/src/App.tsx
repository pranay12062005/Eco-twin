import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useUIStore } from './store/ui';

// Screens (placeholder — will be built in Phase 2)
import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import ClosetScreen from './screens/ClosetScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
});

function AppShell() {
  const { theme, accent } = useUIStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-accent', accent);
  }, [theme, accent]);

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/closet" element={<ClosetScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex justify-center bg-gray-900 min-h-screen">
          <div className="w-full max-w-[400px] h-[100dvh] relative overflow-hidden bg-[var(--bg)] shadow-2xl overflow-y-auto hide-scrollbar">
            <AppShell />
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
