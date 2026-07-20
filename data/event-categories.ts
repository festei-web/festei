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
 * PLACEHOLDER: as 8 imagens abaixo são temporárias (reaproveitadas de
 * data/categories.ts) até Rafael enviar as fotos reais por ocasião —
 * specs passadas: 1600×1200px mín., proporção 4:3, assunto centralizado.
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
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: "churrasco",
    label: "Churrasco",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
  },
  {
    id: "festa-infantil",
    label: "Festa infantil",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
  },
  {
    id: "confraternizacao",
    label: "Confraternização",
    image:
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
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
