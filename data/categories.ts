import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "casa",
    label: "Casas",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: "sitio",
    label: "Sítios",
    image:
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
  },
  {
    id: "chacara",
    label: "Chácaras",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
  },
  {
    id: "salao",
    label: "Salões",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
  },
  {
    id: "espaco-gourmet",
    label: "Áreas gourmet",
    image:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80",
  },
  {
    id: "rooftop",
    label: "Rooftops",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
  },
  {
    id: "casa-piscina",
    label: "Casas com Piscina",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
  },
];

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}
