import { cn } from "@/lib/admin/cn";
import type { GuideFlowStep } from "@/types/admin/guide";

type GuideFlowProps = {
  steps: GuideFlowStep[];
  className?: string;
};

export function GuideFlow({ steps, className }: GuideFlowProps) {
  return (
    <ol className={cn("space-y-0", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={`${step.label}-${index}`} className="flex gap-3">
            <div className="flex w-6 flex-col items-center">
              <span
                className="mt-1 flex h-2.5 w-2.5 shrink-0 rounded-full bg-violet-400/80 ring-4 ring-violet-400/15"
                aria-hidden
              />
              {!isLast ? (
                <span
                  className="mt-1 w-px flex-1 min-h-[1.25rem] bg-white/15"
                  aria-hidden
                />
              ) : null}
            </div>
            <div className={cn("min-w-0 pb-4", isLast && "pb-0")}>
              <p className="text-sm font-medium text-white">{step.label}</p>
              {step.description ? (
                <p className="mt-0.5 text-sm text-tc-muted">{step.description}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
