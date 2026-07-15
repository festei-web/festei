"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/data/faq";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "buscando", label: "Para quem procura um local" },
  { id: "proprietarios", label: "Para proprietários" },
] as const;

export function FaqAccordion() {
  const [activeGroup, setActiveGroup] = React.useState<(typeof tabs)[number]["id"]>("buscando");
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const items = faq.filter((item) => item.group === activeGroup);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">
          Dúvidas
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Perguntas frequentes
        </h2>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-md rounded-full border border-border bg-gray-light/60 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveGroup(tab.id);
              setOpenIndex(0);
            }}
            className={cn(
              "flex-1 rounded-full px-3 py-2 text-sm font-medium transition-colors",
              activeGroup === tab.id
                ? "bg-white text-primary shadow-[var(--shadow-sm)]"
                : "text-gray-medium hover:text-ink"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question}>
              <h3>
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${activeGroup}-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-medium text-ink">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-gray-medium transition-transform duration-200",
                      isOpen && "rotate-180 text-primary"
                    )}
                    aria-hidden
                  />
                </button>
              </h3>
              <div
                id={`faq-panel-${activeGroup}-${index}`}
                className={cn(
                  "grid transition-all duration-200 ease-out",
                  isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden px-5">
                  <p className="text-sm leading-relaxed text-gray-medium">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
