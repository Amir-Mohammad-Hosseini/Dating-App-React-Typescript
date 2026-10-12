const PRIVACY_ITEMS = [
  {
    key: "showOnDiscover",
    label: "Show me on Discover",
    description: "Turn off to pause matching",
    defaultChecked: true,
  },
  {
    key: "showDistance",
    label: "Show distance",
    description: "Instead of exact location",
    defaultChecked: true,
  },
  {
    key: "showAge",
    label: "Show age",
    description: "Visible on your profile card",
    defaultChecked: true,
  },
  {
    key: "readReceipts",
    label: "Read receipts",
    description: "Let matches see when you've read their message",
    defaultChecked: false,
  },
] as const;

export default PRIVACY_ITEMS