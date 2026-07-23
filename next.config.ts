import type { NextConfig } from "next";

/**
 * 'unsafe-eval' só entra em desenvolvimento: o React em modo dev usa
 * eval() para reconstruir stack traces (nunca em produção — ver
 * https://react.dev). Sem isso, o CSP bloqueia o eval() do próprio
 * React em `next dev`, o que o Next.js sinaliza como erro de runtime
 * no indicador de dev tools. Em produção o CSP permanece estrito.
 */
const scriptSrc = ["'self'", "'unsafe-inline'"];
if (process.env.NODE_ENV !== "production") {
  scriptSrc.push("'unsafe-eval'");
}

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src ${scriptSrc.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://images.unsplash.com data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Painel de dev tools do Next.js (indicador "N" no canto inferior
  // esquerdo durante `next dev`) — desativado por não fazer parte da UI
  // real do site; nunca aparece em produção de qualquer forma.
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
