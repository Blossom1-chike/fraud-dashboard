"use client";

import { useState } from "react";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { initialAudit } from "../../constants/dashboard";

const FILTERS = ["All events", "Logins", "Uploads", "Status changes", "Users"];

export default function AuditLogPage() {
  const [filter, setFilter] = useState("All events");
  const filtered =
    filter === "All events"
      ? initialAudit
      : initialAudit.filter((e) => e.category === filter);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="m-0 text-[23px] font-semibold">Audit Log</h1>
          <p className="mt-[5px] text-[12.5px] text-ink-muted">
            Every significant action, in order — for compliance &amp; review
          </p>
        </div>
        <Button variant="outline">Export CSV ⬇</Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 font-sans text-[12.5px] ${
              filter === f
                ? "bg-teal font-medium text-white"
                : "border border-border bg-transparent font-normal text-ink-muted"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <Card>
        {filtered.length === 0 && (
          <div className="py-5 text-center text-[12.5px] text-ink-faint">
            No events in this category yet.
          </div>
        )}
        {filtered.map((ev, i) => (
          <div
            key={i}
            className={`flex gap-3.5 py-3.5 ${
              i < filtered.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${ev.dot}`} />
            <div className="flex-1">
              <div className="text-[12.5px]">{ev.text}</div>
              <div className="text-[11px] text-ink-faint">{ev.meta}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
