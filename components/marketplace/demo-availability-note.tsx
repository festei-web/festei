import { Info } from "lucide-react";
import type { Venue } from "@/types";

const copy: Record<Venue["demoAvailability"], { label: string; text: string }> = {
  disponivel: {
    label: "Datas disponíveis este mês",
    text: "Este local tem boas chances de disponibilidade — confirme com a equipe.",
  },
  "poucas-datas": {
    label: "Poucas datas neste mês",
    text: "A procura está alta neste período — vale consultar com antecedência.",
  },
  "sob-consulta": {
    label: "Disponibilidade sob consulta",
    text: "Este local não trabalha com agenda fixa — a equipe confirma direto com o proprietário.",
  },
};

export function DemoAvailabilityNote({ status }: { status: Venue["demoAvailability"] }) {
  const { label, text } = copy[status];
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-gray-light/60 p-4">
      <Info className="h-5 w-5 shrink-0 text-primary" aria-hidden />
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="mt-0.5 text-sm text-gray-medium">{text}</p>
        <p className="mt-1 text-xs text-gray-medium">
          Indicador ilustrativo. A confirmação real de disponibilidade é feita
          pela nossa equipe após sua solicitação.
        </p>
      </div>
    </div>
  );
}
