import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Mail,
  Phone,
  User,
  Check,
  Camera,
  Globe2,
  Instagram,
  Users,
} from "lucide-react";

export default function GastaroSite() {
  const [view, setView] = useState<
    "home" | "contact" | "impressum" | "datenschutz"
  >("home");

  return (
    <div className="min-h-screen w-full bg-black text-white font-[ui-sans-serif] selection:bg-white/90 selection:text-black">
      {/* Top Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setView("home")}
            className="group inline-flex items-center gap-2 text-lg font-medium hover:opacity-90"
          >
            <Sparkles className="h-5 w-5" />
            <span className="tracking-wide">Gastaro</span>
          </button>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <button
              onClick={() => setView("home")}
              className={`hover:opacity-80 ${
                view === "home" ? "opacity-100" : "opacity-70"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setView("contact")}
              className={`hover:opacity-80 ${
                view === "contact" ? "opacity-100" : "opacity-70"
              }`}
            >
              Kontakt
            </button>
          </nav>
          <button
            onClick={() => setView("contact")}
            className="rounded-2xl bg-white text-black px-4 py-1.5 text-sm font-semibold hover:bg-white/90 transition"
          >
            Anfrage
          </button>
        </div>
      </header>

      {view === "home" && <HomeView goContact={() => setView("contact")} />}
      {view === "contact" && <ContactView goHome={() => setView("home")} />}
      {view === "impressum" && <ImpressumView />}
      {view === "datenschutz" && <DatenschutzView />}

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24">
        <div className="mx-auto max-w-6xl px-4 py-10 text-xs text-white/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Gastaro. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-white" onClick={() => setView("impressum")}>
              Impressum
            </button>
            <button className="hover:text-white" onClick={() => setView("datenschutz")}>
              Datenschutz
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- HOME VIEW ---------- */
function HomeView({ goContact }: { goContact: () => void }) {
  return (
    <main>
      {/* HERO */}
      <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
        <GradientGlow />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-[11vw] leading-none font-semibold tracking-tight text-center select-none"
        >
          Gastaro
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-24 flex flex-col items-center gap-4 text-white/70"
        >
          <p className="text-sm">Wir servieren Ihren Erfolg.</p>
          <button
            onClick={goContact}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition"
          >
            Lass uns sprechen <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="relative py-28">
        <div className="mx-auto max-w-4xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-semibold tracking-tight mb-6"
          >
            About Us – Gastaro
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-white/80 text-lg leading-relaxed space-y-6"
          >
            <p>
              Willkommen bei Gastaro – Ihrer digitalen Agentur für die Gastronomie.
            </p>
            <p>
              Wir glauben daran, dass jedes Restaurant, Café oder jede Bar eine
              Online-Präsenz verdient, die genauso einladend ist wie der erste Eindruck
              vor Ort. Gastaro wurde mit dem Ziel gegründet, Gastronomiebetrieben
              dabei zu helfen, ihre Gäste auch online zu begeistern und neue Kunden zu
              gewinnen.
            </p>
            <p>
              Unser Team besteht aus internationalen Experten für Webdesign, Social
              Media und digitales Marketing. Gemeinsam kombinieren wir Kreativität,
              technisches Know-how und Branchenverständnis, um für unsere Kunden
              maßgeschneiderte Lösungen zu schaffen.
            </p>
            <p>Dabei setzen wir auf drei Grundprinzipien:</p>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>
                <strong>Schnelligkeit</strong> – Ihre Website ist innerhalb von 7 Tagen online.
              </li>
              <li>
                <strong>Verlässlichkeit</strong> – Wir sind 24/7 erreichbar, wenn Sie uns brauchen.
              </li>
              <li>
                <strong>Qualität</strong> – Jede Lösung wird individuell geprüft, angepasst und optimiert.
              </li>
            </ul>
            <p>
              Ob moderne Website, erfolgreiche Social-Media-Strategie oder professionelles Branding –
              mit Gastaro bekommen Sie alles aus einer Hand. Wir sind kein anonymer Anbieter, sondern
              Ihr persönlicher Partner, der sich wirklich für den Erfolg Ihres Betriebs einsetzt.
            </p>
            <p>
              <strong>👉 Gastaro – Ihr digitales Team für die Gastronomie.</strong>
            </p>
          </motion.div>

          {/* BADGES */}
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
              <Check className="h-4 w-4" />
              24/7 erreichbar
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
              <Check className="h-4 w-4" />
              Go-Live in 14 Tagen
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
/* ---------- CONTACT VIEW ---------- */
function ContactView({ goHome }: { goHome: () => void }) {
  return (
    <main className="pt-24">
      <section className="mx-auto max-w-5xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
              Kontaktiere uns
            </h2>
            <p className="text-white/70 mt-3 max-w-2xl">
              Webseiten. Marketing. Fotos. Social Media. Recruiting im Premium-Paket.  
              Alles vollkommen individuell auf Ihre Präferenzen abgestimmt.
            </p>
          </div>
          <button
            onClick={goHome}
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition"
          >
            Zurück <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 mt-14 grid md:grid-cols-4 gap-4">
        {[
          { icon: <Globe2 className="h-5 w-5" />, label: "Website erstellen" },
          { icon: <Camera className="h-5 w-5" />, label: "Professionelle Fotos" },
          { icon: <Instagram className="h-5 w-5" />, label: "Social-Media-Präsenz" },
          { icon: <Users className="h-5 w-5" />, label: "Marketing & Ads" },
        ].map((o, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center gap-2 text-white/90">
              <span>{o.icon}</span>
              <span className="font-medium">{o.label}</span>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-4 mt-24 mb-24">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Lass uns sprechen
            </h3>
            <p className="text-white/70 mt-3">
              Kurze Nachricht reicht. Wir melden uns in unter 24 Stunden – oft schneller.  
              Diskret, klar, verbindlich.
            </p>
            <ul className="mt-6 space-y-2 text-white/70 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +49 ••• ••••••• / +49 ••• •••••••
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> contact@gastaro.com
              </li>
            </ul>
            <div className="mt-8 flex items-center gap-3 text-white/60 text-xs">
              <Check className="h-4 w-4" /> 24/7 erreichbar
              <Check className="h-4 w-4" /> NDA auf Wunsch
              <Check className="h-4 w-4" /> Go-Live in 14 Tagen
            </div>
          </div>

<form
  onSubmit={async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(fd.entries());

    const res = await fetch("/.netlify/functions/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Danke! Wir melden uns in Kürze.");
      (e.currentTarget as HTMLFormElement).reset();
    } else {
      const t = await res.text();
      alert("Fehler beim Senden: " + t);
    }
  }}
  className="rounded-2xl border border-white/10 bg-white/5 p-6"
>
  <div className="grid grid-cols-1 gap-4">
    <Field name="name" icon={<User className="h-4 w-4" />} placeholder="Ihr Name" required />
    <Field name="email" icon={<Mail className="h-4 w-4" />} type="email" placeholder="E-Mail" required />
    <Field name="phone" icon={<Phone className="h-4 w-4" />} placeholder="Telefon (optional)" />
    <textarea
      name="message"
      placeholder="Worum geht es?"
      required
      className="w-full rounded-xl bg-black/40 border border-white/15 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 min-h-[120px]"
    />
    <button className="rounded-xl bg-white text-black px-5 py-3 font-semibold hover:bg-white/90 transition">
      Anfrage senden
    </button>
  </div>
  <p className="text-xs text-white/50 mt-3">
    Mit dem Senden stimmen Sie unserer Datenschutzerklärung zu.
  </p>
</form>

        </div>
      </section>
    </main>
  );
}

/* ---------- IMPRESSUM ---------- */
function ImpressumView() {
  return (
    <main className="pt-28 pb-20 mx-auto max-w-4xl px-4">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">Impressum</h1>
      <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-white/80">
        <p><strong>Angaben gemäß § 5 TMG</strong></p>
        <p>
          Gastaro<br />
          Feilitzstraße 34<br />
          80802 München (Schwabing)<br />
          Deutschland
        </p>
        <p><strong>Vertreten durch:</strong><br />Sebastian Eisenburg</p>
        <p>
          <strong>Kontakt:</strong><br />
          Telefon: +49 ••• ••••••• / +49 ••• •••••••<br />
          E-Mail: contact@gastaro.com
        </p>
        <p><strong>Umsatzsteuer-ID:</strong><br />In Bearbeitung</p>
        <p><strong>Aufsichtsbehörde:</strong><br />Zuständige Aufsichtsbehörde München</p>
        <p>
          <strong>EU-Streitschlichtung</strong><br />
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>. Wir sind weder verpflichtet noch bereit, an Verbraucherschlichtungsverfahren teilzunehmen.
        </p>
        <p className="text-white/60 text-xs">
          Dieses Impressum gilt auch für unsere Social-Media-Profile. Keine Rechtsberatung.
        </p>
      </div>
    </main>
  );
}

/* ---------- DATENSCHUTZ ---------- */
function DatenschutzView() {
  return (
    <main className="pt-28 pb-20 mx-auto max-w-4xl px-4">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">Datenschutzerklärung</h1>
      <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-white/80">
        <p>
  <strong>1. Verantwortlicher</strong><br />
  Gastaro<br />
  Sebastian Eisenburg<br />
  Aaron Schwabe<br />
  Feilitzstraße 34, 80802 München, Deutschland<br />
  E-Mail: contact@gastaro.com &nbsp;&nbsp; Telefon: +49 ••• •••••• / +49 ••• ••••••
</p>

        <p><strong>2. Hosting</strong><br />
          Unsere Website wird bei <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet.  
          Der Anbieter erhält technische Zugriffsdaten (IP-Adresse, Browsertyp, Uhrzeit) zur Sicherung des Betriebs. 
          Datenübertragung erfolgt auf Basis der EU-Standardvertragsklauseln (SCCs).
        </p>
        <p><strong>3. Zwecke und Rechtsgrundlagen</strong><br />
          Verarbeitung zur Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO), zur Bearbeitung von Kontaktanfragen (Art. 6 Abs. 1 lit. b DSGVO) und nach Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
        </p>
        <p><strong>4. Kontaktformular</strong><br />
          Übermittelte Daten (Name, E-Mail, Telefon, Nachricht) werden ausschließlich zur Bearbeitung verwendet und nach 12 Monaten gelöscht.
        </p>
        <p><strong>5. Server-Logfiles</strong><br />
          Beim Aufruf der Seite erfasst Vercel automatisch technische Zugriffsdaten (IP, Datum, Browser) – notwendig für den stabilen Betrieb.
        </p>
        <p><strong>6. Cookies & Tracking</strong><br />
          Unsere Website verwendet keine Cookies oder Analyse-Tools.
        </p>
        <p><strong>7. Rechte der betroffenen Personen</strong><br />
          Sie haben Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO). 
          Beschwerden an die zuständige Datenschutzaufsichtsbehörde sind möglich.
        </p>
        <p><strong>8. Datensicherheit</strong><br />
          Wir treffen technische und organisatorische Maßnahmen zum Schutz Ihrer Daten.
        </p>
        <p><strong>9. Änderungen</strong><br />
          Wir behalten uns vor, diese Erklärung bei Bedarf anzupassen.
        </p>
        <p className="text-white/60 text-xs">
          Stand: {new Date().toLocaleDateString("de-DE")} – Erstellt für Hosting über Netlify, nach aktuellen DSGVO-Richtlinien.
        </p>
      </div>
    </main>
  );
}

/* ---------- HILFSKOMPONENTEN ---------- */
function Field({
  name, icon, placeholder, type = "text", required = false
}: { name: string; icon: React.ReactNode; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-black/40 border border-white/15 px-4 py-3">
      <span className="shrink-0 text-white/60">{icon}</span>
      <input
        name={name}
        required={required}
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none placeholder:text-white/40"
      />
    </div>
  );
}

function GradientGlow() {
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(255,255,255,0.2),rgba(0,0,0,0)_60%)]" />
      <div className="absolute -z-10 inset-x-0 top-1/3 h-64 blur-3xl opacity-50" aria-hidden>
        <div className="mx-auto max-w-5xl h-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-full" />
      </div>
    </>
  );
}
