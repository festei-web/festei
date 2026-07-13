# Festei — MVP Frontend

Plataforma de descoberta de locais para eventos no Rio de Janeiro. Este
repositório contém o **frontend do MVP**: uma vitrine completa e funcional,
com captura real de leads, sem backend/banco de dados próprio nesta fase.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — tokens de design em `app/globals.css`
- **React Hook Form + Zod** — formulários e validação (client e servidor)
- **Lucide React** — ícones (nunca emoji, por decisão de identidade de marca)
- Sem banco de dados: os locais vêm de `data/venues.ts` (mock)

## Estrutura do projeto

```
app/
  page.tsx                  → Homepage
  locais/page.tsx          → Busca e listagem (filtros client-side)
  locais/[slug]/page.tsx   → Página de detalhes do local (SSG)
  anunciar/page.tsx         → Cadastro de proprietário (dois caminhos)
  api/leads/route.ts        → API Route: único ponto que fala com o webhook
  sitemap.ts / robots.ts    → SEO técnico
  sobre/ contato/ termos/ privacidade/  → páginas institucionais

components/
  ui/           → Button, Input, Select, Textarea, Badge, Toast, estados
  layout/       → Header, Footer, Logo (ponto único de troca da marca)
  marketing/    → Hero, seções da homepage, CTA duplo de proprietário
  marketplace/  → SpaceCard, filtros, galeria, formulários de lead

data/           → locais, categorias, comodidades, FAQ (tudo mockado)
schemas/        → validação Zod (client + servidor, mesma fonte)
lib/            → utils, leads.ts, rate-limit.ts, filters.ts, icon-map.ts
```

## Rotas

| Rota | Tipo | Descrição |
|---|---|---|
| `/` | Estática | Homepage |
| `/locais` | Client | Busca com filtros funcionando sobre os mocks |
| `/locais/[slug]` | SSG | Página de cada local (12 gerados no build) |
| `/anunciar` | Client | Cadastro de proprietário — dois caminhos |
| `/api/leads` | Dinâmica | Recebe, valida e encaminha leads |
| `/sobre`, `/contato`, `/termos`, `/privacidade` | Estática | Institucionais |
| `/sitemap.xml`, `/robots.txt` | Gerada | SEO |

## Instalação

```bash
npm install
cp .env.example .env.local   # e preencha LEADS_WEBHOOK_URL
npm run dev
```

## Scripts

```bash
npm run dev        # desenvolvimento
npm run build      # build de produção
npm run start      # servir o build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Variáveis de ambiente

Veja `.env.example`. As mais importantes:

- **`LEADS_WEBHOOK_URL`** (server-only, sem prefixo `NEXT_PUBLIC_`) — para
  onde a API Route (`/api/leads`) encaminha os leads validados. Sem essa
  variável, a API responde erro real ao usuário — nunca sucesso falso.
- **`NEXT_PUBLIC_DEMO_MODE`** — `"true"` simula sucesso sem chamar a API,
  útil só para demonstrações. Nunca deixe ativado em produção real.
- **`NEXT_PUBLIC_WHATSAPP_NUMBER`** / **`NEXT_PUBLIC_CONTACT_EMAIL`** —
  opcionais, usados na página `/contato`.

## Como funciona a captura de leads

```
Formulário (client)
  → lib/leads.ts (fetch para /api/leads, nunca direto pro webhook)
    → app/api/leads/route.ts (server)
        1. Rate limit por IP (5 envios / 10 min)
        2. Honeypot (campo "website" invisível — se preenchido, bot)
        3. Validação Zod completa (de novo, no servidor)
        4. Encaminha para LEADS_WEBHOOK_URL, com timeout de 8s
    → resposta real: sucesso só se o webhook confirmou recebimento
