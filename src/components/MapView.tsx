import { lazy, Suspense, useEffect, useState } from "react";
import { createClientOnlyFn } from "@tanstack/react-start";
import type { Place } from "@/data/places";

const MapInner = createClientOnlyFn(() => lazy(() => import("./MapView.client").then((m) => ({ default: m.MapView }))));;

export function MapView({ places, activeId }: { places: Place[]; activeId: string | null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="h-full w-full animate-pulse bg-muted" aria-label="Loading map" />;
  }
  return (
    <Suspense fallback={<div className="h-full w-full animate-pulse bg-muted" />}>
      <MapInner places={places} activeId={activeId} />
    </Suspense>
  );
}
