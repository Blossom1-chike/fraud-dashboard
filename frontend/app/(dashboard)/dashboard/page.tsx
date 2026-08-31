"use client"
import { useState } from "react";
import { Bell, Search } from "lucide-react";
import Card from "@/components/Card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { initialTransactions, stats } from "../../constants/dashboard";
import FraudTrendChart from "@/components/charts/FraudTrendChart";
import PredictionDistribution from "@/components/charts/PredictionDistributionChart";
import RiskDistributionChart from "@/components/charts/RiskDistributionChart";
import TransactionTypesChart from "@/components/charts/TransactionTypesChart";
import { columns, Transaction } from "./columns";
import DataTable from "@/components/Table";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [prediction, setPrediction] = useState("all");

  const filteredTransactions = initialTransactions
    .filter((t) =>
      (t.id + t.source + t.prediction + t.status)
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .filter((t) => prediction === "all" || t.prediction === prediction);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back - here&apos;s today&apos;s fraud activity
          </p>
        </div>
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search transactions..."
              className="w-64 pl-9"
            />
          </div>

          <Select
            value={prediction}
            onValueChange={(value) => setPrediction(value ?? "all")}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Prediction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All predictions</SelectItem>
              <SelectItem value="Fraud">Fraud</SelectItem>
              <SelectItem value="Needs review">Needs review</SelectItem>
              <SelectItem value="Legitimate">Legitimate</SelectItem>
            </SelectContent>
          </Select>

          <button className="flex h-9 w-9 items-center justify-center rounded-xl border">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map(([label, value, valueColor, sub, subColor]) => (
          <Card key={label}>
            <div className="mb-2 text-xs text-ink-muted">{label}</div>

            <div className={`text-2xl font-semibold ${valueColor}`}>
              {value}
            </div>

            <div className={`mt-1 text-[11px] ${subColor}`}>{sub}</div>
          </Card>
        ))}
      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <p className="mb-4 text-sm text-ink-muted">
            Fraud trend - last 14 days
          </p>

          <FraudTrendChart />
        </Card>
        <Card>
          <p className="mb-4 text-sm text-ink-muted">Prediction distribution</p>

          <PredictionDistribution />
        </Card>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4">
        <Card>
          <div className="mb-1 text-xs font-medium text-ink-muted">
            Risk distribution
          </div>

          <div className="mb-2 text-[10.5px] text-ink-faint">
            Share of transactions by risk band
          </div>
          <RiskDistributionChart />
        </Card>
        <Card>
          <div className="mb-1 text-[12.5px] font-medium text-[var(--ink-muted)]">
            Transaction types
          </div>

          <div className="mb-1.5 text-[10.5px] text-[var(--ink-faint)]">
            Volume by PaySim transaction category
          </div>
          <TransactionTypesChart />
        </Card>
      </div>

      <div className="mb-5 grid grid-cols-1 ">
        <Card>
          <DataTable<Transaction>
            columns={columns}
            data={filteredTransactions}
          />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
