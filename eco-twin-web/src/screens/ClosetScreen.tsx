import { motion } from 'framer-motion';
import { Plus, Filter } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ScoreBar from '../components/ScoreBar';

const variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: -20 },
};

// Mock data until useCloset() React Query hook is wired
const mockItems = [
  { id: '1', name: 'Vintage Denim Jacket', category: 'Outerwear', ecoScore: 85, imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=400', verdict: 'go' },
  { id: '2', name: 'Organic Cotton Tee', category: 'Tops', ecoScore: 92, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400', verdict: 'go' },
  { id: '3', name: 'Fast Fashion Jeans', category: 'Bottoms', ecoScore: 35, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400', verdict: 'stop' },
];

export default function ClosetScreen() {
  return (
    <motion.div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}
      variants={variants} initial="initial" animate="animate" exit="exit">

      {/* Top Header */}
      <div className="flex items-center justify-between px-5 py-4 pt-12 sticky top-0 z-40"
        style={{ background: 'var(--bg-nav)', backdropFilter: 'blur(24px)', borderBottom: '1px solid var(--border-light)' }}>
        <div>
          <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>My Closet</h1>
          <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            {mockItems.length} items logged
          </p>
        </div>

        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center border-0 cursor-pointer"
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}>
            <Filter className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center border-0 cursor-pointer text-white"
            style={{ background: 'var(--primary)', boxShadow: '0 4px 12px rgba(34,166,113,0.3)' }}>
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-5 py-6 pb-24 relative">
        <div className="grid grid-cols-2 gap-4">
          {mockItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="rounded-3xl overflow-hidden cursor-pointer relative group"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
            >
              <div className="h-40 relative">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                {/* Verdict Dot */}
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full shadow-[0_0_0_2px_rgba(255,255,255,0.9)]"
                  style={{
                    background: item.verdict === 'go' ? 'var(--primary)' :
                      item.verdict === 'caution' ? '#F5A623' : 'var(--danger)'
                  }}
                />

                <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase text-white shadow-sm"
                  style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                  {item.category}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold mb-3 truncate" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
                <ScoreBar score={item.ecoScore} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </motion.div>
  );
}
