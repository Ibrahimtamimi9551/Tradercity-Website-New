import { PageTitle } from "@/components/admin/ui";

export function ModulePlaceholder({
  title,
  subtitle,
  phase,
  domainSectionsPath = "src/components/members/sections/",
}: {
  title: string;
  subtitle: string;
  phase: string;
  /** Shown in the placeholder hint so Analyst shells point at the correct domain folder. */
  domainSectionsPath?: string;
}) {
  return (
    <div className="space-y-6">
      <PageTitle title={title} subtitle={subtitle} />
      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
        <p className="text-sm font-medium text-white">{phase} implementation starts next.</p>
        <p className="mt-2 text-sm text-tc-muted">
          Shell and shared UI are ready. Domain sections will live under{" "}
          <code className="rounded bg-white/5 px-1 py-0.5 text-xs">{domainSectionsPath}</code>.
        </p>
      </div>
    </div>
  );
}
