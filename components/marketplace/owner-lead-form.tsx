"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SuccessState } from "@/components/ui/states";
import { useToast } from "@/components/ui/toast";
import { submitLead } from "@/lib/leads";
import { track } from "@/lib/analytics";
import { categories } from "@/data/categories";
import {
  ownerSelfServiceSchema,
  type OwnerSelfServiceInput,
  type OwnerSelfServiceValues,
} from "@/schemas/lead";

export function OwnerLeadForm() {
  return <SelfServiceForm />;
}

function SelfServiceForm() {
  const { show } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OwnerSelfServiceInput>({ resolver: zodResolver(ownerSelfServiceSchema) });

  async function onSubmit(values: OwnerSelfServiceInput) {
    const payload: OwnerSelfServiceValues = {
      ...values,
      approxCapacity: Number(values.approxCapacity),
    };
    const result = await submitLead("owner_self_service", payload);
    if (result.ok) {
      setSubmitted(true);
      track("owner_form_submitted", { mode: "cadastro" });
      show("Cadastro enviado com sucesso.", "success");
    } else {
      show(result.error ?? "Não foi possível enviar seu cadastro agora.", "error");
    }
  }

  if (submitted) {
    return (
      <SuccessState
        title="Recebemos seu cadastro"
        description="Nossa equipe vai analisar as informações do seu local e entrar em contato em breve."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
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
        <Input label="Telefone / WhatsApp" error={errors.phone?.message} {...register("phone")} />
      </div>
      <Input label="E-mail" type="email" error={errors.email?.message} {...register("email")} />
      <Input
        label="Nome do local"
        placeholder="Ex.: Chácara Primavera"
        error={errors.venueName?.message}
        {...register("venueName")}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Tipo de local" error={errors.category?.message} {...register("category")}>
          <option value="">Selecione</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </Select>
        <Input label="Bairro" error={errors.neighborhood?.message} {...register("neighborhood")} />
      </div>
      <Input
        label="Capacidade aproximada"
        type="number"
        min={1}
        error={errors.approxCapacity?.message}
        {...register("approxCapacity")}
      />
      <Input label="Instagram (opcional)" placeholder="@seuespaco" {...register("instagram")} />
      <Textarea label="Observações (opcional)" {...register("message")} />

      <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
        {!isSubmitting && <Send className="h-4 w-4" aria-hidden />}
        Enviar cadastro
      </Button>
      <p className="text-xs text-gray-medium">
        Seus dados serão usados apenas para analisar e publicar seu local.
        Veja nossa{" "}
        <a href="/privacidade" className="underline hover:text-primary">
          Política de Privacidade
        </a>
        .
      </p>
    </form>
  );
}
