import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, icon, id, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-medium z-10">
              {icon}
            </span>
          )}
          <select
            id={selectId}
            ref={ref}
            aria-invalid={!!error}
            className={cn(
              "h-12 w-full appearance-none rounded-lg border border-border bg-white px-4 pr-10 text-base text-ink transition-colors duration-150",
              "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              icon && "pl-11",
              error && "border-error",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-medium"
            aria-hidden
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
