import * as React from "react";
import Link from "next/link";
import { SearchX, CheckCircle2, WifiOff } from "lucide-react";
import { Button } from "./button";

export function EmptyState({
  title = "Nenhum local atende a todos os filtros selecionados.",
  description = "Tente aumentar a região de busca, ajustar a quantidade de convidados ou remover algum filtro.",
  actionLabel = "Ajustar filtros",
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-gray-light/50 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white">
        <SearchX className="h-7 w-7 text-gray-medium" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-medium">{description}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {onAction && (
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
        <Button asChild size="sm">
          <Link href="/locais">Ver todos os locais</Link>
        </Button>
      </div>
    </div>
  );
}

export function SuccessState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-primary-light/60 px-6 py-14 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
        <CheckCircle2 className="h-8 w-8 text-success" aria-hidden />
      </div>
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-gray-medium">{description}</p>
      {action}
    </div>
  );
}

export function OfflineState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white px-6 py-16 text-center">
      <WifiOff className="mb-4 h-10 w-10 text-gray-medium" aria-hidden />
      <h3 className="text-lg font-semibold text-ink">Sem conexão</h3>
      <p className="mt-2 text-sm text-gray-medium">Verifique sua internet e tente novamente.</p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-6" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
