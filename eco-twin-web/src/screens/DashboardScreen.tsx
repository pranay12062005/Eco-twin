import { motion } from 'framer-motion';
import { Shirt, HandCoins, LeafyGreen, ReplaceAll } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import TopNav from '../components/TopNav';
import StatCard from '../components/StatCard';

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -20 },
};

// Mock Data for now (until React Query is wired)
const mockStats = {
  totalItems: 42,
  sustainabilityScore: 78,
  totalValue: 1250,
  totalWears: 312,
  savings: { co2SavedStr: '45.2kg', moneySavedStr: '$120' }
};

export default function DashboardScreen() {
  return (
    <motion.div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}
      variants={variants} initial="initial" animate="animate" exit="exit">

      <TopNav title="Analytics" showBack={false} />

      <div className="flex-1 overflow-y-auto px-5 pb-24">

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard icon={<Shirt className="w-5 h-5" />} label="Items" value={mockStats.totalItems} delay={0.1} />
          <StatCard icon={<LeafyGreen className="w-5 h-5 text-green-500" />} label="Eco Score" value={`${mockStats.sustainabilityScore}%`} delay={0.2} />
          <StatCard icon={<HandCoins className="w-5 h-5 text-amber-500" />} label="Value" value={`$${mockStats.totalValue}`} delay={0.3} />
          <StatCard icon={<ReplaceAll className="w-5 h-5 text-blue-500" />} label="Wears" value={mockStats.totalWears} delay={0.4} />
        </div>

        {/* Savings Tracker */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold tracking-wider uppercase mb-3 px-2" style={{ color: 'var(--text-tertiary)' }}>Impact Savings</h3>
          <div className="rounded-3xl p-5 relative overflow-hidden text-white"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', boxShadow: '0 8px 30px rgba(34,166,113,0.15)' }}>

            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 pointer-events-none" />

            <div className="flex justify-between items-center relative z-10">
              <div>
                <div className="text-sm font-medium opacity-90 mb-1">CO₂ Prevented</div>
                <div className="text-3xl font-black">{mockStats.savings.co2SavedStr}</div>
              </div>
              <div className="h-10 w-px bg-white opacity-20 mx-4" />
              <div>
                <div className="text-sm font-medium opacity-90 mb-1">Money Saved</div>
                <div className="text-3xl font-black">{mockStats.savings.moneySavedStr}</div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/20 relative z-10">
              <p className="text-xs font-medium opacity-90">
                You've avoided buying 3 unnecessary items this month! 🎉
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </motion.div>
  );
}
