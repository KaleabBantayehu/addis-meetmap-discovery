import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow)] transition-transform group-hover:scale-105">
            <MapPin className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight">MeetMap</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground -mt-0.5">
              Addis
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { to: "/", label: "Home" },
            { to: "/explore", label: "Explore" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-foreground bg-accent" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/60"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/explore"
          className="inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Explore places
        </Link>
      </div>
    </header>
  );
}
