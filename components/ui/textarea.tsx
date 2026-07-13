import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const areaId = id || generatedId;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={areaId} className="mb-1.5 block text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <textarea
          id={areaId}
          ref={ref}
          aria-invalid={!!error}
          className={cn(
            "min-h-[120px] w-full rounded-lg border border-border bg-white px-4 py-3 text-base text-ink placeholder:text-gray-medium transition-colors duration-150",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            error && "border-error focus:border-error focus:ring-error/20",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-sm text-error">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-sm text-gray-medium">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
