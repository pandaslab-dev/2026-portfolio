export type Project = {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  detail: string;
  tags: string[];
  href: string;
  label: string;
};

export const projects: Project[] = [
  {
    id: "oyler",
    title: "Oyler",
    kicker: "field service ai",
    summary: "AI software for equipment teams, manuals, dispatch context, and the messy reality of field work.",
    detail:
      "Built around fast answers, clear records, and practical workflows for technicians and operators.",
    tags: ["AI", "SaaS", "Field Ops"],
    href: "https://oyler.ai",
    label: "visit oyler.ai",
  },
  {
    id: "pv-engine",
    title: "PV Engine",
    kicker: "creative engine",
    summary: "A compact browser tool for timed typography, lyric-video motion, and fast visual iteration.",
    detail:
      "Focused on direct manipulation, preview speed, and keeping the creative loop out of the mud.",
    tags: ["Canvas", "Animation", "Tools"],
    href: "https://pvengine.pandaslab.dev",
    label: "open pv engine",
  },
  {
    id: "flynn-island",
    title: "Flynn Island",
    kicker: "realtime game",
    summary: "A shared browser island with movement, presence, and playful real-time systems.",
    detail:
      "An experiment in multiplayer feel, low-friction sessions, and small web worlds that stay lively.",
    tags: ["Realtime", "WebSockets", "Game Dev"],
    href: "https://flynnisland.pandaslab.dev",
    label: "visit island",
  },
];

export const contact = {
  primaryEmail: "hello@pandaslab.dev",
  directEmail: "andymills.dev@gmail.com",
  location: "oklahoma city",
};
