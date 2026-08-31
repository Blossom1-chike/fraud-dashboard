"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Card from "@/components/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const MODELS = ["XGBoost", "LSTM", "Random Forest", "Logistic Reg."] as const;

const METRICS_BY_MODEL: Record<
  (typeof MODELS)[number],
  { spd: number; eod: number; dir: number; fpr: number }
> = {
  XGBoost: { spd: -0.11, eod: 0.07, dir: 0.686, fpr: 0.0021 },
  LSTM: { spd: -0.06, eod: 0.04, dir: 0.81, fpr: 0.0034 },
  "Random Forest": { spd: -0.14, eod: 0.09, dir: 0.62, fpr: 0.0001 },
  "Logistic Reg.": { spd: -0.19, eod: 0.13, dir: 0.54, fpr: 0.0092 },
};

const SUBGROUPS = [
  { type: "TRANSFER", volume: "42%", fpr: "0.31%", flagRate: "9.8%", flag: true },
  { type: "CASH_OUT", volume: "18%", fpr: "0.18%", flagRate: "5.2%", flag: false },
  { type: "PAYMENT", volume: "31%", fpr: "0.09%", flagRate: "1.4%", flag: false },
  { type: "DEBIT", volume: "9%", fpr: "0.12%", flagRate: "2.1%", flag: false },
];

