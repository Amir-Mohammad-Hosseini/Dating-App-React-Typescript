const closeMenu = () => (document.activeElement as HTMLElement | null)?.blur();

const MILLISECONDS_PER_DAY = 86_400_000;

const startOfDay = (day: Date) => {
  return new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
};
export const formatMessageTime = (time: string | null) => {
  if (!time) {
    return time;
  }
  const date = new Date(time);
  const now = new Date();

  const dayDifference = Math.round(
    (startOfDay(now) - startOfDay(date)) / MILLISECONDS_PER_DAY,
  );

  if (dayDifference <= 0) {
    return date.toLocaleDateString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (dayDifference === 1) {
    return "Yesterday";
  }
  if (dayDifference < 7) {
    return date.toLocaleDateString("en-GB", { weekday: "long" });
  }
  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatLastSeen = (iso: string | null) => {
  if (!iso) return "Offline";

  const label = formatMessageTime(iso);

  if(!label){
    return label
  }

  if (label === "Yesterday") {
    return "Last seen yesterday";
  }
  if (/^\d{2}:\d{2}$/.test(label)) {
    return `Last seen today at ${label}`;
  }
  return `Last seen ${label}`;
};

export default closeMenu;
