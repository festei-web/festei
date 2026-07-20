"use client";

import * as React from "react";
import { Check, ChevronDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface EventTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  /** Opcional — mantém o mesmo padrão visual de Input/Select existentes. */
  label?: string;
  className?: string;
  /**
   * "default": campo com borda, fundo branco e altura fixa (uso em
   * formulários e filtros — Design System Cap. 4).
   * "bare": sem borda/fundo/sombra própria, para ser embutido em um
   * container que já fornece esse estilo (ex.: a pílula da busca do
   * Hero, componente Field em search-bar.tsx).
   */
  variant?: "default" | "bare";
}

/**
 * Select customizado, acessível e reutilizável — substitui o <select>
 * nativo em campos como "Tipo de festa" (prompt de melhorias: modernizar
 * o campo mantendo roxo como cor dominante e coral apenas em pequenos
 * detalhes, como o check da opção selecionada).
 *
 * Não usa nenhuma biblioteca de UI headless — o projeto não tinha Radix
 * Select, Headless UI nem similar instalado (só @radix-ui/react-slot,
 * usado no Button), então implementei um listbox leve, do zero, seguindo
 * o padrão ARIA "Listbox" (button + role="listbox"/"option" + navegação
 * por teclado), em vez de adicionar uma dependência nova.
 *
 * Reutilizável: qualquer filtro ou formulário da Festei que precise de
 * um select customizado pode usar este componente passando sua própria
 * lista de `options` — o nome do arquivo segue o pedido do prompt, mas os
 * props são genéricos.
 */
export function EventTypeSelect({
  value,
  onChange,
  options,
  placeholder = "Selecione",
  error,
  disabled,
  id,
  name,
  label,
  className,
  variant = "default",
}: EventTypeSelectProps) {
  const generatedId = React.useId();
  const selectId = id || generatedId;
  const listboxId = `${selectId}-listbox`;
  const errorId = `${selectId}-error`;

  const [open, setOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const [openUpward, setOpenUpward] = React.useState(false);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const optionRefs = React.useRef<Array<HTMLLIElement | null>>([]);

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;

  // Fecha ao clicar fora do componente.
  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Decide abrir para cima quando não há espaço suficiente abaixo —
  // garante que o menu nunca ultrapasse os limites da tela verticalmente.
  React.useLayoutEffect(() => {
    if (!open || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    setOpenUpward(spaceBelow < 280 && spaceAbove > spaceBelow);
  }, [open]);

  React.useEffect(() => {
    if (open && highlightedIndex >= 0) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [open, highlightedIndex]);

  function openMenu(startIndex?: number) {
    if (disabled) return;
    setOpen(true);
    setHighlightedIndex(startIndex ?? (selectedIndex >= 0 ? selectedIndex : 0));
  }

  function closeMenu(options: { refocusTrigger?: boolean } = {}) {
    const { refocusTrigger = true } = options;
    setOpen(false);
    setHighlightedIndex(-1);
    if (refocusTrigger) buttonRef.current?.focus();
  }

  function selectOption(index: number) {
    const opt = options[index];
    if (!opt) return;
    onChange(opt.value);
    closeMenu();
  }

  function onButtonKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) openMenu();
        else if (highlightedIndex >= 0) selectOption(highlightedIndex);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) openMenu();
        else setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openMenu(options.length - 1);
        else setHighlightedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          closeMenu();
        }
        break;
    }
  }

  function onListKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setHighlightedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setHighlightedIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0) selectOption(highlightedIndex);
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "Tab":
        closeMenu({ refocusTrigger: false });
        break;
    }
  }

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}

      {/* Mantém "name" utilizável por integrações baseadas em FormData,
          sem alterar o valor enviado ao backend (isso continua vindo do
          estado React via onChange/Controller). */}
      {name && <input type="hidden" name={name} value={value} readOnly />}

      <button
        ref={buttonRef}
        id={selectId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-describedby={error ? errorId : undefined}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onButtonKeyDown}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-2 rounded-lg border border-border bg-white px-4 text-left text-base text-ink transition-colors duration-150",
          "focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
          open && "border-primary ring-2 ring-primary/20",
          error && "border-error focus-visible:border-error focus-visible:ring-error/20",
          disabled && "cursor-not-allowed bg-gray-light text-gray-medium",
          variant === "bare" &&
            "h-auto w-full border-0 bg-transparent p-0 text-[15px] font-medium focus-visible:ring-0"
        )}
      >
        <span className={cn("truncate", !selectedOption && "text-gray-medium")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-gray-medium transition-transform duration-150",
            open && "rotate-180 text-primary"
          )}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label ?? placeholder}
          tabIndex={-1}
          aria-activedescendant={
            highlightedIndex >= 0 ? `${selectId}-option-${highlightedIndex}` : undefined
          }
          onKeyDown={onListKeyDown}
          className={cn(
            "select-panel-enter absolute z-50 max-h-72 w-full min-w-[200px] overflow-y-auto rounded-xl border border-border bg-white p-1.5 shadow-[var(--shadow-lg)]",
            openUpward ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          {options.map((opt, index) => {
            const isSelected = opt.value === value;
            const isHighlighted = index === highlightedIndex;
            return (
              <li
                key={opt.value}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                id={`${selectId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => selectOption(index)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3.5 py-2.5 text-sm transition-colors duration-100",
                  isSelected ? "bg-primary-light font-medium text-primary" : "text-ink",
                  isHighlighted && !isSelected && "bg-gray-light"
                )}
              >
                <span className="truncate">{opt.label}</span>
                {/* Coral aparece só aqui — o check da opção selecionada,
                    nunca o fundo/roxo é substituído por ele. */}
                {isSelected && (
                  <Check className="h-4 w-4 shrink-0 text-coral" aria-hidden />
                )}
              </li>
            );
          })}
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
