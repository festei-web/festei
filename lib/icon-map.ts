import {
  Waves,
  Flame,
  Car,
  Umbrella,
  CookingPot,
  Wifi,
  Baby,
  Trees,
  Gamepad2,
  Sofa,
  Zap,
  DoorOpen,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Waves,
  Flame,
  Car,
  Umbrella,
  CookingPot,
  Wifi,
  Baby,
  Trees,
  Gamepad2,
  Sofa,
  Zap,
  DoorOpen,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sofa;
}
