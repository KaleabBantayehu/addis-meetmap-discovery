import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { PlaceCard } from "@/components/PlaceCard";
import { MapView } from "@/components/MapView";
import { places } from "@/data/places";
import { ArrowRight, Map, MessageSquareQuote, SlidersHorizontal, Star } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MeetMap Addis — Find the right place, every time" },
      {
        name: "description",
        content:
          "Honest, map-based discovery for restaurants, cafes, and meeting spots in Addis Ababa. Real reviews, no marketing hype.",
      },
      { property: "og:title", content: "MeetMap Addis — Find the right place, every time" },
      {
        property: "og:description",
        content: "Map-based discovery for Addis Ababa. Honest reviews. Real vibes.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const featured = places.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, var(--primary) 0, transparent 40%), radial-gradient(circle at 80% 60%, var(--primary-glow) 0, transparent 45%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pt-20 lg:pt-28">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Built for Addis Ababa
              </div>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Find the right place,{" "}
                <span className="bg-gradient-to-br from-primary to-primary-glow bg-clip-text text-transparent">
                  every time.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Instagram lies. Promoted reviews lie. MeetMap shows you the real vibe of every cafe, restaurant, and meeting spot in Addis — through honest reviews from people who actually go there.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/explore"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background shadow-[var(--shadow-elevated)] transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  Explore the map
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  Why we built this
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm">
                <div>
                  <div className="font-display text-2xl font-bold">120+</div>
                  <div className="text-xs text-muted-foreground">Places mapped</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="font-display text-2xl font-bold">2.4k</div>
                  <div className="text-xs text-muted-foreground">Honest reviews</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="font-display text-2xl font-bold">9</div>
                  <div className="text-xs text-muted-foreground">Subcities covered</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-elevated)] ring-1 ring-border/60 sm:aspect-[5/4] lg:aspect-[4/5]">
                <div className="grid h-full grid-cols-2">
                  <div className="relative h-full">
                    <MapView places={places} activeId={activeId} />
                  </div>
                  <div className="flex flex-col gap-3 overflow-y-auto bg-muted/30 p-3">
                    {featured.map((p) => (
                      <PlaceCard key={p.id} place={p} onHover={setActiveId} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-card p-3 shadow-[var(--shadow-elevated)] ring-1 ring-border sm:block">
                <div className="flex items-center gap-2 text-xs">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-semibold">4.7</span>
                  <span className="text-muted-foreground">Tomoca, Piassa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Made for the way Addis actually eats out.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three tools. One purpose: stop wasting evenings on places that don't match the photos.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Map,
              title: "Map-first discovery",
              body: "See every place on a real map of Addis. Filter by subcity, walk distance, or vibe — not by who paid for the ad.",
            },
            {
              icon: MessageSquareQuote,
              title: "Honest, structured reviews",
              body: "Each review covers service, environment, and price separately. So you know exactly what you're walking into.",
            },
            {
              icon: SlidersHorizontal,
              title: "Vibe filters that mean something",
              body: "Quiet for a meeting. Romantic for a date. Work-friendly for a Tuesday. Filters built around real reasons people go out.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-border bg-card p-7 transition-colors hover:border-primary/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="text-sm font-semibold uppercase tracking-widest text-primary">
                How it works
              </div>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Three taps to a place you'll actually like.
              </h2>
            </div>
            <ol className="space-y-8">
              {[
                ["Open the map", "Pins show every cafe, restaurant, and lounge across Addis with price at a glance."],
                ["Filter by what matters", "Quiet for work? Romantic for a date? Tap the vibe and the map narrows in seconds."],
                ["Read what locals really said", "Real reviews. No promoted listings. No paid placements. Decide with confidence."],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-foreground font-display text-base font-bold text-background">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{t}</h3>
                    <p className="mt-1 text-muted-foreground">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-foreground p-10 text-background sm:p-16">
          <div
            className="absolute inset-0 -z-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(circle at 80% 30%, var(--primary) 0, transparent 50%)" }}
          />
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Stop guessing. Start going.
            </h2>
            <p className="mt-4 text-lg text-background/70">
              Join thousands of young Addis professionals using MeetMap to choose where to meet, eat, and work.
            </p>
            <Link
              to="/explore"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
            >
              Explore places
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <div>© 2026 MeetMap Addis. Made in Addis Ababa.</div>
        <div className="flex gap-5">
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
