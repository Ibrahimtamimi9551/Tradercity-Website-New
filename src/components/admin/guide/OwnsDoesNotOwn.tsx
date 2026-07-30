import { Check, X } from "lucide-react";
import { InfoCard } from "@/components/admin/ui/InfoCard";

type OwnsDoesNotOwnProps = {
  owns: string[];
  doesNotOwn: string[];
};

export function OwnsDoesNotOwn({ owns, doesNotOwn }: OwnsDoesNotOwnProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <InfoCard title="Owns">
        <ul className="space-y-2">
          {owns.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-tc-muted">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </InfoCard>
      <InfoCard title="Does NOT Own">
        <ul className="space-y-2">
          {doesNotOwn.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-tc-muted">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </InfoCard>
    </div>
  );
}
