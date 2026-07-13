"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Envolve next/image com um estado de erro visível e elegante.
 *
 * Justificativa: as fotos dos locais vêm de URLs externas (Unsplash) até
 * que a Festei tenha um banco de imagens próprio (PRD, Brand Book Cap. 11,
 * seção 11.17). Se uma URL falhar em produção — link quebrado, mudança no
 * provedor, bloqueio de rede do visitante — o usuário nunca deve ver o
 * ícone de imagem quebrada padrão do navegador.
 */
export function SafeImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = React.useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-light text-gray-medium",
          className
        )}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="h-8 w-8" aria-hidden />
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
