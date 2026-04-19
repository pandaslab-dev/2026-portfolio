import { DividerLine } from "@/components/divider-line";

export function Footer() {
  return (
    <footer className="pb-10 pt-2">
      <div className="mx-auto w-[min(100%-2rem,1200px)]">
        <DividerLine className="mb-6" />
        <p className="section-kicker">© 2026 pandaslab.dev</p>
      </div>
    </footer>
  );
}
