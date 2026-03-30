import { motion } from 'framer-motion';
import { Download, RotateCcw } from 'lucide-react';
import { useUIStore } from '../store/ui';
import TopNav from '../components/TopNav';
import Toggle from '../components/Toggle';
import ColorSwatch from '../components/ColorSwatch';

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -20 },
};

const accents = [
  { id: 'green' as const, label: 'Eco Green', gradient: 'linear-gradient(135deg, #22A671, #147049)' },
  { id: 'orange' as const, label: 'Electric Orange', gradient: 'linear-gradient(135deg, #FF6B2C, #CC4D16)' },
  { id: 'amber' as const, label: 'Amber & Black', gradient: 'linear-gradient(135deg, #F5A623, #C4841A)' },
  { id: 'blue' as const, label: 'Ocean Blue', gradient: 'linear-gradient(135deg, #2E86DE, #1B5FA0)' },
];

export default function SettingsScreen() {
  const { theme, accent, setAccent, toggleTheme } = useUIStore();

  return (
    <motion.div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}
      variants={variants} initial="initial" animate="animate" exit="exit">

      <TopNav title="Settings" />

      <div className="flex-1 overflow-y-auto px-5 pb-8">

        {/* Theme & Accent */}
        <section className="mb-6 mt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 px-2" style={{ color: 'var(--text-tertiary)' }}>Theme & Accent</h3>
          <div className="rounded-2xl p-4 shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Dark Mode</span>
              <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
            </div>

            <div className="h-px my-4" style={{ background: 'var(--border-light)' }} />

            {/* Accent Swatches */}
            <div>
              <span className="text-sm font-medium block mb-3" style={{ color: 'var(--text-secondary)' }}>Accent Color</span>
              <div className="flex gap-4">
                {accents.map(a => (
                  <ColorSwatch
                    key={a.id}
                    color={a.id}
                    active={accent === a.id}
                    gradient={a.gradient}
                    onClick={() => setAccent(a.id)}
                  />
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Data & Storage */}
        <section className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 px-2" style={{ color: 'var(--text-tertiary)' }}>Data & Storage</h3>
          <div className="rounded-2xl overflow-hidden shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}>
            <button className="w-full flex items-center gap-3 px-4 py-4 bg-transparent border-0 cursor-pointer transition-colors hover:opacity-80"
              style={{ color: 'var(--primary)' }}>
              <Download className="w-5 h-5" />
              <span className="text-sm font-semibold">Export Data (JSON)</span>
            </button>
            <div className="h-px" style={{ background: 'var(--border-light)' }} />
            <button className="w-full flex items-center gap-3 px-4 py-4 bg-transparent border-0 cursor-pointer transition-colors hover:opacity-80"
              style={{ color: 'var(--danger)' }}>
              <RotateCcw className="w-5 h-5" />
              <span className="text-sm font-semibold">Reset All Data</span>
            </button>
          </div>
          <p className="text-xs text-center mt-3 mx-4" style={{ color: 'var(--text-tertiary)' }}>
            API connection pending. Exports and resets are currently local-only.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
