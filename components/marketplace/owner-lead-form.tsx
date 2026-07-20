"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { categories } from "@/data/categories";
import {
  ownerSelfServiceSchema,
  venueStatusOptions,
  type OwnerSelfServiceInput,
  type OwnerSelfServiceValues,
} from "@/schemas/lead";
import { submitLead } from "@/lib/leads";
import { captureLeadSource } from "@/lib/lead-source";

/**
 * Formulário de triagem inicial de proprietários (prompt de melhorias,
 * item 15). Coleta apenas o essencial para a Festei avaliar o local —
 * documentos, dados bancários e comprovação de propriedade pertencem a
 * uma etapa posterior do onboarding, depois da análise inicial.
 */
export function OwnerLeadForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [startedTracked, setStartedTracked] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OwnerSelfServiceInput>({
    resolver: zodResolver(ownerSelfServiceSchema),
    defaultValues: { venueHasNoName: false, city: "Rio de Janeiro" },
  });

  const venueHasNoName = useWatch({ control, name: "venueHasNoName" });

  function trackFormStart() {
    if (!startedTracked) {
      setStartedTracked(true);
      track("owner_form_started", {});
    }
  }

  async function onSubmit(values: OwnerSelfServiceInput) {
    setSubmitError(null);
    const payload: OwnerSelfServiceValues = {
      ...values,
      approxCapacity: Number(values.approxCapacity),
      ...captureLeadSource(),
    };
    const result = await submitLead("owner_self_service", payload);
    if (result.ok) {
      setSubmitted(true);
      track("owner_form_submitted", {});
      track("owner_form_success", {});
    } else {
      const message =
        result.error ??
        "Não foi possível enviar seu cadastro agora. Verifique sua conexão e tente novamente.";
      setSubmitError(message);
      track("owner_form_error", {});
    }
  }

  // Quando há erros de validação de campo, dispara o evento de analytics
  // (sem nenhum dado pessoal, apenas a lista de campos com problema).
  React.useEffect(() => {
    const fieldNames = Object.keys(errors);
    if (fieldNames.length > 0) {
      track("owner_form_field_error", { fields: fieldNames });
    }
  }, [errors]);

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center rounded-2xl bg-primary-light/60 px-6 py-14 text-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
          <Send className="h-8 w-8 text-primary" aria-hidden />
        </div>
        <h3 className="text-xl font-semibold text-ink">
          Seu local foi enviado para análise
        </h3>
        <p className="mt-2 max-w-md text-sm text-gray-medium">
          Nossa equipe verificará as informações e entrará em contato para
          conhecer melhor o local, explicar as condições da fase inicial e
          orientar os próximos passos.
        </p>
        <Button asChild variant="secondary" size="sm" className="mt-6">
          <Link href="/">Voltar para a página inicial</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={trackFormStart}
      className="flex flex-col gap-4"
      noValidate
    >
      {/* Campo-armadilha invisível para bots — não remover (item 25). */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Seu nome" error={errors.name?.message} {...register("name")} />
        <Input label="WhatsApp" error={errors.phone?.message} {...register("phone")} />
      </div>
      <Input label="E-mail" type="email" error={errors.email?.message} {...register("email")} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Cidade" error={errors.city?.message} {...register("city")} />
        <Input label="Bairro" error={errors.neighborhood?.message} {...register("neighborhood")} />
      </div>

      <div>
        <Input
          label="Nome do local"
          placeholder="Ex.: Chácara Primavera"
          disabled={!!venueHasNoName}
          error={errors.venueName?.message}
          {...register("venueName")}
        />
        <label className="mt-2 flex items-center gap-2 text-sm text-gray-medium">
          <input type="checkbox" className="h-4 w-4 rounded border-border" {...register("venueHasNoName")} />
          Meu local ainda não possui nome
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Tipo de local" error={errors.category?.message} {...register("category")}>
          <option value="">Selecione</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </Select>
        <Input
          label="Capacidade aproximada"
          type="number"
          min={1}
          error={errors.approxCapacity?.message}
          {...register("approxCapacity")}
        />
      </div>

      <Select label="Situação atual do local" error={errors.venueStatus?.message} {...register("venueStatus")}>
        <option value="">Selecione</option>
        {venueStatusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Instagram (opcional)" placeholder="@seuespaco" {...register("instagram")} />
        <Input label="Site (opcional)" placeholder="www.seusite.com.br" {...register("site")} />
      </div>
      <Textarea label="Observações (opcional)" {...register("message")} />

      {submitError && (
        <p role="alert" aria-live="assertive" className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
          <span className="font-semibold">Não foi possível enviar o cadastro. </span>
          {submitError}
        </p>
      )}

      <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
        {!isSubmitting && <Send className="h-4 w-4" aria-hidden />}
        Enviar meu local para análise
      </Button>
      {submitError && (
        <Button
          type="submit"
          variant="tertiary"
          size="sm"
          fullWidth
          className="-mt-2"
          disabled={isSubmitting}
        >
          <RefreshCcw className="h-4 w-4" aria-hidden />
          Tentar novamente
        </Button>
      )}
      <p className="text-xs text-gray-medium">
        O envio não garante a publicação. A equipe da Festei analisará as
        informações e entrará em contato para apresentar os próximos passos.
        Seus dados serão usados apenas para essa análise — veja nossa{" "}
        <a href="/privacidade" className="underline hover:text-primary">
          Política de Privacidade
        </a>
        .
      </p>
    </form>
  );
}
