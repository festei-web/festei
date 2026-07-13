"use client";

import * as React from "react";

/**
 * Revela um elemento com fade + leve deslocamento quando ele entra na
 * viewport. Sem biblioteca externa (IntersectionObserver nativo) — pedido
 * explícito de não adicionar peso desnecessário ao bundle.
 *
 * Uso: const ref = useReveal(); <div ref={ref} className="reveal">...</div>
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Navegadores muito antigos sem suporte: revela imediatamente em vez
    // de deixar o conteúdo preso em opacity:0 para sempre.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
