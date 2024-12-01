import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kape Ibarra POS & Inventory system",
    short_name: "Kape Ibarra",
    description: "An application built with Next.js, Express.js, & Postgresql",
    start_url: "/",
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
  };
}
