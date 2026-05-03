import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Mail, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MeetMap Addis" },
      { name: "description", content: "Get in touch with the MeetMap Addis team. Suggest a place, partner with us, or send feedback." },
      { property: "og:title", content: "Contact — MeetMap Addis" },
      { property: "og:description", content: "Suggest a place or send feedback." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent. We'll reply within 48 hours.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Toaster richColors position="top-center" />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</div>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">Let's talk.</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Suggest a place we missed, report a bad listing, or partner with us. We read everything.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
          <form onSubmit={submit} className="space-y-5 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <Field label="Your name">
              <input required className="input" placeholder="Selam" />
            </Field>
            <Field label="Email">
              <input required type="email" className="input" placeholder="you@email.com" />
            </Field>
            <Field label="What's on your mind?">
              <textarea required rows={5} className="input resize-none" placeholder="Suggest a place, give feedback, or just say hi." />
            </Field>
            <button
              type="submit"
              disabled={sent}
              className="w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50"
            >
              {sent ? "Sent ✓" : "Send message"}
            </button>
          </form>

          <aside className="space-y-4">
            <Info icon={Mail} title="Email" body="hello@meetmap.et" />
            <Info icon={MapPin} title="Office" body="Bole Medhanealem, Addis Ababa" />
            <Info icon={MessageCircle} title="Telegram" body="@meetmapaddis" />
          </aside>
        </div>
      </div>
      <style>{`
        .input { width:100%; border:1px solid var(--color-border); background: var(--color-background); border-radius: 1rem; padding: 0.75rem 1rem; font-size: 0.875rem; outline: none; transition: border-color .15s; }
        .input:focus { border-color: var(--color-primary); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Info({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      <div className="mt-1 font-medium">{body}</div>
    </div>
  );
}
