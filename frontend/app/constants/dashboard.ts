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
