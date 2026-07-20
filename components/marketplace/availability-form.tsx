"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartyPopper } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SuccessState } from "@/components/ui/states";
import { ContactChannelSelector } from "./contact-channel-selector";
import { useToast } from "@/components/ui/toast";
import { submitLead } from "@/lib/leads";
import { track } from "@/lib/analytics";
import { eventTypeLabels } from "@/data/constants";
import {
  availabilityRequestSchema,
  type AvailabilityRequestInput,
  type AvailabilityRequestValues,
} from "@/schemas/lead";

/**
 * Painel de solicitação — identidade própria, não um "checkout" de
 * hospedagem. O tom é de formulário de planejamento de evento: pede
 * horário de início/fim (não apenas uma data) e tipo de celebração,
 * e o botão final diz "Consultar disponibilidade" (padrão oficial), nunca
 * "Reservar" ou "Solicitar".
 */

// Máscara simples de telefone brasileiro: (21) 99999-9999 / (21) 9999-9999.
function formatBrazilianPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function AvailabilityForm({
  venueId,
  venueName,
  venueSlug,
}: {
  venueId: string;
  venueName: string;
  venueSlug: string;
}) {
  const { show } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  const hasStartedRef = React.useRef(false);
  const [channelChoice, setChannelChoice] = React.useState<
    AvailabilityRequestInput["contactChannel"] | ""
  >("");

  function markStarted() {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      track("availability_request_started", { venueId });
    }
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AvailabilityRequestInput>({
    resolver: zodResolver(availabilityRequestSchema),
    defaultValues: { venueId, venueName },
  });

  async function onSubmit(values: AvailabilityRequestInput) {
    const payload: AvailabilityRequestValues = {
      ...values,
      guestCount: Number(values.guestCount),
    };
    const result = await submitLead("availability_request", payload);
    if (result.ok) {
      setSubmitted(true);
      track("availability_request_submitted", { venueId });
      show("Solicitação enviada com sucesso.", "success");
    } else {
      show(result.error ?? "Não foi possível enviar sua solicitação agora.", "error");
    }
  }

  if (submitted) {
    return (
      <SuccessState
        title="Solicitação enviada com sucesso"
        description="Nossa equipe recebeu os dados do seu evento e vai confirmar disponibilidade e condições com o responsável pelo local, entrando em contato com você pelo canal informado."
        action={
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="secondary" size="sm">
              <Link href="/locais">Voltar aos resultados</Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href={`/locais/${venueSlug}`}>Ver este local novamente</Link>
            </Button>
          </div>
        }
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocus={markStarted} className="flex flex-col gap-4" noValidate>
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <PartyPopper className="h-4 w-4" aria-hidden />
        Planeje sua celebração
      </div>

      {/* Honeypot — invisível para humanos, capturado por bots. Nunca remover. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      <Select
        label="Tipo de evento"
        error={errors.eventType?.message}
        {...register("eventType")}
      >
        <option value="">Selecione a ocasião</option>
        {Object.entries(eventTypeLabels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </Select>

      <div className="grid gap-4 sm:grid-cols-3">
        <Input
          label="Data do evento"
          type="date"
          error={errors.eventDate?.message}
          {...register("eventDate")}
        />
        <Input label="Início" type="time" {...register("startTime")} />
        <Input label="Término" type="time" {...register("endTime")} />
      </div>

      <Input
        label="Quantidade de convidados"
        type="number"
        min={1}
        placeholder="Ex.: 60"
        error={errors.guestCount?.message}
        {...register("guestCount")}
      />

      <Input
        label="Nome completo"
        placeholder="Seu nome"
        error={errors.name?.message}
        {...register("name")}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Telefone / WhatsApp"
          placeholder="(21) 99999-9999"
          inputMode="numeric"
          error={errors.phone?.message}
          {...register("phone", {
            onChange: (e) => {
              e.target.value = formatBrazilianPhone(e.target.value);
            },
          })}
        />
        <Input
          label="E-mail"
          type="email"
          placeholder="voce@email.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <Controller
        control={control}
        name="contactChannel"
        render={({ field }) => (
          <ContactChannelSelector
            value={channelChoice}
            onChange={(v) => {
              setChannelChoice(v);
              field.onChange(v);
            }}
            error={errors.contactChannel?.message}
          />
        )}
      />

      <Textarea
        label="Mensagem ao proprietário (opcional)"
        placeholder="Conte um pouco mais sobre o seu evento…"
        {...register("message")}
      />

      <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
        Consultar disponibilidade
      </Button>
      <p className="text-xs text-gray-medium">
        A solicitação não confirma uma reserva e não gera cobrança. Nossa
        equipe confirma disponibilidade e condições com o responsável pelo
        local, e entra em contato com você pelo canal informado.
      </p>
      <p className="text-xs text-gray-medium">
        Seus dados serão usados apenas para viabilizar sua solicitação junto
        ao proprietário deste local, através da nossa equipe. Veja nossa{" "}
        <a href="/privacidade" className="underline hover:text-primary">
          Política de Privacidade
        </a>
        .
      </p>
    </form>
  );
}
