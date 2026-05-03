import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "@tanstack/react-router";
import type { Place } from "@/data/places";

const ADDIS: [number, number] = [9.012, 38.78];

function makeIcon(label: string, active: boolean) {
  return L.divIcon({
    className: "",
    html: `<div class="mm-pin" style="${active ? "transform:rotate(-45deg) scale(1.2);box-shadow:0 6px 20px rgba(0,0,0,.35);" : ""}"><span>${label}</span></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
}

function FlyTo({ id, places }: { id: string | null; places: Place[] }) {
  const map = useMap();
  useEffect(() => {
    if (!id) return;
    const p = places.find((x) => x.id === id);
    if (p) map.flyTo([p.lat, p.lng], 14, { duration: 0.6 });
  }, [id, map, places]);
  return null;
}

export function MapView({ places, activeId }: { places: Place[]; activeId: string | null }) {
  const navigate = useNavigate();
  return (
    <MapContainer center={ADDIS} zoom={13} scrollWheelZoom className="h-full w-full" zoomControl={false}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <FlyTo id={activeId} places={places} />
      {places.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={makeIcon(p.price, activeId === p.id)}
          eventHandlers={{ click: () => navigate({ to: "/place/$id", params: { id: p.id } }) }}
        />
      ))}
    </MapContainer>
  );
}
