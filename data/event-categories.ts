import type { EventType } from "@/types";

/**
 * Cards de evento da home ("Para qual ocasião você está planejando?").
 *
 * Importante: isto é diferente de VenueCategory (data/categories.ts), que
 * classifica o TIPO DE ESPAÇO (casa, sítio, salão...) e é usado no filtro
 * de busca, no formulário do proprietário e na página do local. Aqui é o
 * TIPO DE EVENTO/OCASIÃO do cliente — os mesmos valores usados no campo
 * "Tipo de evento" da busca (lib EventType), pra manter os dois lugares
 * consistentes.
 *
 * PLACEHOLDER: casamento, festa-15-anos e cha-revelacao ainda usam fotos
 * temporárias (Unsplash) até Rafael enviar o restante do lote de fotos
 * reais por ocasião.
 */
export interface EventCategory {
  id: EventType;
  label: string;
  image: string;
}

export const eventCategories: EventCategory[] = [
  {
    id: "aniversario",
    label: "Aniversário",
    image: "/images/categories/aniversario.jpg",
  },
  {
    id: "churrasco",
    label: "Churrasco",
    image: "/images/categories/churrasco.jpg",
  },
  {
    id: "festa-infantil",
    label: "Festa infantil",
    image: "/images/categories/festa-infantil.jpg",
  },
  {
    id: "cha-revelacao",
    label: "Chá revelação",
    image:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80",
  },
  {
    id: "noivado",
    label: "Noivado",
    image: "/images/categories/noivado.jpg",
  },
  {
    id: "confraternizacao",
    label: "Confraternização",
    image: "/images/categories/confraternizacao.jpg",
  },
  {
    id: "casamento",
    label: "Casamento",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
  },
  {
    id: "festa-15-anos",
    label: "Festa de 15 anos",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
];
