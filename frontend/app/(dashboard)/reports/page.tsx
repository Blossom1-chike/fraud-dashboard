"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { initialReports, type Report } from "../../constants/dashboard";

const REPORT_TYPES = ["Fraud Summary", "Model Performance", "Fairness & Bias Audit"];
const DATE_RANGES = ["Last 7 days", "Last 30 days", "This quarter"];
const FORMATS: Report["type"][] = ["PDF", "CSV"];

const REPORT_TEMPLATES = [
  {
    icon: "📕",
    bg: "bg-coral-soft",
    title: "Confirmed Fraud Cases",
    sub: "PDF · Last 30 days",
  },
  {
    icon: "📗",
    bg: "bg-teal-soft",
    title: "Model Performance Summary",
    sub: "PDF · Q3 2026",
  },
  {
    icon: "📊",
    bg: "bg-amber-soft",
    title: "Fairness & Bias Audit",
    sub: "CSV · DIR / SPD / EOD",
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [type, setType] = useState(REPORT_TYPES[0]);
  const [range, setRange] = useState(DATE_RANGES[1]);
  const [format, setFormat] = useState<Report["type"]>("PDF");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setReports((prev) => [
        {
          name: `${type} — ${range}`,
          type: format,
          date: "Just now",
          by: "B. Adeyemi",
        },
        ...prev,
      ]);
      setGenerating(false);
    }, 1400);
  };

  return (
    <div>
      <h1 className="m-0 text-[23px] font-semibold">Reports</h1>
      <p className="mt-[5px] mb-5 text-[12.5px] text-ink-muted">
        Generate and download investigation summaries
      </p>

      <Card style="mb-5">
        <div className="mb-3.5 text-[12.5px] font-medium text-ink-muted">
          Generate a new report
        </div>
        <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2.5">
          <div>
            <label className="mb-1.5 block text-[11px] text-ink-faint">
              Report type
            </label>
            <Select value={type} onValueChange={(v) => v && setType(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REPORT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] text-ink-faint">
              Date range
            </label>
            <Select value={range} onValueChange={(v) => v && setRange(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DATE_RANGES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] text-ink-faint">
              Format
            </label>
            <Select
              value={format}
              onValueChange={(v) => v && setFormat(v as Report["type"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="whitespace-nowrap"
          >
            {generating ? "Generating…" : "Generate"}
          </Button>
        </div>
      </Card>

      <div className="mb-5 grid grid-cols-3 gap-3.5">
        {REPORT_TEMPLATES.map((r) => (
          <Card key={r.title}>
            <div
              className={`mb-3 flex h-8 w-8 items-center justify-center rounded-[9px] text-[15px] ${r.bg}`}
            >
              {r.icon}
            </div>
            <div className="mb-1 text-[13px] font-medium">{r.title}</div>
            <div className="text-[11.5px] text-ink-faint">{r.sub}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="mb-2 text-[12.5px] font-medium text-ink-muted">
          Recent reports
        </div>
        <Table className="border-collapse text-[12.5px]">
          <TableBody className="[&_tr:last-child]:border-t [&_tr:last-child]:border-border">
            {reports.map((r, i) => (
              <TableRow
                key={i}
                className="border-t border-b-0 border-border hover:bg-transparent"
              >
                <TableCell className="px-0 py-2.5">{r.name}</TableCell>
                <TableCell className="px-2 py-2.5">
                  <Badge
                    className={`h-auto w-fit rounded-full border-transparent px-[10px] py-[3px] text-[11px] font-normal ${
                      r.type === "PDF"
                        ? "bg-coral-soft text-coral"
                        : "bg-teal-soft text-teal"
                    }`}
                  >
                    {r.type}
                  </Badge>
                </TableCell>
                <TableCell className="px-2 py-2.5 text-ink-muted">
                  {r.date}
                </TableCell>
                <TableCell className="px-2 py-2.5 text-ink-muted">
                  {r.by}
                </TableCell>
                <TableCell className="px-0 py-2.5 text-right">
                  <button className="font-sans text-[12.5px] font-medium text-teal">
                    Download ⬇
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
