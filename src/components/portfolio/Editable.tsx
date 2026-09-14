import { cn } from "@/lib/utils";
import { usePortfolio } from "@/lib/portfolio/store";
import type { PortfolioCopy } from "@/lib/portfolio/defaults";

type Props = {
  field: keyof PortfolioCopy;
  className?: string;
  multiline?: boolean;
  rows?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
};

export function Editable({
  field,
  className,
  multiline,
  rows = 4,
  as: Tag = "p",
}: Props) {
  const copy = usePortfolio((s) => s.copy);
  const editMode = usePortfolio((s) => s.editMode);
  const setField = usePortfolio((s) => s.setField);
  const value = copy[field];

  if (!editMode) {
    return <Tag className={className}>{value || "—"}</Tag>;
  }

  if (multiline) {
    return (
      <textarea
        value={value}
        rows={rows}
        aria-label={field}
        onChange={(e) => setField(field, e.target.value)}
        className={cn(
          "w-full resize-y rounded-sm bg-paper-2/80 px-3 py-2 leading-inherit text-inherit shadow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      />
    );
  }

  return (
    <input
      value={value}
      aria-label={field}
      onChange={(e) => setField(field, e.target.value)}
      className={cn(
        "w-full rounded-sm bg-paper-2/80 px-2 py-1 text-inherit shadow-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    />
  );
}
