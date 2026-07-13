import { Info } from "lucide-react";

/**
 * Aviso discreto de que os locais exibidos são dados de demonstração.
 * Usado nas páginas de listagem e detalhe, enquanto não houver um
 * catálogo real de locais cadastrados (PRD, Capítulo 4).
 */
export function DemoDataBanner() {
  return (
    <div className="mb-6 flex items-center gap-2 rounded-lg bg-primary-light/60 px-4 py-2.5 text-sm text-primary">
      <Info className="h-4 w-4 shrink-0" aria-hidden />
      Locais exibidos nesta versão são demonstrativos, para ilustrar a experiência da Festei.
    </div>
  );
}
