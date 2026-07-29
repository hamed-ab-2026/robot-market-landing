export function Icon({ name, className = "h-6 w-6" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "hotel":
      return (
        <svg {...common}>
          <path d="M3 21V7a1 1 0 0 1 1-1h4v15" />
          <path d="M8 21V3h9a1 1 0 0 1 1 1v17" />
          <path d="M3 21h18" />
          <path d="M11 7h4M11 11h4M11 15h4" />
        </svg>
      );
    case "school":
      return (
        <svg {...common}>
          <path d="M2 9l10-5 10 5-10 5-10-5z" />
          <path d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
          <path d="M22 9v6" />
        </svg>
      );
    case "pharmacy":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="14" rx="2" />
          <path d="M12 11v6M9 14h6" />
          <path d="M8 7V5a4 4 0 0 1 8 0v2" />
        </svg>
      );
    case "hospital":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M12 8v6M9 11h6" />
          <path d="M9 21v-3M15 21v-3" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      );
    case "brand":
      return (
        <svg {...common}>
          <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
        </svg>
      );
    default:
      return null;
  }
}
