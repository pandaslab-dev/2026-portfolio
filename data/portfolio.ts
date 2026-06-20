export type Project = {
  id: string;
  title: string;
  kicker: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  summary: string;
  detail: string;
  tags: string[];
  links: Array<{
    href: string;
    label: string;
  }>;
};

export const projects: Project[] = [
  {
    id: "oyler",
    title: "Oyler",
    kicker: "field service ai",
    image: {
      src: "/work/oyler-screenshot-mockup.png",
      alt: "Oyler app shown across laptop and phone mockups",
      width: 1032,
      height: 585,
    },
    summary:
      "Affordable smart field service management system for small and enterprise teams.",
    detail:
      "Built using NextJS React and Supabase, and implements a fully custom-built RAG AI assistant with the ability to utilize your own API provider.",
    tags: ["AI", "SaaS", "Field Ops"],
    links: [
      {
        href: "https://oyler.ai",
        label: "visit oyler.ai",
      },
      {
        href: "https://github.com/pandaslab-dev/oylerengine-bulldog-mock-demo",
        label: "see demo on github",
      },
    ],
  },
  {
    id: "pandaslides",
    title: "PandaSlides",
    kicker: "live presentation app",
    image: {
      src: "/work/pandaslides-promo-1.png",
      alt: "PandaSlides live presentation software shown on a church stage",
      width: 2048,
      height: 1152,
    },
    summary: "Live presentation software for churches, events, and small production teams.",
    detail:
      "Built around an operator console, audience output, stage display, and real-time slide control, with both web and SwiftUI versions.",
    tags: ["Realtime", "WebSockets", "SwiftUI"],
    links: [
      {
        href: "https://slides.pandaslab.dev",
        label: "open pandaslides",
      },
      {
        href: "https://github.com/pandaslab-dev/pandaslides",
        label: "see on github",
      },
    ],
  },
  {
    id: "flynn-island",
    title: "Flynn Island",
    kicker: "realtime game",
    image: {
      src: "/work/flynnisland-screenshot-mockup.png",
      alt: "Flynn Island game shown across desktop and phone mockups",
      width: 1800,
      height: 1164,
    },
    summary: "A shared browser island with movement, presence, and playful real-time systems.",
    detail:
      "An experiment in multiplayer feel, low-friction sessions, and small web worlds that stay lively.",
    tags: ["Realtime", "WebSockets", "Game Dev"],
    links: [
      {
        href: "https://flynnisland.pandaslab.dev",
        label: "visit island",
      },
      {
        href: "https://github.com/pandaslab-dev/FlynnIsland",
        label: "see on github",
      },
    ],
  },
];

export const contact = {
  primaryEmail: "hello@pandaslab.dev",
  directEmail: "andymills.dev@gmail.com",
  location: "oklahoma city",
};
