import { NextRequest, NextResponse } from "next/server";
import { getVenueById } from "@/data/venues";
import { getListingAvailability } from "@/lib/availability";

export const runtime = "nodejs";

/**
 * Retorna as entradas de disponibilidade conhecidas de um local.
 *
 * MVP atual: `getListingAvailability` sempre retorna uma lista vazia (sem
 * painel do proprietário ou integração de agenda ainda). O contrato da
 * resposta já é o definitivo, então quando uma fonte real existir, só
 * `getListingAvailability` (lib/availability.ts) muda — esta rota e todo
 * o cliente continuam os mesmos.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ listingId: string }> }
) {
  const { listingId } = await params;

  const venue = getVenueById(listingId);
  if (!venue) {
    return NextResponse.json({ ok: false, error: "Local não encontrado." }, { status: 404 });
  }

  const entries = await getListingAvailability(listingId);

  return NextResponse.json({
    ok: true,
    listingId,
    entries,
    updatedAt: new Date().toISOString(),
  });
}
