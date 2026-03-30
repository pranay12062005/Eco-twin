interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  delay?: number;
}

export default function StatCard({ icon, label, value, subValue, delay = 0 }: StatCardProps) {
  return (
    <div
      className="p-4 rounded-3xl flex flex-col justify-between"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
        animation: `fadeInUp 0.5s ease-out ${delay}s both`
      }}
    >
      <div className="flex items-center gap-2 mb-4" style={{ color: 'var(--text-tertiary)' }}>
        <div className="p-2 rounded-xl" style={{ background: 'var(--bg)' }}>
          {icon}
        </div>
        <span className="text-xs font-semibold tracking-wide uppercase">{label}</span>
      </div>
      <div>
        <div className="text-2xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>{value}</div>
        {subValue && (
          <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            {subValue}
          </div>
        )}
      </div>
    </div>
  );
}
