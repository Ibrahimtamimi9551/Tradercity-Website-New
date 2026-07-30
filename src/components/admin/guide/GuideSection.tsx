import { SectionHeader } from "@/components/admin/ui/PageTitle";
import { cn } from "@/lib/admin/cn";

type GuideSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function GuideSection({
  title,
  description,
  children,
  className,
}: GuideSectionProps) {
  return (
    <section className={cn("space-y-3", className)}>
      <SectionHeader title={title} description={description} />
      {children}
    </section>
  );
}
