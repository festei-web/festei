import { Home, Leaf, Trees, Warehouse, Sun, Waves, Building2, UtensilsCrossed } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const venueTypes = [
  { icon: Home, label: "Casas para festas" },
  { icon: Warehouse, label: "Salões" },
  { icon: Leaf, label: "Sítios" },
  { icon: Trees, label: "Chácaras" },
  { icon: Sun, label: "Áreas de lazer" },
  { icon: Building2, label: "Coberturas" },
  { icon: UtensilsCrossed, label: "Espaços gourmet" },
  { icon: Waves, label: "Locais com piscina" },
];

export function WhoCanListSection({
  title = "Quem pode anunciar?",
}: {
  title?: string;
}) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {venueTypes.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2.5 rounded-xl border border-border bg-white p-4 text-center"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-sm font-medium text-ink">{item.label}</span>
            </div>
          ))}
        </Reveal>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-medium">
          Outros tipos de locais poderão ser analisados individualmente pela
          equipe da Festei.
        </p>
      </div>
    </section>
  );
}