export default function FairnessAuditPage() {
  const [model, setModel] = useState<(typeof MODELS)[number]>("XGBoost");
  const m = METRICS_BY_MODEL[model];

  const metricDefs = [
    {
      key: "spd",
      label: "Statistical Parity Difference",
      value: m.spd,
      range: [-0.1, 0.1] as const,
      desc: "Difference in flag rate: TRANSFER vs. other transaction types",
      fmt: (v: number) => v.toFixed(2),
    },
    {
      key: "eod",
      label: "Equal Opportunity Difference",
      value: m.eod,
      range: [-0.1, 0.1] as const,
      desc: "Gap in true-positive rate across transaction types",
      fmt: (v: number) => v.toFixed(2),
    },
    {
      key: "dir",
      label: "Disparate Impact Ratio",
      value: m.dir,
      range: [0.8, 1.25] as const,
      desc: "TRANSFER transactions flagged relative to baseline rate",
      fmt: (v: number) => v.toFixed(3),
    },
    {
      key: "fpr",
      label: "False Positive Rate",
      value: m.fpr,
      range: [0, 0.01] as const,
      desc: "Share of legitimate transactions incorrectly flagged",
      fmt: (v: number) => v.toFixed(4),
    },
  ];

  return (
    <div>
      <h1 className="m-0 text-[23px] font-semibold">Fairness &amp; Bias Audit</h1>
      <p className="mt-[5px] mb-[18px] text-[12.5px] text-ink-muted">
        SPD, EOD, DIR &amp; False Positive Rate — audited by transaction type,
        per model
      </p>

      <div className="mb-[18px] flex flex-wrap gap-2">
        {MODELS.map((mo) => (
          <button
            key={mo}
            onClick={() => setModel(mo)}
            className={`rounded-full px-3.5 py-1.5 font-sans text-[12.5px] ${
              model === mo
                ? "bg-teal font-medium text-white"
                : "border border-border bg-transparent font-normal text-ink-muted"
            }`}
          >
            {mo}
          </button>
        ))}
      </div>

      {m.dir < 0.8 && (
        <div className="mb-[18px] flex gap-2.5 rounded-xl border border-coral/30 bg-coral-soft px-4 py-3">
          <span className="text-[15px] text-coral">⚠</span>
          <div>
            <div className="text-[13px] font-semibold text-coral">
              Bias flag — TRANSFER transactions ({model})
            </div>
            <div className="mt-0.5 text-[11.5px] text-ink-muted">
              DIR = {m.dir.toFixed(3)}, below the 0.8 fairness floor.
              TRANSFER-type transactions are being flagged disproportionately
              often relative to other types.
            </div>
          </div>
        </div>
      )}

      <div className="mb-5 grid grid-cols-4 gap-3.5">
        {metricDefs.map((d) => {
          const inRange = d.value >= d.range[0] && d.value <= d.range[1];
          const span = d.range[1] - d.range[0];
          const pct = Math.max(
            2,
            Math.min(98, ((d.value - d.range[0]) / span) * 100)
          );
          return (
            <Card key={d.key}>
              <div className="mb-2 text-[11px] text-ink-muted">{d.label}</div>
              <div
                className={`mb-2.5 font-serif text-[22px] font-semibold ${
                  inRange ? "text-teal" : "text-coral"
                }`}
              >
                {d.fmt(d.value)}
              </div>
              <div className="relative mb-2 h-1.5 rounded-full bg-border">
                <div
                  className={`h-full rounded-full ${
                    inRange ? "bg-teal" : "bg-coral"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-[10.5px] text-ink-faint">{d.desc}</div>
            </Card>
          );
        })}
      </div>

      <Card style="mb-3.5">
        <div className="mb-1 text-[12.5px] font-medium text-ink-muted">
          False Positive Rate by transaction type
        </div>
        <div className="mb-2.5 text-[10.5px] text-ink-faint">
          Where fairness gaps show up most concretely — {model}
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart
            layout="vertical"
            data={SUBGROUPS.map((s) => ({
              type: s.type,
              fpr: parseFloat(s.fpr),
              flag: s.flag,
            }))}
            margin={{ top: 4, right: 20, left: 8, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fontSize: 10.5, fill: "var(--color-ink-muted)" }}
              axisLine={{ stroke: "var(--color-border)" }}
              tickLine={false}
              unit="%"
            />
            <YAxis
              type="category"
              dataKey="type"
              tick={{ fontSize: 11, fill: "var(--color-ink-muted)" }}
              axisLine={false}
              tickLine={false}
              width={70}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid var(--color-border)",
                fontSize: 12,
              }}
              formatter={(v) => [`${v}%`, "False Positive Rate"]}
            />
            <Bar dataKey="fpr" radius={[0, 6, 6, 0]}>
              {SUBGROUPS.map((s, i) => (
                <Cell
                  key={i}
                  fill={s.flag ? "var(--color-coral)" : "var(--color-teal)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <div className="mb-2 text-[12.5px] font-medium text-ink-muted">
          Breakdown by transaction type — {model}
        </div>
        <Table className="border-collapse text-[12.5px]">
          <TableHeader className="[&_tr]:border-b-0">
            <TableRow className="border-b-0 hover:bg-transparent">
              <TableHead className="h-auto px-0 pb-2 text-left text-[10.5px] font-medium uppercase text-ink-faint">
                Type
              </TableHead>
              <TableHead className="h-auto px-2 pb-2 text-left text-[10.5px] font-medium uppercase text-ink-faint">
                Volume share
              </TableHead>
              <TableHead className="h-auto px-2 pb-2 text-left text-[10.5px] font-medium uppercase text-ink-faint">
                False Positive Rate
              </TableHead>
              <TableHead className="h-auto px-0 pb-2 text-left text-[10.5px] font-medium uppercase text-ink-faint">
                Flag rate
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border-t [&_tr:last-child]:border-border">
            {SUBGROUPS.map((s) => (
              <TableRow
                key={s.type}
                className="border-t border-b-0 border-border hover:bg-transparent"
              >
                <TableCell className="px-0 py-2.5">
                  {s.type}{" "}
                  {s.flag && (
                    <Badge className="h-auto w-fit rounded-full border-transparent bg-coral-soft px-[10px] py-[3px] text-[11px] font-normal text-coral">
                      flagged
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="px-2 py-2.5 text-ink-muted">
                  {s.volume}
                </TableCell>
                <TableCell className="px-2 py-2.5 text-ink-muted">
                  {s.fpr}
                </TableCell>
                <TableCell
                  className={`px-0 py-2.5 ${
                    s.flag ? "font-semibold text-coral" : "text-ink-muted"
                  }`}
                >
                  {s.flagRate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
