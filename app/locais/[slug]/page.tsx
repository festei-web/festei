import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Users, Info, ListChecks, ShieldCheck, Wallet, UserRound } from "lucide-react";
import { getVenueBySlug, getSimilarVenues } from "@/data/venues";
import { getCategoryById } from "@/data/categories";
import { eventTypeLabels, formatPrice } from "@/data/constants";
import { Breadcrumb } from "@/components/marketplace/breadcrumb";
import { VenueGallery } from "@/components/marketplace/venue-gallery";
import { AmenitiesGrid } from "@/components/marketplace/amenities-grid";
import { AreaPreview } from "@/components/marketplace/area-preview";
import { VerifiedBadge } from "@/components/marketplace/verified-badge";
import { DemoAvailabilityNote } from "@/components/marketplace/demo-availability-note";
import { DemoDataBanner } from "@/components/marketplace/demo-data-banner";
import { AvailabilityForm } from "@/components/marketplace/availability-form";
import { VenueActionButtons } from "@/components/marketplace/venue-action-buttons";
import { VenueCard } from "@/components/marketplace/venue-card";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) return {};
  return {
    title: `${venue.name} — ${venue.neighborhood}, Rio de Janeiro`,
    description: venue.shortDescription,
    alternates: {
      canonical: `/locais/${venue.slug}`,
    },
    openGraph: {
      title: venue.name,
      description: venue.shortDescription,
      images: [venue.images[0]],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: venue.name,
      description: venue.shortDescription,
      images: [venue.images[0]],
    },
  };
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) notFound();

  const category = getCategoryById(venue.category);
  const similar = getSimilarVenues(venue);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: venue.name,
    description: venue.shortDescription,
    image: venue.images,
    address: {
      "@type": "PostalAddress",
      addressLocality: venue.neighborhood,
      addressRegion: "RJ",
      addressCountry: "BR",
    },
    priceRange: `A partir de R$ ${venue.startingPrice}`,
    maximumAttendeeCapacity: venue.capacityMax,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Locais", href: "/locais" },
          ...(category ? [{ label: category.label, href: `/locais?categoria=${category.id}` }] : []),
          { label: venue.name },
        ]}
      />
      <DemoDataBanner />

      <VenueGallery images={venue.images} alt={venue.name} />

      <div className="mt-10 grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <div>
          {/* Informações Principais */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {venue.name}
                </h1>
                {venue.verified && <VerifiedBadge compact />}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden />
                  {venue.neighborhood}, {venue.city}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" aria-hidden />
                  {venue.capacityMin}–{venue.capacityMax} convidados
                </span>
              </div>
            </div>
            <VenueActionButtons venueId={venue.id} venueName={venue.name} />
          </div>

          {/* Resumo rápido */}
          <div className="mt-5 flex flex-wrap gap-2">
            {venue.recommendedEvents.map((e) => (
              <Badge key={e} variant="outline">
                {eventTypeLabels[e]}
              </Badge>
            ))}
          </div>

          <hr className="my-9 border-border/70" />

          {/* Descrição */}
          <section>
            <h2 className="text-lg font-semibold text-ink">Sobre este local</h2>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-gray-medium">
              {venue.fullDescription}
            </p>
          </section>

          <hr className="my-9 border-border/70" />

          {/* Comodidades */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
              <ListChecks className="h-5 w-5 text-primary" aria-hidden />
              Comodidades
            </h2>
            <div className="mt-4">
              <AmenitiesGrid amenityIds={venue.amenityIds} />
            </div>
          </section>

          <hr className="my-9 border-border/70" />

          {/* Regras */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
              Regras do local
            </h2>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-gray-medium">
              {venue.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </section>

          <hr className="my-9 border-border/70" />

          {/* Localização */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
              <MapPin className="h-5 w-5 text-primary" aria-hidden />
              Localização
            </h2>
            <p className="mt-2 text-sm text-gray-medium">
              {venue.neighborhood}, {venue.city} — o endereço completo é
              compartilhado pela nossa equipe durante a negociação.
            </p>
            <div className="mt-4">
              <AreaPreview neighborhood={venue.neighborhood} city={venue.city} />
            </div>
          </section>

          <hr className="my-9 border-border/70" />

          {/* Custos adicionais — estrutura preparada, sem inventar valores
              que ainda não existem no cadastro do local (item 17 do prompt). */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
              <Wallet className="h-5 w-5 text-primary" aria-hidden />
              Custos adicionais
            </h2>
            <p className="mt-3 text-sm text-gray-medium">
              Itens como caução, taxa de limpeza, hora extra ou serviços
              opcionais variam de acordo com cada local e serão informados
              durante o contato com a nossa equipe.
            </p>
          </section>

          <hr className="my-9 border-border/70" />

          {/* Sobre o proprietário — sem inventar nome ou biografia por local
              demonstrativo; a apresentação real acontece após o contato. */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
              <UserRound className="h-5 w-5 text-primary" aria-hidden />
              Sobre o proprietário
            </h2>
            <p className="mt-3 text-sm text-gray-medium">
              O responsável por este local recebe as solicitações através da
              nossa equipe, que cuida do contato e ajuda a confirmar as
              condições com você.
            </p>
          </section>

          <hr className="my-9 border-border/70" />

          {/* Calendário demonstrativo */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
              <Info className="h-5 w-5 text-primary" aria-hidden />
              Disponibilidade
            </h2>
            <div className="mt-4">
              <DemoAvailabilityNote status={venue.demoAvailability} />
            </div>
          </section>
        </div>

        {/* Painel de solicitação — não é um checkout, é um formulário de
            planejamento. Preço aparece como referência, não como elemento
            dominante do painel (diferente do card lateral do Airbnb). */}
        <div>
          <div
            data-fab-avoid
            className="rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-lg)] md:sticky md:top-24"
          >
            <AvailabilityForm venueId={venue.id} venueName={venue.name} venueSlug={venue.slug} />
            <hr className="my-5 border-border/70" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-medium">Valor de referência</span>
              <span className="font-semibold text-ink">
                {formatPrice(venue.startingPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Locais semelhantes */}
      {similar.length > 0 && (
        <section className="mt-20">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Descubra mais
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Você também pode gostar
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => (
              <VenueCard key={s.id} venue={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const { venues } = await import("@/data/venues");
  return venues.map((s) => ({ slug: s.slug }));
}
