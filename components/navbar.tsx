const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(10,10,10,0.76)] backdrop-blur-md">
      <div className="mx-auto flex w-[min(100%-2rem,1200px)] items-center justify-between gap-8 py-5">
        <a
          href="#top"
          className="text-sm tracking-[0.22em] text-[var(--foreground)] transition-colors duration-200 hover:text-[var(--gold)]"
        >
          Andy Mills
        </a>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-6 text-[11px] uppercase tracking-[0.32em] text-[var(--muted)] md:gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors duration-200 hover:text-[var(--foreground)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
