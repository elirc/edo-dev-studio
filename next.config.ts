import type { NextConfig } from "next";
const isDevelopment = process.env.NODE_ENV === "development";
// Keep static rendering and Next's inline bootstrap. No third-party scripts or
// embedded services are used; outbound email/Calendly links still work normally.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDevelopment ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    localPatterns: [{ pathname: "/images/**", search: "" }],
  },
  async redirects() {
    return [
      {
        source: "/siti-web-ristoranti",
        destination: "/servizi",
        permanent: true,
      },
      { source: "/blog", destination: "/guide", permanent: true },
      {
        source: "/blog/come-aumentare-prenotazioni-ristorante-online",
        destination: "/guide/prenotazioni-dirette-ristorante",
        permanent: true,
      },
      {
        source: "/blog/quanto-costa-sito-web-ristorante",
        destination: "/servizi#preventivo",
        permanent: true,
      },
      {
        source: "/blog/template-vs-sito-su-misura-ristorante",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/blog/automazioni-whatsapp-ristoranti-prenotazioni",
        destination: "/guide/prenotazioni-dirette-ristorante",
        permanent: true,
      },
      {
        source: "/blog/ridurre-no-show-ristorante-promemoria-automatici",
        destination: "/guide/prenotazioni-dirette-ristorante",
        permanent: true,
      },
      { source: "/blog/:slug", destination: "/guide", permanent: true },
      {
        source: "/siti-web-ristoranti-milano/pizzerie",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/siti-web-ristoranti-milano/ristoranti-di-pesce",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/calcolatore-prenotazioni-ristorante",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/casi-studio/coachcord",
        destination: "/lavori",
        permanent: true,
      },
      { source: "/cookie-policy", destination: "/privacy", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      {
        source: "/siti-web-ristoranti-:city",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/siti-web-pizzerie-:city",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/siti-web-ristoranti-pesce-:city",
        destination: "/servizi",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
        ],
      },
    ];
  },
};
export default nextConfig;
