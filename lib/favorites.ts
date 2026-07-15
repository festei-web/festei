"use client";

import * as React from "react";
import { track } from "@/lib/analytics";

/**
 * Favoritos persistidos em localStorage — solução simples para o MVP atual,
 * preparada para ser trocada por uma conta de usuário no futuro sem alterar
 * a API deste hook (prompt de melhorias, item 20).
 */
const STORAGE_KEY = "festei:favoritos";

function readFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    return new Set();
  }
}

function writeFavorites(ids: Set<string>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // Armazenamento indisponível (modo privado, cota excedida etc.) —
    // falha silenciosa: favoritar deixa de persistir, mas não quebra a UI.
  }
}

// Notifica outras instâncias do hook na mesma aba quando o estado muda,
// já que o evento nativo "storage" só dispara entre abas diferentes.
const listeners = new Set<() => void>();

export function useFavorite(venueId: string) {
  const [favorited, setFavorited] = React.useState(false);

  React.useEffect(() => {
    const sync = () => setFavorited(readFavorites().has(venueId));
    sync();
    listeners.add(sync);
    window.addEventListener("storage", sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("storage", sync);
    };
  }, [venueId]);

  const toggle = React.useCallback(() => {
    const current = readFavorites();
    if (current.has(venueId)) {
      current.delete(venueId);
      track("favorite_removed", { venueId });
    } else {
      current.add(venueId);
      track("favorite_added", { venueId });
    }
    writeFavorites(current);
    listeners.forEach((fn) => fn());
  }, [venueId]);

  return { favorited, toggle };
}