```

A URL do webhook **nunca** é exposta ao navegador — isso era uma falha de
segurança da versão anterior deste projeto (usava
`NEXT_PUBLIC_LEADS_WEBHOOK_URL`, visível no bundle do cliente).

Opções de destino para `LEADS_WEBHOOK_URL`: Zapier, Make.com, um endpoint
próprio, ou serviços como SheetDB (grava direto numa planilha Google).

## Como adicionar ou editar locais

Edite `data/venues.ts`. Cada local segue o tipo `Venue` (`types/index.ts`):
nome, descrição, bairro, categoria, capacidade, preço, comodidades (IDs de
`data/amenities.ts`), regras e um array de imagens. **Nenhum local tem
campo de avaliação** — isso é intencional (funcionalidade de fase futura,
ver `Space.demoAvailability` para o indicador visual permitido).

## Como trocar as imagens

Hoje as fotos vêm de URLs do Unsplash (`images.unsplash.com`, já
autorizado em `next.config.ts`). Para usar fotos próprias:

1. Coloque os arquivos em `public/images/locais/`.
2. Troque as URLs em `data/venues.ts` pelos caminhos locais
   (ex: `/images/locais/casa-1.jpg`).
3. Se migrar para uma CDN externa, adicione o domínio em
   `next.config.ts` → `images.remotePatterns`.

Todo componente que renderiza foto usa `components/ui/safe-image.tsx`, que
mostra um estado de erro elegante (nunca o ícone de imagem quebrada do
navegador) caso uma URL falhe.

## Como integrar um backend de verdade

Quando o marketplace deixar de ser MVP:

1. **Banco de dados**: Supabase é a escolha já decidida em fases
   anteriores do produto (PostgreSQL + Auth + Storage). Trocar
   `data/venues.ts` por chamadas ao SDK do Supabase, mantendo os mesmos
   tipos de `types/index.ts`.
2. **Leads**: `app/api/leads/route.ts` já é uma API Route real — trocar
   `forwardToWebhook()` por uma escrita direta no banco é uma mudança
   isolada nesse arquivo.
3. **Rate limit**: hoje é em memória (`lib/rate-limit.ts`), suficiente
   para uma única instância. Em múltiplas regiões da Vercel, trocar por
   Upstash Redis (a interface já foi desenhada pra isso).

## Deploy na Vercel

Zero configuração adicional é necessária — a Vercel detecta Next.js
automaticamente. Não é preciso `vercel.json`.

1. Conecte o repositório.
2. Configure as variáveis de ambiente (aba *Settings → Environment
   Variables*): pelo menos `LEADS_WEBHOOK_URL`.
3. Deploy.

## Checklist de produção

- [x] `npm run build` sem erros
- [x] `npm run lint` sem erros
- [x] `npm run typecheck` sem erros
- [x] Nenhum `href="#"` no projeto
- [x] Leads passam por API Route própria, nunca webhook direto do cliente
- [x] Rate limiting e honeypot ativos
- [x] Formulário nunca mostra sucesso sem confirmação real do servidor
- [x] `sitemap.ts`, `robots.ts`, JSON-LD (Organization + EventVenue)
- [x] Metadata, Open Graph e Twitter Card em todas as páginas
- [x] Termos de Uso e Política de Privacidade completos (LGPD)
- [x] Security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy)
- [x] Componente `Logo` isolado para troca futura da marca
- [x] Banner de "dados demonstrativos" na listagem e no detalhe
- [ ] Configurar `LEADS_WEBHOOK_URL` real antes de divulgar o link
- [ ] Auditoria formal de Lighthouse/WCAG 2.2 AA (ver Dívidas Técnicas)

## Dívidas técnicas conhecidas

- **CSP usa `'unsafe-inline'`** para scripts e estilos. O ideal é uma CSP
  baseada em nonce (exige middleware gerando um nonce por requisição) —
  não implementado nesta fase para não adicionar complexidade
  desproporcional ao estágio do produto.
- **Rate limit em memória**: reseta se a função serverless "esfria" ou em
  múltiplas instâncias simultâneas. Suficiente para o volume esperado do
  MVP, não para escala nacional.
- **Sem testes automatizados** (unitários/E2E). Recomendado antes de uma
  reescrita relevante de qualquer formulário.
- **Auditoria completa de Lighthouse e WCAG 2.2 AA** não foi rodada
  formalmente — o projeto segue boas práticas (HTML semântico, labels,
  foco visível, contraste, tamanhos de toque ≥44px), mas uma auditoria
  com ferramenta (axe DevTools, Lighthouse CI) ainda não foi executada.

## Roadmap

Ver Backlog Estratégico do PRD da Festei para a visão completa. Em ordem
de proximidade: calendário/reserva online, login de proprietário e
dashboard próprio, avaliações públicas, pagamento integrado, marketplace
de serviços complementares (buffet, decoração, fotografia).
