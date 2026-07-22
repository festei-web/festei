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
    image: "/images/categories/cha-revelacao.jpg",
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
    image: "/images/categories/casamento.jpg",
  },
  {
    id: "festa-15-anos",
    label: "Festa de 15 anos",
    image: "/images/categories/festa-15-anos.jpg",
  },
];
