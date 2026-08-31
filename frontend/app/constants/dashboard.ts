export const fraud_data = [
  {
    day: "01",
    fraud: 20,
  },
  {
    day: "02",
    fraud: 35,
  },
  {
    day: "03",
    fraud: 28,
  },
  {
    day: "04",
    fraud: 45,
  },
  {
    day: "05",
    fraud: 60,
  },
  {
    day: "06",
    fraud: 52,
  },
  {
    day: "07",
    fraud: 70,
  },
];

export const initialTransactions = [
  {
    id: "TXN-88213",
    amount: "£14,200",
    source: "transactions_july.csv",
    corridor: "Lagos → London",
    type: "TRANSFER",
    risk: 94,
    prediction: "Fraud",
    status: "Pending",
  },
  {
    id: "TXN-88215",
    amount: "£9,750",
    source: "transactions_july.csv",
    corridor: "Abuja → Edinburgh",
    type: "CASH_OUT",
    risk: 87,
    prediction: "Fraud",
    status: "Confirmed Fraud",
  },
  {
    id: "TXN-88216",
    amount: "£1,180",
    source: "transactions_july.csv",
    corridor: "Lagos → Bristol",
    type: "TRANSFER",
    risk: 61,
    prediction: "Needs review",
    status: "Pending",
  },
  {
    id: "TXN-88217",
    amount: "£58",
    source: "transactions_june.csv",
    corridor: "Accra → Leeds",
    type: "PAYMENT",
    risk: 4,
    prediction: "Legitimate",
    status: "Resolved",
  },
  {
    id: "TXN-88218",
    amount: "£22,400",
    source: "transactions_july.csv",
    corridor: "Lagos → London",
    type: "TRANSFER",
    risk: 98,
    prediction: "Fraud",
    status: "Pending",
  },
];

export type Report = {
  name: string;
  type: "PDF" | "CSV";
  date: string;
  by: string;
};

export const initialReports: Report[] = [
  {
    name: "Fraud Summary — July 2026",
    type: "PDF",
    date: "Jul 18, 2026",
    by: "B. Adeyemi",
  },
  {
    name: "Model Performance — Q2 2026",
    type: "PDF",
    date: "Jul 1, 2026",
    by: "J. Thornton",
  },
  {
    name: "Fairness & Bias Audit — June 2026",
    type: "CSV",
    date: "Jun 30, 2026",
    by: "R. Kumar",
  },
];

export type AuditEntry = {
  dot: string;
  text: string;
  meta: string;
  category: string;
};

export const initialAudit: AuditEntry[] = [
  {
    dot: "bg-mint",
    text: "B. Adeyemi logged in",
    meta: "IP 82.19.204.11 · 09:42 AM",
    category: "Logins",
  },
  {
    dot: "bg-teal",
    text: "B. Adeyemi uploaded transactions_july.csv — 1,204 rows",
    meta: "09:44 AM",
    category: "Uploads",
  },
  {
    dot: "bg-coral",
    text: "B. Adeyemi marked TXN-88215 as Confirmed Fraud",
    meta: "10:12 AM",
    category: "Status changes",
  },
  {
    dot: "bg-amber",
    text: "J. Thornton changed E. Nwosu's role from Analyst to Disabled",
    meta: "Yesterday, 4:03 PM",
    category: "Users",
  },
];

export type User = {
  name: string;
  email: string;
  role: "Analyst" | "Auditor" | "Admin";
  status: "Active" | "Disabled";
  active: string;
  initials: string;
  avatarColor: string;
};

export const initialUsers: User[] = [
  {
    name: "B. Adeyemi",
    email: "b.adeyemi@fraudshield.ai",
    role: "Analyst",
    status: "Active",
    active: "2 min ago",
    initials: "BA",
    avatarColor: "bg-mint",
  },
  {
    name: "J. Thornton",
    email: "j.thornton@fraudshield.ai",
    role: "Admin",
    status: "Active",
    active: "1 hour ago",
    initials: "JT",
    avatarColor: "bg-teal",
  },
  {
    name: "R. Kumar",
    email: "r.kumar@fraudshield.ai",
    role: "Auditor",
    status: "Active",
    active: "Yesterday",
    initials: "RK",
    avatarColor: "bg-amber",
  },
  {
    name: "E. Nwosu",
    email: "e.nwosu@fraudshield.ai",
    role: "Analyst",
    status: "Disabled",
    active: "3 weeks ago",
    initials: "EN",
    avatarColor: "bg-ink-faint",
  },
];

export const ROLE_STYLES: Record<User["role"], string> = {
  Analyst: "bg-teal-soft text-teal",
  Auditor: "bg-amber-soft text-amber",
  Admin: "bg-coral-soft text-coral",
};

export const stats = [
  [
    "Total Transactions",
    `${initialTransactions.length + 128000}`.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ",",
    ),
    "text-ink",
    "▲ 4.2% vs last week",
    "text-mint",
  ],
  [
    "Today's Uploads",
    "6 datasets",
    "text-ink",
    "Last: 09:42 AM",
    "text-ink-muted",
  ],
  ["Fraud %", "2.14%", "text-coral", "▲ 0.3pt vs last week", "text-coral"],
  [
    "Pending Cases",
    `${initialTransactions.filter((t) => t.status === "Pending").length}`,
    "text-amber",
    "Avg. resolution 1.8 days",
    "text-ink-muted",
  ],
];
