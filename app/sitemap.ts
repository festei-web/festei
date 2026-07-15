import type { MetadataRoute } from "next";
import { venues } from "@/data/venues";
import { SITE_URL } from "@/lib/site";

const BASE_URL = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/locais`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/anunciar`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/sobre`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/contato`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/termos`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const spaceRoutes: MetadataRoute.Sitemap = venues.map((venue) => ({
    url: `${BASE_URL}/locais/${venue.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...spaceRoutes];
}
