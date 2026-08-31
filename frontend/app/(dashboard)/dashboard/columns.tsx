import StatusBadge from "@/components/shared/StatusBadge";
import RiskBar from "@/components/shared/RiskBar";
import Link from "next/link";

export type Transaction = {
  id: string;
  amount: string;
  source: string;
  corridor: string;
  type: string;
  risk: number;
  prediction: string;
  status: string;
};

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

export const columns: Column<Transaction>[] = [
  {
    key: "id",
    label: "Transaction",
    render: (row) => (
      <Link
        href={`/investigation/${row.id}`}
        className="border-none bg-transparent p-0 font-medium text-teal"
      >
        {row.id} · {row.amount}
      </Link>
    ),
  },
  {
    key: "source",
    label: "Source",
  },
  {
    key: "risk",
    label: "Risk",
    render: (row) => <RiskBar pct={row.risk} />,
  },
  {
    key: "prediction",
    label: "Prediction",
    render: (row) => (
      <span
        className={
          row.prediction === "Fraud"
            ? "font-medium text-coral"
            : "font-medium text-teal"
        }
      >
        {row.prediction}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => <StatusBadge status={row.status} />,
  },
];
