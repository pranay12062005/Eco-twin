interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-12 h-7 rounded-full relative cursor-pointer border-0 transition-colors duration-300"
      style={{ background: checked ? 'var(--primary)' : 'var(--border)' }}
    >
      <div
        className="w-5 h-5 rounded-full bg-white absolute top-1 transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
        style={{ left: checked ? '26px' : '4px' }}
      />
    </button>
  );
}
