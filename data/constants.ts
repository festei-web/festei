import type { EventType } from "@/types";

export const eventTypeLabels: Record<EventType, string> = {
  aniversario: "Aniversário",
  churrasco: "Churrasco",
  "festa-infantil": "Festa infantil",
  "cha-revelacao": "Chá revelação",
  noivado: "Noivado",
  confraternizacao: "Confraternização",
};

// Bairros usados apenas como sugestão de busca — cobertura real é o
// município do Rio de Janeiro inteiro (PRD Cap. 2, 2.5), não restrita a estes.
export const suggestedNeighborhoods = [
  "Barra da Tijuca",
  "Recreio dos Bandeirantes",
  "Jacarepaguá",
  "Botafogo",
  "Copacabana",
  "Tijuca",
  "Vila Isabel",
  "Méier",
  "Laranjeiras",
  "Campo Grande",
  "Guaratiba",
  "Vargem Grande",
];

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}
