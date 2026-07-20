"use client";

import * as React from "react";
import { MapPin, ChevronDown, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NeighborhoodOption {
  label: string;
  slug: string;
  zone: string;
}

export interface NeighborhoodComboboxProps {
  /** Slug do bairro selecionado, ou "" quando nada está selecionado. */
  value: string;
  /** Chamado apenas com um slug válido (seleção confirmada) ou "" (limpar). */
  onChange: (slug: string) => void;
  options: NeighborhoodOption[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  label?: string;
  className?: string;
  variant?: "default" | "bare";
}

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Combobox de bairros — autocomplete controlado que só aceita valores da
 * lista oficial (prompt de melhorias: modernizar o campo "Região" da
 * busca, impedindo texto livre). Segue o padrão ARIA "Combobox" (input
 * role="combobox" + role="listbox"/"option" + aria-activedescendant),
 * implementado sem biblioteca nova pelo mesmo motivo do EventTypeSelect:
 * o projeto não tinha nenhum combobox headless instalado.
 */
export function NeighborhoodCombobox({
  value,
  onChange,
  options,
  placeholder = "Selecione um bairro",
  error,
  disabled,
  id,
  name,
  label,
  className,
  variant = "default",
}: NeighborhoodComboboxProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const listboxId = `${inputId}-listbox`;
  const errorId = `${inputId}-error`;
  const statusId = `${inputId}-status`;

  const selected = options.find((o) => o.slug === value) ?? null;

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState(selected?.label ?? "");
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const [openUpward, setOpenUpward] = React.useState(false);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const optionRefs = React.useRef<Array<HTMLLIElement | null>>([]);

  // Texto exibido: enquanto o menu está aberto, mostra o que o usuário
  // está digitando; fechado, mostra sempre o rótulo da seleção válida
  // atual (ou vazio) — sem precisar sincronizar via efeito.
  const displayValue = open ? query : (selected?.label ?? "");

  const filtered = React.useMemo(() => {
    const q = normalize(query);
    if (!q || (selected && query === selected.label)) return options;
    return options.filter((o) => normalize(o.label).includes(q));
  }, [query, options, selected]);

  // Fecha ao clicar fora.
  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        commitOrReset();
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, query, selected]);

  React.useLayoutEffect(() => {
    if (!open || !inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    setOpenUpward(spaceBelow < 300 && spaceAbove > spaceBelow);
  }, [open]);

  React.useEffect(() => {
    if (open && highlightedIndex >= 0) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [open, highlightedIndex]);

  function openList() {
    if (disabled) return;
    setOpen(true);
    setHighlightedIndex(0);
  }

  // Se o texto digitado não corresponder a uma opção válida ao sair do
  // campo, volta para a última seleção válida (ou limpa) — nunca aceita
  // texto livre (requisito central do prompt).
  function commitOrReset() {
    const match = options.find((o) => normalize(o.label) === normalize(query));
    if (match) {
      onChange(match.slug);
      setQuery(match.label);
    } else {
      onChange("");
      setQuery("");
    }
    setHighlightedIndex(-1);
  }

  function selectOption(index: number) {
    const opt = filtered[index];
    if (!opt) return;
    onChange(opt.slug);
    setQuery(opt.label);
    setOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }

  function clearValue() {
    onChange("");
    setQuery("");
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openList();
        else setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openList();
        else setHighlightedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (open && highlightedIndex >= 0) selectOption(highlightedIndex);
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
          setQuery(selected?.label ?? "");
          setHighlightedIndex(-1);
        }
        break;
      case "Tab":
        commitOrReset();
        setOpen(false);
        break;
    }
  }

  const resultsAnnouncement =
    open && query
      ? filtered.length === 0
        ? "Nenhum bairro encontrado."
        : `${filtered.length} ${filtered.length === 1 ? "bairro encontrado" : "bairros encontrados"}.`
      : "";

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}

      {name && <input type="hidden" name={name} value={value} readOnly />}

      <div
        className={cn(
          "flex h-12 w-full items-center gap-2 rounded-lg border border-border bg-white pl-3.5 pr-2 transition-colors duration-150",
          "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
          error && "border-error focus-within:border-error focus-within:ring-error/20",
          disabled && "cursor-not-allowed bg-gray-light",
          variant === "bare" &&
            "h-auto w-full gap-2.5 border-0 bg-transparent p-0 focus-within:ring-0"
        )}
      >
        <MapPin
          className={cn("h-4 w-4 shrink-0 text-gray-medium", variant === "bare" && "hidden")}
          aria-hidden
        />
        <input
          ref={inputRef}
          id={inputId}
          role="combobox"
          type="text"
          autoComplete="off"
          disabled={disabled}
          aria-expanded={open}
          aria-controls={listboxId}
          aria-describedby={error ? errorId : undefined}
          aria-activedescendant={
            open && highlightedIndex >= 0 ? `${inputId}-option-${highlightedIndex}` : undefined
          }
          placeholder={placeholder}
          value={displayValue}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightedIndex(0);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            setQuery(selected?.label ?? "");
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          className={cn(
            "w-full min-w-0 truncate bg-transparent text-base text-ink placeholder:text-gray-medium focus:outline-none",
            variant === "bare" && "text-[15px] font-medium"
          )}
        />
        {value && !disabled && (
          <button
            type="button"
            onClick={clearValue}
            aria-label="Limpar bairro selecionado"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-medium transition-colors hover:bg-gray-light hover:text-ink"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        )}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-gray-medium transition-transform duration-150",
            open && "rotate-180 text-primary"
          )}
          aria-hidden
        />
      </div>

      {/* Anúncio para leitores de tela da quantidade de resultados filtrados. */}
      <span id={statusId} role="status" aria-live="polite" className="sr-only">
        {resultsAnnouncement}
      </span>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label ?? placeholder}
          className={cn(
            "select-panel-enter absolute z-50 max-h-72 w-full min-w-[220px] overflow-y-auto rounded-xl border border-border bg-white p-1.5 shadow-[var(--shadow-lg)]",
            openUpward ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          {filtered.length === 0 ? (
            <li className="px-3.5 py-3 text-sm text-gray-medium">
              Nenhum bairro encontrado.
            </li>
          ) : (
            groupByZone(filtered).map((group) => (
              <li key={group.zone} role="presentation">
                <span
                  className="block px-3.5 pb-1 pt-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-medium"
                  aria-hidden
                >
                  {group.zone}
                </span>
                <ul role="presentation">
                  {group.items.map((opt) => {
                    const flatIndex = filtered.indexOf(opt);
                    const isSelected = opt.slug === value;
                    const isHighlighted = flatIndex === highlightedIndex;
                    return (
                      <li
                        key={opt.slug}
                        ref={(el) => {
                          optionRefs.current[flatIndex] = el;
                        }}
                        id={`${inputId}-option-${flatIndex}`}
                        role="option"
                        aria-selected={isSelected}
                        onMouseEnter={() => setHighlightedIndex(flatIndex)}
                        onClick={() => selectOption(flatIndex)}
                        className={cn(
                          "flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3.5 py-2.5 text-sm transition-colors duration-100",
                          isSelected ? "bg-primary-light font-medium text-primary" : "text-ink",
                          isHighlighted && !isSelected && "bg-gray-light"
                        )}
                      >
                        <span className="truncate">{opt.label}</span>
                        {isSelected && (
                          <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            className="h-4 w-4 shrink-0 text-coral"
                            aria-hidden
                          >
                            <path
                              d="M4 10.5l3.5 3.5L16 5.5"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))
          )}
        </ul>
      )}

      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

function groupByZone(
  items: NeighborhoodOption[]
): { zone: string; items: NeighborhoodOption[] }[] {
  const groups: { zone: string; items: NeighborhoodOption[] }[] = [];
  for (const item of items) {
    const existing = groups.find((g) => g.zone === item.zone);
    if (existing) existing.items.push(item);
    else groups.push({ zone: item.zone, items: [item] });
  }
  return groups;
}
