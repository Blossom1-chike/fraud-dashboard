import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: string;
};

function StatusBadge({ status }: StatusBadgeProps) {
  const map: Record<string, [string, string]> = {
    Pending: ["bg-amber-soft", "text-amber"],
    "Confirmed Fraud": ["bg-coral-soft", "text-coral"],
    "False Positive": ["bg-teal-soft", "text-teal"],
    "Needs Investigation": ["bg-amber-soft", "text-amber"],
    Resolved: ["bg-teal-soft", "text-teal"],
    Active: ["bg-teal-soft", "text-mint"],
    Disabled: ["bg-[#EFECE3]", "text-ink-faint"],
  };

  const [bg, color] = map[status] ?? ["bg-teal-soft", "text-teal"];

  return (
    <Badge
      className={`h-auto w-fit rounded-full border-transparent px-[10px] py-[3px] text-[11px] font-normal ${bg} ${color}`}
    >
      {status}
    </Badge>
  );
}

export default StatusBadge;
