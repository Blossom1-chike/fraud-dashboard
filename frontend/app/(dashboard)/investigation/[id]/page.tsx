import { initialTransactions } from "../../../constants/dashboard";
import InvestigationView from "./InvestigationView";

export default async function InvestigationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transaction = initialTransactions.find((t) => t.id === id) ?? null;

  return <InvestigationView transaction={transaction} />;
}
