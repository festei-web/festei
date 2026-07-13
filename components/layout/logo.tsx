import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo da Festei, isolado em um único componente.
 *
 * Arquivo em /public/images/logo.png — recolorido para o roxo institucional
 * exato (#6D4AFF) a partir do arquivo original enviado, cuja versão continha
 * um roxo ligeiramente diferente (#6121B0). O usuário vai substituir por uma
 * versão definitiva; basta trocar o arquivo em public/images/logo.png,
 * nenhum outro lugar do projeto referencia a logo diretamente.
 */
export function Logo({
  className,
  iconClassName,
  showWordmark = true,
}: {
  className?: string;
  iconClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2 font-bold text-ink", className)}>
      <span className={cn("relative h-9 w-9 shrink-0", iconClassName)}>
        <Image
          src="/images/logo.png"
          alt=""
          fill
          sizes="36px"
          className="object-contain"
          priority
        />
      </span>
      {showWordmark && <span className="text-xl">Festei</span>}
    </span>
  );
}

