"use client"
import { Bell, Search } from "lucide-react";
import Card from "@/components/Card";
import { initialTransactions, stats } from "../../constants/dashboard";
import FraudTrendChart from "@/components/charts/FraudTrendChart";
import PredictionDistribution from "@/components/charts/PredictionDistributionChart";
import RiskDistributionChart from "@/components/charts/RiskDistributionChart";
import TransactionTypesChart from "@/components/charts/TransactionTypesChart";
import { columns, Transaction } from "./columns";
import DataTable from "@/components/Table";

const Dashboard = () => {
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
          <div className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Search transactions...</span>
          </div>

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
            data={initialTransactions}
          />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
