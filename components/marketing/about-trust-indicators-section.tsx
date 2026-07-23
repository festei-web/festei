import { MapPin, Headset, Lock, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const indicators = [
  { icon: MapPin, text: "Empresa brasileira" },
  { icon: Headset, text: "Atendimento humano" },
  { icon: Lock, text: "Compromisso com privacidade" },
  { icon: TrendingUp, text: "Plataforma em evolução contínua" },
];

export function AboutTrustIndicatorsSection() {
  return (
    <section className="border-y border-border bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <Reveal className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
          {indicators.map((item) => (
            <div
              key={item.text}
              className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:text-left"
            >
              <item.icon className="h-4 w-4 shrink-0 text-gray-medium" aria-hidden />
              <span className="text-xs font-medium text-gray-medium sm:text-sm">
                {item.text}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
