import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { MapView } from "@/components/MapView";
import { PlaceCard } from "@/components/PlaceCard";
import { allPrices, allVibes, places, type Price, type Vibe } from "@/data/places";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Addis — MeetMap" },
      { name: "description", content: "Browse cafes, restaurants, and lounges across Addis Ababa on a live map. Filter by price, vibe, and rating." },
      { property: "og:title", content: "Explore Addis — MeetMap" },
      { property: "og:description", content: "Live map of trusted places in Addis Ababa." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [vibes, setVibes] = useState<Set<Vibe>>(new Set());
  const [prices, setPrices] = useState<Set<Price>>(new Set());
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return places.filter((p) => {
      if (q && !`${p.name} ${p.area} ${p.category}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (vibes.size && !p.vibes.some((v) => vibes.has(v))) return false;
      if (prices.size && !prices.has(p.price)) return false;
      if (p.rating < minRating) return false;
      return true;
    });
  }, [q, vibes, prices, minRating]);

  const toggle = <T,>(set: Set<T>, val: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setter(next);
  };

  const activeFilterCount = vibes.size + prices.size + (minRating > 0 ? 1 : 0);

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        {/* Sidebar */}
        <aside className="flex w-full flex-col border-b border-border bg-card lg:w-[420px] lg:border-b-0 lg:border-r">
          <div className="border-b border-border p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search places, areas..."
                className="w-full rounded-full border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium hover:bg-accent"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-0.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {showFilters && (
              <div className="mt-4 space-y-4 rounded-2xl bg-muted/50 p-4">
                <FilterGroup label="Price">
                  {allPrices.map((p) => (
                    <Chip key={p} active={prices.has(p)} onClick={() => toggle(prices, p, setPrices)}>
                      {p}
                    </Chip>
                  ))}
                </FilterGroup>
                <FilterGroup label="Vibe">
                  {allVibes.map((v) => (
                    <Chip key={v} active={vibes.has(v)} onClick={() => toggle(vibes, v, setVibes)}>
                      {v}
                    </Chip>
                  ))}
                </FilterGroup>
                <FilterGroup label="Min rating">
                  {[0, 4, 4.3, 4.5].map((r) => (
                    <Chip key={r} active={minRating === r} onClick={() => setMinRating(r)}>
                      {r === 0 ? "Any" : `${r}+`}
                    </Chip>
                  ))}
                </FilterGroup>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      setVibes(new Set());
                      setPrices(new Set());
                      setMinRating(0);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" /> Clear all
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground">
            <span>
              <span className="font-semibold text-foreground">{filtered.length}</span> place{filtered.length === 1 ? "" : "s"} in Addis
            </span>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto px-3 pb-4">
            {filtered.map((p) => (
              <PlaceCard key={p.id} place={p} onHover={setActiveId} />
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-12 text-center text-sm text-muted-foreground">
                No places match your filters. Try clearing a few.
              </div>
            )}
          </div>
        </aside>

        {/* Map */}
        <div className="relative h-[50vh] flex-1 lg:h-auto">
          <MapView places={filtered} activeId={activeId} />
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
        active
          ? "bg-foreground text-background"
          : "bg-card text-foreground ring-1 ring-border hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}
