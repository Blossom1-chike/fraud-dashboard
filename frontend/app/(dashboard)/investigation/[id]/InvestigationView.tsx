"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import type { Transaction } from "../../dashboard/columns";

type StatusAction = {
  label: string;
  status: string;
  tone: "danger" | "neutral";
};

const STATUS_ACTIONS: StatusAction[] = [
  { label: "Confirm as Fraud", status: "Confirmed Fraud", tone: "danger" },
  { label: "Mark False Positive", status: "False Positive", tone: "neutral" },
  { label: "Needs Investigation", status: "Needs Investigation", tone: "neutral" },
];

const FEATURES: [string, number, string][] = [
  ["New beneficiary account", 78, "+0.31"],
  ["Amount z-score (3.1σ above avg)", 60, "+0.24"],
  ["Odd transaction hour (03:14 AM)", 45, "+0.18"],
  ["Account tenure (> 2 years)", 22, "−0.09"],
];

type ConfirmState = {
  title: string;
  body: string;
  tone: "danger" | "default";
  confirmLabel: string;
  status: string;
};

export default function InvestigationView({
  transaction,
}: {
  transaction: Transaction | null;
}) {
  const [status, setStatus] = useState(transaction?.status ?? "");
  const [confirmDialog, setConfirmDialog] = useState<ConfirmState | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  if (!transaction) {
    return (
      <p className="text-[13px] text-ink-muted">
        No transaction selected —{" "}
        <Link href="/transactions" className="text-teal underline">
          pick one from Transactions
        </Link>
        .
      </p>
    );
  }

  const openConfirm = (action: StatusAction) => {
    setConfirmDialog({
      title: `${action.label.replace("Confirm as ", "Confirm ")} — ${transaction.id}?`,
      body: "This logs the decision under your name in the audit log and updates the case status.",
      tone: action.tone === "danger" ? "danger" : "default",
      confirmLabel: action.label,
      status: action.status,
    });
  };

  const handleConfirm = () => {
    if (!confirmDialog) return;
    setSaving(true);
    setTimeout(() => {
      setStatus(confirmDialog.status);
      setSaving(false);
      setConfirmDialog(null);
    }, 800);
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    setNotes((prev) => [...prev, noteText]);
    setNoteText("");
  };

  return (
    <div>
      <AlertDialog
        open={confirmDialog !== null}
        onOpenChange={(open) => !open && setConfirmDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmDialog?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog?.body}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant={confirmDialog?.tone === "danger" ? "danger" : "solid"}
              onClick={handleConfirm}
              disabled={saving}
            >
              {saving ? "Saving…" : confirmDialog?.confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="mb-[22px] flex items-start justify-between">
        <div>
          <div className="mb-1.5 text-[11.5px] text-ink-faint">
            <Link
              href="/transactions"
              className="text-ink-faint hover:text-ink-muted"
            >
              Transactions
            </Link>{" "}
            / {transaction.id}
          </div>
          <h1 className="m-0 text-[22px] font-semibold">
            Transaction {transaction.id}
          </h1>
          <p className="mt-[5px] text-[12.5px] text-ink-muted">
            {transaction.corridor} · {transaction.amount} ·{" "}
            {transaction.type} · dataset: {transaction.source}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-[1fr_1.3fr] gap-4">
        <div>
          <Card style="mb-3.5 text-center">
            <div className="mb-3.5 text-xs text-ink-muted">AI risk score</div>
            <svg
              viewBox="0 0 120 120"
              className="mx-auto block h-[130px] w-[130px]"
            >
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="transparent"
                className="stroke-border"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="transparent"
                className="stroke-coral"
                strokeWidth="10"
                strokeDasharray="314"
                strokeDashoffset={314 - (transaction.risk / 100) * 314}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
              <text
                x="60"
                y="56"
                textAnchor="middle"
                className="fill-ink font-serif text-[26px] font-semibold"
              >
                {transaction.risk}%
              </text>
              <text
                x="60"
                y="74"
                textAnchor="middle"
                className="fill-ink-muted font-sans text-[10px]"
              >
                confidence
              </text>
            </svg>
            <div
              className={`mt-2.5 text-sm font-semibold ${
                transaction.prediction === "Fraud"
                  ? "text-coral"
                  : "text-teal"
              }`}
            >
              Predicted: {transaction.prediction}
            </div>
            <div className="mt-0.5 text-[11.5px] text-ink-faint">
              Model: XGBoost v2.3
            </div>
          </Card>

          <Card>
            <div className="mb-3 text-[12.5px] font-medium text-ink-muted">
              Update investigation status
            </div>
            <div className="flex flex-col gap-2">
              {STATUS_ACTIONS.map((a) => (
                <Button
                  key={a.status}
                  variant={a.tone === "danger" ? "dangerOutline" : "outline"}
                  className="text-center"
                  onClick={() => openConfirm(a)}
                >
                  {a.label}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card style="mb-3.5">
            <div className="mb-1 flex items-baseline justify-between">
              <div className="text-[12.5px] font-medium text-ink-muted">
                SHAP feature attribution
              </div>
              <div className="text-[10.5px] text-ink-faint">
                base rate 12% → {transaction.risk}%
              </div>
            </div>
            <div className="mb-3.5 text-[11px] text-ink-faint">
              How each feature pushed this prediction away from the model&apos;s
              average
            </div>
            {FEATURES.map(([label, pct, delta]) => (
              <div key={label} className="mb-3">
                <div className="mb-1.5 flex justify-between text-[12.5px]">
                  <span>{label}</span>
                  <span
                    className={`font-semibold ${
                      delta.startsWith("+") ? "text-coral" : "text-teal"
                    }`}
                  >
                    {delta}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-border">
                  <div
                    className={`h-full rounded-full ${
                      delta.startsWith("+") ? "bg-coral" : "bg-teal"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </Card>

          <Card>
            <div className="mb-3 text-[12.5px] font-medium text-ink-muted">
              Analyst notes
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a note about this investigation..."
              className="mb-2 min-h-[50px] w-full resize-y rounded-xl border border-border p-3 font-sans text-[12.5px]"
            />
            <Button
              variant="outline"
              onClick={handleAddNote}
              className="mb-2.5"
            >
              Add note
            </Button>
            <div className="border-t border-border pt-2.5 text-[11.5px] text-ink-faint">
              <div className="mb-1.5">
                <strong className="text-ink-muted">System</strong> —
                Prediction generated at 03:15 AM
              </div>
              {notes.map((n, i) => (
                <div key={i} className="mb-1.5">
                  <strong className="text-ink-muted">B. Adeyemi</strong> — {n}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
