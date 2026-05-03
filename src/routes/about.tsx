import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — MeetMap Addis" },
      { name: "description", content: "Why we built MeetMap Addis: solving the trust problem in restaurant discovery." },
      { property: "og:title", content: "About — MeetMap Addis" },
      { property: "og:description", content: "Built locally, for the way Addis actually goes out." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-sm font-semibold uppercase tracking-widest text-primary">About</div>
        <h1 className="mt-3 font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
          We got tired of being lied to by Instagram.
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/90">
          <p>
            Every weekend in Addis, the same thing happens. You see a beautiful reel of a cafe in Bole. The lighting is perfect, the food looks amazing, the place looks calm. You drive across town. You find a loud, cramped room with overpriced macchiatos and a 20-minute wait for a table that wobbles.
          </p>
          <p>
            That gap — between how a place markets itself and how it actually feels — is the trust problem. And it's expensive. It costs you time, money, fuel, and the energy to rebook a meeting because the spot you picked turned out to be wrong.
          </p>
          <p>
            <strong>MeetMap Addis</strong> exists to close that gap. It's a map-first discovery platform built around honest, structured reviews. Not paid placements. Not influencer hype. Just real signal from people who actually went.
          </p>
          <p>
            We're young people from Addis building for young people from Addis. Students who need a quiet corner to study before exams. Freelancers looking for a power outlet and decent wifi. Friends planning a birthday dinner who want to know if the music will be too loud to talk over. Couples looking for a real date spot, not a stage set.
          </p>
          <p>
            The product is intentionally small. A map. Honest reviews. Filters that mean something. That's it. We'd rather do three things well than fifteen things half-built.
          </p>
          <p>
            If you've ever wasted an evening on a place that didn't match the photos — this one's for you.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-muted/40 p-8">
          <div className="font-display text-2xl font-bold">Built on three rules.</div>
          <ul className="mt-5 space-y-3 text-foreground/90">
            <li>→ No paid placements. Ever.</li>
            <li>→ Reviews are structured: service, environment, and price are separate.</li>
            <li>→ If we wouldn't send a friend there, we don't recommend it.</li>
          </ul>
        </div>

        <div className="mt-12">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background hover:opacity-90"
          >
            Start exploring
          </Link>
        </div>
      </article>
    </div>
  );
}
