import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, icon, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-medium">
              {icon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              "h-12 w-full rounded-lg border border-border bg-white px-4 text-base text-ink placeholder:text-gray-medium transition-colors duration-150",
              "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              icon && "pl-11",
              error && "border-error focus:border-error focus:ring-error/20",
              "disabled:cursor-not-allowed disabled:bg-gray-light disabled:text-gray-medium",
              className
            )}
            {...props}
          />
        </div>
        {error ? (
          <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="mt-1.5 text-sm text-gray-medium">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
