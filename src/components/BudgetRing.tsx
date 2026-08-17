type Props = { budget: number; spent: number };

export default function BudgetRing({ budget, spent }: Props) {
  const r = 70, c = 2 * Math.PI * r;
  const pct = budget > 0 ? Math.min(spent / budget, 1) : 0;

  return (
    <svg width={180} height={180} viewBox="0 0 180 180" className="flex-shrink-0">
      <circle cx={90} cy={90} r={r} fill="none" stroke="#3a3a44" strokeWidth={14} />
      <circle
        cx={90} cy={90} r={r} fill="none"
        stroke="#34d399" strokeWidth={14} strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
        transform="rotate(-90 90 90)"
      />
      <text x={90} y={84} textAnchor="middle" fill="#fff" fontSize={26} fontWeight={600}>
        {Math.round(pct * 100)}%
      </text>
      <text x={90} y={106} textAnchor="middle" fill="#9ca3af" fontSize={12}>
        of budget used
      </text>
    </svg>
  );
}