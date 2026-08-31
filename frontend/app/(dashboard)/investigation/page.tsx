import Link from "next/link";

export default function InvestigationPage() {
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
