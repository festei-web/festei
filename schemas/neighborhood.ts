import { z } from "zod";
import { neighborhoodSlugValues } from "@/data/rio-neighborhoods";

/**
 * Schema Zod do slug de bairro — gerado a partir da lista central
 * (data/rio-neighborhoods.ts), nunca duplicado à mão. Uso pretendido:
 * qualquer endpoint futuro que receba um bairro (ex.: busca de locais
 * via API, cadastro de proprietários) deve validar com este schema no
 * servidor, nunca confiando apenas na interface (prompt de melhorias:
 * "o backend só deve aceitar valores pertencentes à lista cadastrada").
 *
 * A busca de locais no MVP atual é resolvida inteiramente no cliente
 * (filtra os dados demonstrativos de data/venues.ts a partir do
 * parâmetro `bairro` da URL — ver components/marketplace/locais-page-
 * client.tsx), então não existe ainda uma rota de API dedicada para
 * aplicar este schema. Mesmo assim, o parâmetro da URL já é validado
 * contra a lista oficial (`isValidNeighborhoodSlug`) antes de ser
 * usado — qualquer slug desconhecido é descartado silenciosamente.
 */
export const neighborhoodSlugSchema = z.enum(neighborhoodSlugValues);

/** Versão opcional — útil em filtros onde "" representa "qualquer bairro". */
export const optionalNeighborhoodSlugSchema = z
  .union([neighborhoodSlugSchema, z.literal("")])
  .optional();
