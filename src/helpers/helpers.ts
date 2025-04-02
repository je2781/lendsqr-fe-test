import localFont from "next/font/local";


export const dashboardItems = [
  { "Switch Organization": "fa-briefcase" },
  { "Dashboard": "fa-house" },
  {
    "Customers": [
      { "Users": "fa-users" },
      { "Guarantors": "fa-users-line" },
      { "Loans": "fa-sack-dollar" },
      { "Decision Models": "fa-handshake" },
      { "Savings": "fa-piggy-bank" },
      { "Loan Requests": "fa-hand-holding-dollar" },
      { "Whitelist": "fa-user-plus" },
      { "Karma": "fa-user-xmark" },
    ],
  },
  {
    "Businesses": [
      { "Organization": "fa-briefcase" },
      { "Loan Products": "fa-hand-holding-dollar" },
      { "Savings Products": "fa-building-columns" },
      { "Fees and Charges": "fa-coins" },
      { "Transactions": "fa-arrow-right-arrow-left" },
      { "Services": "fa-arrows-spin" },
      { "Service Account": "fa-user-gear" },
      { "Settlements": "fa-scroll" },
      { "Reports": "fa-chart-column" },
    ],
  },
  {
    "Settings": [
      { "Preferences": "fa-sliders" },
      { "Fees and Pricing": "fa-calculator" },
      { "Savings Products": "fa-building-columns" },
      { "Audit Logs": "fa-clipboard-list" },
      { "Systems Messages": "fa-clock" },
    ]
  },
  {
    "Logout": "fa-right-from-bracket"
  }
];

export const avenirNextLTPro = localFont({
  src: [
    {
      path: "../../public/fonts/AvenirNext-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/AvenirNextLTPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AvenirNext-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/AvenirNextLTPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/AvenirNextLTPro-It.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-avenir-next",
  display: "swap",
});

export const sfCompactText = localFont({
  src: [
    {
      path: "../../public/fonts/SF-Compact-Display-Regular.woff2",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-sf-compact",
  display: "swap",
});
