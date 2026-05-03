import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { places } from "@/data/places";
import { ArrowLeft, MapPin, Star, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/place/$id")({
  component: PlacePage,
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <p>Place not found.</p>
      <Link to="/explore" className="text-primary underline">Back to explore</Link>
    </div>
  ),
});

function PlacePage() {
  const { id } = Route.useParams();
  const place = places.find((p) => p.id === id);
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(false);

  if (!place) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Place not found</h1>
          <Link to="/explore" className="mt-4 inline-block text-primary underline">Back to explore</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Toaster richColors position="top-center" />

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <button
          onClick={() => navigate({ to: "/explore" })}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to explore
        </button>

        <div className="overflow-hidden rounded-3xl">
          <img src={place.image} alt={place.name} className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]" />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {place.name}
                </h1>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{place.area}</span>
                  <span>•</span>
                  <span>{place.category}</span>
                  <span>•</span>
                  <span className="font-medium text-foreground">{place.price}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-background">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-semibold">{place.rating}</span>
                <span className="text-xs opacity-70">({place.reviewCount})</span>
              </div>
            </div>

            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{place.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {place.vibes.map((v) => (
                <span
                  key={v}
                  className="rounded-full bg-accent px-3 py-1 text-xs font-medium capitalize text-accent-foreground"
                >
                  {v}
                </span>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Reviews</h2>
              <button
                onClick={() => setShowReview(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90"
              >
                <Plus className="h-4 w-4" /> Add review
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {place.reviews.map((r) => (
                <div key={r.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground">
                        {r.author[0]}
                      </div>
                      <div>
                        <div className="font-semibold">{r.author}</div>
                        <div className="text-xs text-muted-foreground">{r.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < r.rating ? "fill-primary text-primary" : "text-border"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 leading-relaxed text-foreground/90">{r.text}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.tags.map((t) => (
                      <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Quick info</div>
              <dl className="mt-4 space-y-3 text-sm">
                <Row k="Price" v={place.price} />
                <Row k="Category" v={place.category} />
                <Row k="Area" v={place.area} />
                <Row k="Rating" v={`${place.rating} (${place.reviewCount} reviews)`} />
              </dl>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-accent"
              >
                <MapPin className="h-4 w-4" /> Open in Maps
              </a>
            </div>
          </aside>
        </div>
      </div>

      {showReview && <ReviewModal place={place.name} onClose={() => setShowReview(false)} />}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  );
}

function ReviewModal({ place, onClose }: { place: string; onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [tags, setTags] = useState<Set<string>>(new Set());
  const tagOptions = ["service", "environment", "price"];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !text) {
      toast.error("Please add a rating and a short review.");
      return;
    }
    toast.success("Thanks! Your review was submitted.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-t-3xl bg-card p-6 shadow-[var(--shadow-elevated)] sm:rounded-3xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Add a review</h2>
            <p className="mt-1 text-sm text-muted-foreground">{place}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 hover:bg-accent" aria-label="Close">
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="mt-6">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rating</label>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className="rounded-lg p-1 hover:bg-accent"
                aria-label={`${n} stars`}
              >
                <Star className={`h-7 w-7 ${n <= rating ? "fill-primary text-primary" : "text-border"}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Review</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="What was the vibe? How was the service? Was the price fair?"
            className="mt-2 w-full resize-none rounded-2xl border border-border bg-background p-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="mt-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags</label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tagOptions.map((t) => {
              const active = tags.has(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    const n = new Set(tags);
                    n.has(t) ? n.delete(t) : n.add(t);
                    setTags(n);
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                    active ? "bg-foreground text-background" : "bg-muted text-foreground hover:bg-accent"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="mt-7 w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background hover:opacity-90"
        >
          Submit review
        </button>
      </form>
    </div>
  );
}
