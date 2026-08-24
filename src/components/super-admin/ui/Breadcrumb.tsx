import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/super-admin/cn";
import { SUPER_ADMIN_ROUTES } from "@/constants/super-admin";

type BreadcrumbProps = {
  items: string[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-4", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
        <li>
          <Link
            href={SUPER_ADMIN_ROUTES.root}
            className="transition-colors hover:text-zinc-300"
          >
            Super Admin
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item}-${index}`} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 shrink-0 text-zinc-600" aria-hidden />
              <span
                className={cn(isLast ? "font-medium text-zinc-300" : "text-zinc-500")}
                aria-current={isLast ? "page" : undefined}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
