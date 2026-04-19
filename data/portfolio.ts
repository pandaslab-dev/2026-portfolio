export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ProjectLine = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  note?: string;
  highlights: string[];
  links: ProjectLink[];
  systemTitle: string;
  systemLines: ProjectLine[];
  traces: string[];
  featured?: boolean;
  align?: "left" | "right";
};

export type ContactLink = {
  label: string;
  href?: string;
  external?: boolean;
};

export const heroNotes = [
  {
    label: "Current lens",
    value:
      "Working in healthcare IT made workflow friction impossible to ignore. That perspective shows up in the systems I choose to build.",
  },
  {
    label: "Focus",
    value:
      "AI-assisted tools, real-time applications, and web software that needs to hold up outside of a portfolio screenshot.",
  },
  {
    label: "Now moving",
    value:
      "Finishing a Software Engineering degree and transitioning into a full-time development role with product and operational context already in hand.",
  },
] as const;

export const projects: Project[] = [
  {
    id: "oyler",
    index: "01",
    eyebrow: "Featured Platform",
    title: "Oyler — AI-Assisted Field Service Platform",
    description:
      "A multi-tenant SaaS platform for field service operations — equipment tracking, technician dispatch, and an AI assistant that answers questions using retrieval-augmented generation.",
    note:
      "The system processes uploaded manuals into embeddings, retrieves relevant document context at query time, and generates responses with source-aware outputs. Data access is strictly scoped by organization to ensure tenant isolation. Designed around a map-first admin interface and a fast dispatch workflow for real-world technician use.",
    highlights: [
      "Multi-tenant architecture",
      "RAG pipeline",
      "Tenant-scoped data isolation",
      "Map-based dashboard",
      "LLM integration",
    ],
    links: [
      {
        label: "Visit oyler.ai",
        href: "https://oyler.ai",
        external: true,
      },
    ],
    systemTitle: "Platform Shape",
    systemLines: [
      {
        label: "Ingest",
        value:
          "Uploaded manuals are chunked and embedded so the assistant can retrieve relevant operational context instead of guessing.",
      },
      {
        label: "Retrieve",
        value:
          "Queries pull scoped document context at runtime, which keeps answers grounded in the customer’s own material.",
      },
      {
        label: "Boundary",
        value:
          "Every lookup stays organization-scoped to preserve tenant isolation across the data plane and response layer.",
      },
      {
        label: "Operate",
        value:
          "A map-first admin surface keeps technicians, equipment, and dispatch decisions visible in the same workflow.",
      },
    ],
    traces: [
      "Built to be useful under field pressure, not just elegant in a demo flow.",
      "The AI layer exists to shorten operational search time, with source-aware output instead of vague assistance.",
      "The product direction comes directly from observing how broken systems slow down real technical work.",
      "Architecture decisions center around isolation, speed to answer, and clarity for dispatch-heavy workflows.",
    ],
    featured: true,
    align: "left",
  },
  {
    id: "flynn-island",
    index: "02",
    eyebrow: "Real-Time Game System",
    title: "Flynn Island — Browser-Based Multiplayer Game",
    description:
      "A real-time multiplayer environment built with Phaser where players join a shared world, select characters, and interact across devices.",
    note:
      "Includes a custom networking layer for synchronizing player state and movement with low latency, along with modular animation handling and cross-device input support.",
    highlights: [
      "Phaser",
      "WebSockets",
      "Real-time synchronization",
      "Game architecture",
      "Cross-device input",
    ],
    links: [
      {
        label: "Play Flynn Island",
        href: "https://flynnisland.pandaslab.dev",
        external: true,
      },
    ],
    systemTitle: "Networked World",
    systemLines: [
      {
        label: "Session",
        value:
          "Players enter a shared browser world that keeps character selection, movement, and presence synchronized.",
      },
      {
        label: "Transport",
        value:
          "A custom WebSocket layer handles low-latency state updates without entangling rendering and gameplay logic.",
      },
      {
        label: "Input",
        value:
          "Interaction paths are designed to work across desktop and touch-first devices without rewriting the core experience.",
      },
      {
        label: "Animation",
        value:
          "Character behavior and movement transitions stay modular so sync logic does not dominate the render layer.",
      },
    ],
    traces: [
      "Shows comfort with live state, latency-sensitive updates, and behavior that needs to feel responsive.",
      "The work is playful on the surface, but the underlying problem is still systems design.",
      "Real-time interaction forced clean boundaries between networking, input handling, and character behavior.",
    ],
    align: "right",
  },
  {
    id: "pv-engine",
    index: "03",
    eyebrow: "Creative Tooling",
    title: "PV Engine — Kinetic Typography & Lyric Video Tool",
    description:
      "A browser-based tool for creating timed text animations and lyric videos, designed as a lightweight alternative to traditional video software.",
    note:
      "Implements a timeline and keyframe-driven animation system with canvas-based rendering and a structured approach to sequencing visual events.",
    highlights: [
      "Timeline and keyframes",
      "Canvas rendering",
      "Animation engine",
      "Creative tooling",
      "Export workflow",
    ],
    links: [
      {
        label: "Try PV Engine",
        href: "https://pvengine.pandaslab.dev",
        external: true,
      },
    ],
    systemTitle: "Animation Workflow",
    systemLines: [
      {
        label: "Timeline",
        value:
          "Timed text and scene events are organized against a dedicated timeline rather than scattered across ad hoc state.",
      },
      {
        label: "Keyframes",
        value:
          "Animation behavior is driven by structured transitions, making sequencing and refinement predictable.",
      },
      {
        label: "Renderer",
        value:
          "Canvas-based rendering keeps the browser in control of visual output while staying lightweight and direct.",
      },
      {
        label: "Output",
        value:
          "The tool is built for fast, export-oriented iteration instead of the overhead of heavyweight video software.",
      },
    ],
    traces: [
      "This project demonstrates systems thinking in a creative context rather than an operational one.",
      "The value is not just animation polish, but making a frustrating workflow feel immediate and controllable.",
      "It balances product usability, rendering logic, and the structure needed for repeatable output.",
    ],
    align: "left",
  },
];

export const aboutParagraphs = [
  "I’m currently working in a technical role within healthcare IT, where I’ve seen how much friction poorly designed systems create in real workflows. That experience directly shaped the direction of my work, especially Oyler.",
  "I’m finishing a Software Engineering degree and transitioning into a full-time development role. My focus is on building practical systems—AI-assisted tools, real-time applications, and software that solves specific operational problems.",
  "Outside of development: music production, vocal synthesis, and maintaining a homelab environment.",
] as const;

export const contactLinks: ContactLink[] = [
  {
    label: "hello@pandaslab.dev",
    href: "mailto:hello@pandaslab.dev",
  },
  {
    label: "GitHub",
  },
  {
    label: "LinkedIn",
  },
] as const;
