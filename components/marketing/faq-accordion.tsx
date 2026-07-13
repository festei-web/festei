"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

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

      <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question}>
              <h3>
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
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
                id={`faq-panel-${index}`}
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
