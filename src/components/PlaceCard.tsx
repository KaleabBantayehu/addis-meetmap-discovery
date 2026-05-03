import { Link } from "@tanstack/react-router";
import { Star, MapPin } from "lucide-react";
import type { Place } from "@/data/places";

export function PlaceCard({ place, onHover }: { place: Place; onHover?: (id: string | null) => void }) {
  return (
    <Link
      to="/place/$id"
      params={{ id: place.id }}
      onMouseEnter={() => onHover?.(place.id)}
      onMouseLeave={() => onHover?.(null)}
      className="group flex gap-3 rounded-2xl bg-card p-3 shadow-[var(--shadow-soft)] ring-1 ring-border/50 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
    >
      <img
        src={place.image}
        alt={place.name}
        loading="lazy"
        className="h-24 w-24 flex-shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1 py-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-semibold leading-tight">{place.name}</h3>
          <span className="flex-shrink-0 text-sm font-medium text-muted-foreground">{place.price}</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{place.area}</span>
          <span>•</span>
          <span>{place.category}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-sm font-semibold">{place.rating}</span>
          <span className="text-xs text-muted-foreground">({place.reviewCount})</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {place.vibes.slice(0, 2).map((v) => (
            <span
              key={v}
              className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground"
            >
              {v}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
