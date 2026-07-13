import { MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContactChannel } from "@/types";

/**
 * Campo obrigatório em qualquer formulário de solicitação de cliente
 * (PRD Cap. 5, seção 5.24; Cap. 6, RF-018). Nunca ligar para quem escolher
 * "apenas_texto" — essa regra é aplicada na camada de atendimento, mas a
 * escolha do usuário nasce aqui.
 */
export function ContactChannelSelector({
  value,
  onChange,
  error,
}: {
  value: ContactChannel | "";
  onChange: (value: ContactChannel) => void;
  error?: string;
}) {
  const options: { value: ContactChannel; label: string; icon: typeof MessageCircle }[] = [
    { value: "apenas_texto", label: "Prefiro só por mensagem", icon: MessageCircle },
    { value: "aceita_ligacao", label: "Pode me ligar também", icon: Phone },
  ];

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-ink">
        Como prefere que a gente entre em contato?
      </span>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const active = value === opt.value;
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                active
                  ? "border-primary bg-primary-light text-primary"
                  : "border-border bg-white text-ink hover:border-primary/40"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {opt.label}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-sm text-error">{error}</p>}
    </div>
  );
}
