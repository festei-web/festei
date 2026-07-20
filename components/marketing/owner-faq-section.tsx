"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/data/faq";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

export function OwnerFaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const items = faq.filter((item) => item.group === "proprietarios");

  function toggle(index: number, question: string) {
    const next = openIndex === index ? null : index;
    setOpenIndex(next);
    if (next !== null) {
      track("owner_faq_opened", { question });
    }
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Dúvidas
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Perguntas frequentes para proprietários
          </h2>
        </div>

        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-white shadow-[var(--shadow-sm)]">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`owner-faq-panel-${index}`}
                    onClick={() => toggle(index, item.question)}
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
                  id={`owner-faq-panel-${index}`}
                  className={cn(
                    "grid transition-all duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden px-5">
                    <p className="text-sm leading-relaxed text-gray-medium">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
