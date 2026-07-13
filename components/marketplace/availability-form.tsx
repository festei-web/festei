"use client";

import * as React from "react";
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
 * e o botão final diz "Enviar solicitação", nunca "Reservar".
 */
export function AvailabilityForm({
  venueId,
  venueName,
}: {
  venueId: string;
  venueName: string;
}) {
  const { show } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  const [channelChoice, setChannelChoice] = React.useState<
    AvailabilityRequestInput["contactChannel"] | ""
  >("");

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
      show("Solicitação enviada com sucesso.", "success");
    } else {
      show(result.error ?? "Não foi possível enviar sua solicitação agora.", "error");
    }
  }

  if (submitted) {
    return (
      <SuccessState
        title="Recebemos sua solicitação"
        description={`Nossa equipe entrará em contato pelo canal escolhido para confirmar a disponibilidade de ${venueName}.`}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
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
          error={errors.phone?.message}
          {...register("phone")}
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
        Enviar solicitação
      </Button>
      <p className="text-xs text-gray-medium">
        Seus dados serão usados apenas para viabilizar o contato com o
        proprietário deste local. Veja nossa{" "}
        <a href="/privacidade" className="underline hover:text-primary">
          Política de Privacidade
        </a>
        .
      </p>
    </form>
  );
}
