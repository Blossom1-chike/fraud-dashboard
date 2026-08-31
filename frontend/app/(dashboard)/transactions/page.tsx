"use client";
import { useState } from "react";
import { initialTransactions } from "../../constants/dashboard";
import { Button } from "@/components/ui/button";
import DataTable from "../../components/Table";
import { columns, type Transaction } from "../dashboard/columns";
import Card from "@/components/Card";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const Transaction = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const filtered = initialTransactions.filter((t) =>
    (t.id + t.corridor + t.type).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <div>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="m-0 text-[23px] font-semibold">Transactions</h1>
            <p className="mt-[5px] text-[12.5px] text-ink-muted">
              {initialTransactions.length + 128397} records across 6 uploaded
              datasets
            </p>
          </div>
          <Button onClick={() => {}}>⇧ Upload CSV</Button>
        </div>

        <div className="mb-4 flex grid grid-cols-3 gap-2.5">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search by ID, corridor, or type..."
            className="flex-1 min-w-[220px] col-span-2 bg-white"
          />
          <div className="flex flex-row gap-4 justify-end items-center">
            <Select value={""} onValueChange={(v) => {}}>
              <SelectTrigger>
                <SelectValue placeholder="Dataset: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"> Dataset: All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={""} onValueChange={(v) => {}}>
              <SelectTrigger>
                <SelectValue placeholder="Corridor: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"> Dataset: All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-1">
          <Card>
            <DataTable<Transaction> columns={columns} data={filtered} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
