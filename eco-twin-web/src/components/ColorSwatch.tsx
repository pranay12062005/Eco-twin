interface ColorSwatchProps {
  active: boolean;
  onClick: () => void;
  gradient: string;
}

export default function ColorSwatch({ active, onClick, gradient }: ColorSwatchProps) {
  return (
    <button
      onClick={onClick}
      className={`w-11 h-11 rounded-full cursor-pointer relative transition-transform duration-300 ${active ? 'scale-110' : ''}`}
      style={{
        background: gradient,
        border: active ? '3px solid var(--text-primary)' : '3px solid transparent',
        boxShadow: active ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
      }}>
      {active && (
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>✓</span>
      )}
    </button>
  );
}
