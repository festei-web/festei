"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { Reveal } from "@/components/ui/reveal";
import { categories } from "@/data/categories";
import { track } from "@/lib/analytics";

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">
          Explore
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Que tipo de local você procura?
        </h2>
        <p className="mt-3 text-gray-medium">
          Ambientes preparados para receber os mais diversos tipos de celebração.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
        {categories.map((category, i) => (
          <Reveal key={category.id} delay={i * 60}>
            <Link
              href={`/locais?categoria=${category.id}`}
              onClick={() => track("category_selected", { category: category.id })}
              className="group relative flex h-40 items-end overflow-hidden rounded-2xl shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)] sm:h-48"
            >
              <SafeImage
                src={category.image}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <span className="relative z-10 p-4 text-sm font-semibold text-white sm:text-base">
                {category.label}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
