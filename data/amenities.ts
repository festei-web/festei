import type { Amenity } from "@/types";

// Lista de comodidades do MVP — consistente com RF-036 do PRD (Cap. 6).
// "Acessibilidade", "Pet Friendly" e "Som permitido" ficam de fora por ora:
// candidatos de fase futura (Design System, Cap. 10, seção 10.3).
export const amenities: Amenity[] = [
  { id: "piscina", label: "Piscina", icon: "Waves" },
  { id: "churrasqueira", label: "Churrasqueira", icon: "Flame" },
  { id: "estacionamento", label: "Estacionamento", icon: "Car" },
  { id: "area-coberta", label: "Área coberta", icon: "Umbrella" },
  { id: "cozinha", label: "Cozinha equipada", icon: "CookingPot" },
  { id: "wifi", label: "Wi-Fi", icon: "Wifi" },
  { id: "area-infantil", label: "Área infantil", icon: "Baby" },
  { id: "jardim", label: "Jardim", icon: "Trees" },
  { id: "salao-jogos", label: "Salão de jogos", icon: "Gamepad2" },
  { id: "deck", label: "Deck", icon: "Sofa" },
  { id: "gerador", label: "Gerador de energia", icon: "Zap" },
  { id: "banheiros", label: "Banheiros amplos", icon: "DoorOpen" },
];

export function getAmenityById(id: string) {
  return amenities.find((a) => a.id === id);
}
