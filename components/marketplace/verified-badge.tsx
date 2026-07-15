"use client";

import * as React from "react";
import { BadgeCheck, X } from "lucide-react";

/**
 * Selo "Verificado" — o que ele significa está centralizado aqui, junto do
 * componente que o exibe, para não haver descompasso entre a promessa visual
 * e a explicação (PRD Cap. 9; prompt de melhorias, item 16).
 */
export function VerifiedBadge({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm transition-transform hover:scale-105"
      >
        <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
        Verificado
        {!compact && <span className="sr-only">— entenda a verificação</span>}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="O que significa o selo Verificado"
          className="fixed inset-0 z-[600] flex items-end justify-center sm:items-center"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(false);
          }}
        >
          <div className="absolute inset-0 bg-ink/40" aria-hidden />
          <div
            className="relative z-10 w-full max-w-sm rounded-t-2xl bg-white p-6 sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between">
              <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                <BadgeCheck className="h-5 w-5 text-primary" aria-hidden />
                Entenda a verificação
              </h3>
              <button
                type="button"
                aria-label="Fechar"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(false);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-light"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-gray-medium">O selo pode significar:</p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink">
              <li>• Identidade do responsável confirmada</li>
              <li>• Existência do local validada</li>
              <li>• Informações principais conferidas</li>
              <li>• Autorização para publicação das imagens</li>
            </ul>

            <p className="mt-4 rounded-xl bg-gray-light/60 p-3 text-xs text-gray-medium">
              O selo não representa garantia de qualidade, de segurança ou de
              cumprimento contratual, nem uma inspeção técnica completa. A
              Festei não é parte na negociação entre você e o responsável
              pelo local.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
