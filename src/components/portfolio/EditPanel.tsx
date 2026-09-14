import { COPY_FIELDS } from "@/lib/portfolio/defaults";
import { usePortfolio } from "@/lib/portfolio/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function EditPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const copy = usePortfolio((s) => s.copy);
  const setField = usePortfolio((s) => s.setField);
  const resetCopy = usePortfolio((s) => s.resetCopy);
  const editMode = usePortfolio((s) => s.editMode);
  const setEditMode = usePortfolio((s) => s.setEditMode);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Project copy</SheetTitle>
          <SheetDescription>
            Only the fields on the 11×17 sheet. Stored in this browser — nothing is uploaded.
          </SheetDescription>
        </SheetHeader>
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-rule px-6 py-3">
          <span className="text-sm text-ink-muted">Type directly on the sheet</span>
          <Button
            type="button"
            size="sm"
            variant={editMode ? "navy" : "secondary"}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Editing on" : "Editing off"}
          </Button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-5">
            {COPY_FIELDS.map((f) => (
              <div key={f.key} className="flex flex-col gap-1.5">
                <Label htmlFor={f.key}>{f.label}</Label>
                {f.multiline ? (
                  <Textarea
                    id={f.key}
                    rows={f.rows ?? 4}
                    value={copy[f.key]}
                    onChange={(e) => setField(f.key, e.target.value)}
                  />
                ) : (
                  <Input
                    id={f.key}
                    value={copy[f.key]}
                    onChange={(e) => setField(f.key, e.target.value)}
                  />
                )}
                <p className="text-xs text-ink-subtle">{f.hint}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-rule px-6 py-4">
          <Button type="button" variant="ghost" onClick={resetCopy}>
            Reset sample
          </Button>
          <Button type="button" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
