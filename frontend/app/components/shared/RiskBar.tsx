type RiskBarProps = {
  pct: number;
};

function RiskBar({ pct }: RiskBarProps) {
  const color =
    pct >= 70
      ? "bg-coral"
      : pct >= 40
      ? "bg-amber"
      : "bg-mint";

  return (
    <div className="h-[5px] w-[56px] overflow-hidden rounded-full bg-border">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default RiskBar;