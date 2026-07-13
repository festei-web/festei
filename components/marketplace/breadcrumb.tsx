import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-medium">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink" aria-current="page">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && (
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
