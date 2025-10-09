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
import ServiceDetails from "./ServiceDetails";

export default function GastaroSite() {
  const [view, setView] = useState<
    "home" | "contact" | "impressum" | "datenschutz" | "problematik" | "herangehensweise"
  >("home");

  // Einheitliche Navigation mit Scroll-to-Top
  const changeView = (v: typeof view) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-screen w-full bg-black text-white font-[ui-sans-serif] selection:bg-white/90 selection:text-black">
      {/* Top Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => changeView("home")}
            className="group inline-flex items-center gap-2 text-lg font-medium hover:opacity-90"
          >
            <Sparkles className="h-5 w-5" />
            <span className="tracking-wide">Gastaro</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <button
              onClick={() => changeView("home")}
              className={`hover:opacity-80 ${view === "home" ? "opacity-100" : "opacity-70"}`}
            >
              About
            </button>
            <button
              onClick={() => changeView("problematik")}
              className={`hover:opacity-80 ${view === "problematik" ? "opacity-100" : "opacity-70"}`}
            >
              Problematik
            </button>
            <button
              onClick={() => changeView("herangehensweise")}
              className={`hover:opacity-80 ${view === "herangehensweise" ? "opacity-100" : "opacity-70"}`}
            >
              Herangehensweise
            </button>
            <button
              onClick={() => changeView("contact")}
              className={`hover:opacity-80 ${view === "contact" ? "opacity-100" : "opacity-70"}`}
            >
              Kontakt
            </button>
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => changeView("contact")}
            className="hidden sm:inline-flex rounded-2xl bg-white text-black px-4 py-1.5 text-sm font-semibold hover:bg-white/90 transition"
          >
            Anfrage
          </button>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <MobileMenu setView={changeView} view={view} />
          </div>
        </div>
      </header>

      {/* Page Views */}
      {view === "home" && <HomeView goContact={() => changeView("contact")} />}
      {view === "contact" && <ContactView goHome={() => changeView("home")} />}
      {view === "problematik" && (
        <ProblematikView
          goHome={() => changeView("home")}
          goNext={() => changeView("herangehensweise")}
        />
      )}
      {view === "herangehensweise" && <HerangehensweiseView goContact={() => changeView("contact")} />}
      {view === "impressum" && <ImpressumView />}
      {view === "datenschutz" && <DatenschutzView />}

      {/* Footer */}
      <footer className="border-t border-white/10 mt-24">
        <div className="mx-auto max-w-6xl px-4 py-10 text-xs text-white/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Gastaro. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <button
              className="hover:text-white"
              onClick={() => changeView("impressum")}
            >
              Impressum
            </button>
            <button
              className="hover:text-white"
              onClick={() => changeView("datenschutz")}
            >
              Datenschutz
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- MOBILE MENU ---------- */
function MobileMenu({
  setView,
  view,
}: {
  setView: (v: any) => void;
  view: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition"
      >
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.div>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl py-3 shadow-xl"
        >
          {[
            { label: "About", view: "home" },
            { label: "Problematik", view: "problematik" },
            { label: "Herangehensweise", view: "herangehensweise" },
            { label: "Kontakt", view: "contact" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setView(item.view);
                setOpen(false);
              }}
              className={`block w-full text-left px-5 py-2 text-sm hover:bg-white/10 ${
                view === item.view ? "text-white" : "text-white/70"
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="border-t border-white/10 my-2"></div>

          <button
            onClick={() => {
              setView("contact");
              setOpen(false);
            }}
            className="w-[90%] mx-auto block rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
          >
            Anfrage
          </button>
        </motion.div>
      )}
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
              Willkommen bei Gastaro – Ihrer digitalen Agentur für die
              Gastronomie.
            </p>
            <p>
              Wir glauben daran, dass jedes Restaurant, Café oder jede Bar eine
              Online-Präsenz verdient, die genauso einladend ist wie der erste
              Eindruck vor Ort. Gastaro wurde mit dem Ziel gegründet,
              Gastronomiebetrieben dabei zu helfen, ihre Gäste auch online zu
              begeistern und neue Kunden zu gewinnen.
            </p>
            <p>
              Unser Team besteht aus internationalen Experten für Webdesign,
              Social Media und digitales Marketing. Gemeinsam kombinieren wir
              Kreativität, technisches Know-how und Branchenverständnis, um für
              unsere Kunden maßgeschneiderte Lösungen zu schaffen.
            </p>
            <p>Dabei setzen wir auf drei Grundprinzipien:</p>
            <ul className="list-disc list-inside space-y-2 text-white/80">
              <li>
                <strong>Schnelligkeit</strong> – Ihre Website ist innerhalb von
                7 Tagen online.
              </li>
              <li>
                <strong>Verlässlichkeit</strong> – Wir sind 24/7 erreichbar,
                wenn Sie uns brauchen.
              </li>
              <li>
                <strong>Qualität</strong> – Jede Lösung wird individuell geprüft,
                angepasst und optimiert.
              </li>
            </ul>
            <p>
              Ob moderne Website, erfolgreiche Social-Media-Strategie oder
              professionelles Branding – mit Gastaro bekommen Sie alles aus
              einer Hand. Wir sind kein anonymer Anbieter, sondern Ihr
              persönlicher Partner, der sich wirklich für den Erfolg Ihres
              Betriebs einsetzt.
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

      {/* Auswahlfelder (jetzt klickbar & smooth scroll) */}
      <section className="mx-auto max-w-5xl px-4 mt-14 grid md:grid-cols-4 gap-4">
        {[
          { id: "websites", icon: <Globe2 className="h-5 w-5" />, label: "Website erstellen" },
          { id: "fotos", icon: <Camera className="h-5 w-5" />, label: "Professionelle Fotos" },
          { id: "socialmedia", icon: <Instagram className="h-5 w-5" />, label: "Social-Media-Präsenz" },
          { id: "marketing", icon: <Users className="h-5 w-5" />, label: "Marketing & Ads" },
        ].map((o, i) => (
          <motion.button
            key={i}
            onClick={() =>
              document.getElementById(o.id)?.scrollIntoView({ behavior: "smooth" })
            }
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i }}
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition text-left"
          >
            <div className="flex items-center gap-2 text-white/90">
              <span>{o.icon}</span>
              <span className="font-medium">{o.label}</span>
            </div>
          </motion.button>
        ))}
      </section>

      {/* Kontaktformular */}
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
                <Phone className="h-4 w-4" /> +49 162 1850 343 / +49 151 561 56993
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
              <Field
                name="name"
                icon={<User className="h-4 w-4" />}
                placeholder="Ihr Name"
                required
              />
              <Field
                name="email"
                icon={<Mail className="h-4 w-4" />}
                type="email"
                placeholder="E-Mail"
                required
              />
              <Field
                name="phone"
                icon={<Phone className="h-4 w-4" />}
                placeholder="Telefon (optional)"
              />
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

      {/* Neue scrollbare Service-Sektion */}
      <ServiceDetails />
    </main>
  );
}

/* ---------- IMPRESSUM ---------- */
function ImpressumView() {
  return (
    <main className="pt-28 pb-20 mx-auto max-w-4xl px-4">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
        Impressum
      </h1>
      <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-white/80">
        <p>
          <strong>Angaben gemäß § 5 TMG</strong>
        </p>
        <p>
          Gastaro<br />
          Feilitzstraße 34<br />
          80802 München (Schwabing)<br />
          Deutschland
        </p>
        <p>
          <strong>Vertreten durch:</strong>
          <br />
          Aaron Schwabe
        </p>
        <p>
          <strong>Kontakt:</strong>
          <br />
          Telefon: +49 ••• ••••••• / +49 ••• •••••••
          <br />
          E-Mail: contact@gastaro.com
        </p>
        <p>
          <strong>Umsatzsteuer-ID:</strong>
          <br />
          In Bearbeitung
        </p>
        <p>
          <strong>Aufsichtsbehörde:</strong>
          <br />
          Zuständige Aufsichtsbehörde München
        </p>
        <p>
          <strong>EU-Streitschlichtung</strong>
          <br />
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Wir sind weder verpflichtet noch bereit, an
          Verbraucherschlichtungsverfahren teilzunehmen.
        </p>
        <p className="text-white/60 text-xs">
          Dieses Impressum gilt auch für unsere Social-Media-Profile. Keine
          Rechtsberatung.
        </p>
      </div>
    </main>
  );
}

/* ---------- DATENSCHUTZ ---------- */
function DatenschutzView() {
  return (
    <main className="pt-28 pb-20 mx-auto max-w-4xl px-4">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
        Datenschutzerklärung
      </h1>
      <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-white/80">
        <p>
          <strong>1. Verantwortlicher</strong>
          <br />
          Gastaro
          <br />
          Sebastian Eisenburg
          <br />
          Aaron Schwabe
          <br />
          Feilitzstraße 34, 80802 München, Deutschland
          <br />
          E-Mail: contact@gastaro.com &nbsp;&nbsp; Telefon: +49 162 1850 343 / +49
          ••• ••••••
        </p>

        <p>
          <strong>2. Hosting</strong>
          <br />
          Unsere Website wird bei <strong>Netlify, Inc.</strong>, 2325 3rd Street, Suite 296, San Francisco,
          CA 94107, USA, gehostet. Der Anbieter erhält technische Zugriffsdaten (z.&nbsp;B. IP-Adresse,
          Browsertyp, Betriebssystem, Zugriffszeitpunkt), die zum sicheren und stabilen Betrieb der Website
          erforderlich sind. Die Datenverarbeitung erfolgt auf Grundlage von
          <strong> Art. 6 Abs. 1 lit. f DSGVO</strong> (berechtigtes Interesse an der technischen Bereitstellung
          und Sicherheit der Website). Die Übermittlung in die USA erfolgt auf Basis der
          <strong> EU-Standardvertragsklauseln (SCCs)</strong>, die ein angemessenes Datenschutzniveau
          gewährleisten. Weitere Informationen:{" "}
          <a
            href="https://www.netlify.com/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            https://www.netlify.com/privacy/
          </a>.
        </p>

        <p>
          <strong>3. Zwecke und Rechtsgrundlagen</strong>
          <br />
          Verarbeitung zur Bereitstellung der Website (Art. 6 Abs. 1 lit. f
          DSGVO), zur Bearbeitung von Kontaktanfragen (Art. 6 Abs. 1 lit. b
          DSGVO) und nach Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
        </p>
        <p>
          <strong>4. Kontaktformular</strong>
          <br />
          Übermittelte Daten (Name, E-Mail, Telefon, Nachricht) werden
          ausschließlich zur Bearbeitung verwendet und nach 12 Monaten gelöscht.
        </p>
        <p>
          <strong>5. Server-Logfiles</strong>
          <br />
          Beim Aufruf der Seite erfasst Netlify automatisch technische
          Zugriffsdaten (IP, Datum, Browser) – notwendig für den stabilen
          Betrieb.
        </p>
        <p>
          <strong>6. Cookies & Tracking</strong>
          <br />
          Unsere Website verwendet keine Cookies oder Analyse-Tools.
        </p>
        <p>
          <strong>7. Rechte der betroffenen Personen</strong>
          <br />
          Sie haben Rechte auf Auskunft, Berichtigung, Löschung,
          Einschränkung, Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO).
          Beschwerden an die zuständige Datenschutzaufsichtsbehörde sind möglich.
        </p>
        <p>
          <strong>8. Datensicherheit</strong>
          <br />
          Wir treffen technische und organisatorische Maßnahmen zum Schutz Ihrer
          Daten.
        </p>
        <p>
          <strong>9. Änderungen</strong>
          <br />
          Wir behalten uns vor, diese Erklärung bei Bedarf anzupassen.
        </p>
        <p className="text-white/60 text-xs">
          Stand: {new Date().toLocaleDateString("de-DE")} – Erstellt für Hosting
          über Netlify, nach aktuellen DSGVO-Richtlinien.
        </p>
      </div>
    </main>
  );
}

/* ---------- PROBLEMATIK ---------- */
function ProblematikView({ goHome, goNext }: { goHome: () => void; goNext: () => void }) {
  return (
    <main className="pt-24 pb-32 mx-auto max-w-5xl px-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">Die Problematik</h2>
          <p className="text-white/70 mt-3 max-w-3xl">
            Warum es heute entscheidender denn je ist, eine starke Marketingstrategie
            und eine Agentur zu haben, die wirklich versteht, wie moderne Sichtbarkeit funktioniert.
          </p>
        </div>
        <button
          onClick={goHome}
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition"
        >
          Zurück
        </button>
      </div>

      <section className="mt-20 space-y-10 text-white/80 leading-relaxed">
        {/* Dein Text – ungekürzt */}
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">Die Aktuellen Herausforderungen</h3>
          <p>Wir befinden uns im Moment in einer exponentiell wachsenden Industrie.</p>
          <p>Wo das sofortige Anwenden von Trends und das richtige Angehen der Strategie über Erfolg oder Misserfolg entscheiden können.</p>
          <p>Die Gastronomie ist mehr als nur gutes Essen – sie ist Emotion, Erlebnis und Marke. In einer Welt, in der Gäste ihre Entscheidung oft schon online treffen, ist eine durchdachte Marketingstrategie der Schlüssel, um nicht nur gesehen, sondern erlebt zu werden.</p>
          <p>Wir unterstützen Gastronomiebetriebe dabei, ihre einzigartige Geschichte zu erzählen, ihre Reichweite zu vergrößern und nachhaltig Gäste zu gewinnen. Von Social-Media-Marketing und Content-Strategie bis hin zu Branding und Performance-Kampagnen – wir wissen, was funktioniert, weil wir die Sprache der Gastronomie sprechen.</p>
          <p>Denn Erfolg ist kein Zufall, sondern das Ergebnis einer klaren Strategie, konsequenter Umsetzung und echter Leidenschaft für das, was man tut.</p>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">1. Die Revolution der Online-Suche</h3>
          <p>Suchmaschinen, wie wir sie heute kennen, befinden sich in einem radikalen Wandel.</p>
          <p>Statt klassischer Ergebnislisten liefern sie zunehmend KI-generierte Antworten, die auf großen Sprachmodellen (LLMs) basieren. Diese Systeme durchsuchen nicht mehr nur Webseiten nach Keywords, sondern analysieren und verstehen Inhalte, um daraus präzise, zusammengefasste Antworten zu formulieren – angepasst an die individuellen Interessen und Gewohnheiten der Nutzer.</p>
          <p>Damit verändert sich die Art, wie Sichtbarkeit entsteht:</p>
          <p>Es reicht nicht mehr, einfach gut zu ranken. Entscheidend ist nun, relevante und hochwertige Inhalte zu veröffentlichen, die von diesen Systemen als wertvoll und vertrauenswürdig erkannt werden. Besonders Artikel, Blogbeiträge und lokale Inhalte spielen hier eine zentrale Rolle – denn sie liefern den Kontext, den LLMs nutzen, um ihre Antworten zu bilden.</p>
          <p>Hinzu kommt der Faktor Geo: Suchanfragen werden immer stärker standortbasiert ausgewertet. Wenn jemand nach „bestes italienisches Restaurant in der Nähe“ sucht, entscheidet nicht nur das Ranking, sondern auch die lokale Relevanz und digitale Präsenz des Betriebs, ob er in der Antwort auftaucht.</p>
          <p>Kurz gesagt: Wer heute online sichtbar sein will, muss verstehen, wie KI denkt, Inhalte gewichtet und Orte bewertet – und seine Marketingstrategie gezielt darauf ausrichten.</p>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">2. Die Überproduktion von Inhalten</h3>
          <p>Noch nie war es so einfach, Inhalte zu veröffentlichen – und noch nie war es so schwer, wahrgenommen zu werden.</p>
          <p>Die digitale Welt ist überflutet mit Posts, Reels, Werbeanzeigen und automatisierten Texten. Diese Überproduktion von Content führt dazu, dass selbst gute Botschaften oft im Strom der Informationsflut untergehen.</p>
          <p>Für Gastronomiebetriebe bedeutet das: Wer online sichtbar bleiben will, muss mehr bieten als der Standart. Schöne Bilder oder Standard-Posts. Es braucht echte Kreativität, klare Strategie und ein tiefes Verständnis dafür, wie man Emotionen weckt und Geschichten erzählt, die im Gedächtnis bleiben.</p>
          <p>Nur wer es schafft, seine Marke mit einem einzigartigen Auftritt und konsistentem Stil zu positionieren, wird aus der Masse herausstechen – und die Aufmerksamkeit der Gäste langfristig gewinnen.</p>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">3. Der USP als entscheidender Erfolgsfaktor</h3>
          <p>In einer Zeit, in der täglich unzählige Inhalte veröffentlicht werden, wird der Unique Selling Point (USP) zum zentralen Schlüssel für Sichtbarkeit und Wiedererkennung.</p>
          <p>Der stetige „Content-Spam“ in sozialen Medien und Suchmaschinen führt dazu, dass viele Marken austauschbar wirken – besonders in der Gastronomie, wo ähnliche Bilder, Menüs und Botschaften dominieren.</p>
          <p>Gerade deshalb ist es wichtiger denn je, den eigenen Charakter klar zu kommunizieren:</p>
          <p>Was macht dein Restaurant, Café oder deine Bar wirklich einzigartig?</p>
          <p>Ist es das Konzept, die Atmosphäre, die Geschichte – oder vielleicht die Werte, die du verkörperst?</p>
          <p>Ein klar definierter und konsequent gelebter USP sorgt dafür, dass Gäste nicht nur zufällig auf dich stoßen, sondern gezielt zu dir kommen.</p>
          <p>Er schafft Wiedererkennung, Gemeinschaft, Vertrauen und Loyalität – und macht aus Gästen echte Fans.</p>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">4. Sichtbarkeit auf allen Plattformen</h3>
          <p>Die digitale Präsenz entscheidet heute über den Erfolg einer Marke.</p>
          <p>Gäste informieren sich nicht mehr nur über eine Plattform – sie entdecken Restaurants auf Instagram, lesen Bewertungen auf Google, schauen Videos auf TikTok und suchen Öffnungszeiten auf Maps.</p>
          <p>Wer wirklich herausstechen will, muss überall dort präsent sein, wo seine Zielgruppe sich bewegt.</p>
          <p>Das bedeutet: eine konsistente Markenbotschaft, abgestimmt auf jede Plattform, aber mit klar wiedererkennbarem Stil und Mehrwert.</p>
          <p>In einer Zeit, in der Inhalte in Sekundenschnelle konsumiert und ebenso schnell vergessen werden, reicht einmalige Sichtbarkeit nicht aus.</p>
          <p>Durch den stetigen Fluss kurzer Videos und schneller Trends muss man mehrfach und regelmäßig wahrgenommen werden, um wirklich im Kopf zu bleiben.</p>
          <p>Nur durch diese kontinuierliche und plattformübergreifende Präsenz entsteht Vertrauen, Reichweite und eine starke Markenidentität.</p>
          <p>Denn wer online nicht sichtbar ist – existiert für viele potenzielle Gäste schlichtweg nicht.</p>
        </div>
      </section>

      <div className="mt-16 flex justify-center">
        <button
          onClick={goNext}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 hover:bg-white hover:text-black transition"
        >
          Weiter: Herangehensweise <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}

/* ---------- HERANGEHENSWEISE ---------- */
function HerangehensweiseView({ goContact }: { goContact: () => void }) {
  return (
    <main className="pt-24 pb-32 mx-auto max-w-5xl px-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Unsere Herangehensweise
          </h2>
          <p className="text-white/70 mt-3 max-w-3xl">
            Konsequent auf die zuvor skizzierten Herausforderungen ausgerichtet – praxisnah, messbar, und klar auf nachhaltige Sichtbarkeit und Gästebindung optimiert.
          </p>
        </div>
        <button
          onClick={goContact}
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition"
        >
          Kontakt aufnehmen
        </button>
      </div>

      <section className="mt-20 space-y-12 text-white/80 leading-relaxed">
        {/* Punkt 1 */}
        <div id="websites">
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">
            1) Sichtbarkeit durch Webdesign mit Substanz
          </h3>
          <p>
            Wir bauen keine Webseiten, die „schön aussehen“ – wir entwickeln digitale Auftritte, die <strong>konvertieren</strong>.
            Jede Seite ist darauf ausgelegt, in einer KI-dominierten Suchwelt zu bestehen:
            klare Struktur, starke Inhalte, lokale Relevanz und eine Story, die bleibt.
          </p>
          <p className="mt-3">
            Unser Ziel: Wenn jemand nach <em>„bestes Café in der Nähe“</em> oder <em>„Brunch München Schwabing“</em> sucht, 
            taucht dein Betrieb in der Antwort auf – nicht in der zweiten Reihe, sondern ganz oben.
          </p>
          <p className="mt-3">
            Wir kombinieren moderne Performance, optimierte Ladezeiten und strukturierte Inhalte (E-E-A-T, FAQ, Local Schema), 
            damit Google, KI und Menschen gleichermaßen verstehen, warum dein Betrieb relevant ist.
          </p>
        </div>

        {/* Punkt 2 */}
        <div id="marketing">
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">
            2) Local SEO & Performance Marketing mit Feingefühl
          </h3>
          <p>
            Trends ändern sich – aber das Verhalten der Gäste bleibt konstant: Sie suchen, vergleichen und entscheiden in Sekunden.
            Wir platzieren deinen Betrieb dort, wo diese Entscheidungen fallen.
          </p>
          <p className="mt-3">
            Mit gezielten Google Ads, Social Ads und einer datenbasierten Local-SEO-Strategie schaffen wir es, 
            dass deine Marke sowohl algorithmisch als auch emotional präsent ist.  
            Von Google Maps über TikTok bis hin zu Instagram Reels – jede Plattform hat ihren eigenen Hebel, und wir bedienen alle.
          </p>
          <p className="mt-3">
            Unser Fokus: echte Besucher, echte Reichweite, messbare Ergebnisse – keine gekauften Klicks.
          </p>
        </div>

        {/* Punkt 3 */}
        <div id="socialmedia">
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">
            3) Content, der hängen bleibt – keine Flut aus leeren Posts
          </h3>
          <p>
            In einer Welt, in der täglich Millionen Inhalte veröffentlicht werden, braucht es Strategie statt Quantität.
            Wir schaffen Content, der Emotionen weckt, Geschichten erzählt und Wiedererkennung schafft.
          </p>
          <p className="mt-3">
            Unsere Content Engine sorgt dafür, dass dein Betrieb kontinuierlich präsent bleibt –
            mit authentischen Bildern, Reels und Beiträgen, die deine Werte transportieren.
            Kein generischer „Social Feed“, sondern eine erlebbare Marke mit Haltung.
          </p>
          <p className="mt-3">
            So entsteht nicht nur Reichweite, sondern echte digitale Identität – ein Auftritt, der Vertrauen schafft
            und über Algorithmen hinaus funktioniert.
          </p>
        </div>

        {/* Punkt 4 */}
        <div id="fotos">
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">
            4) Bildsprache & Branding, das Emotionen verkauft
          </h3>
          <p>
            Wir setzen auf visuelle Identität statt Austauschbarkeit.
            Mit professioneller Foto- und Videoproduktion erschaffen wir einen Stil, der Gäste fesselt und deine Marke unterscheidet.
          </p>
          <p className="mt-3">
            Jede Aufnahme erzählt eine Geschichte – vom Espresso bis zur Atmosphäre.
            Einheitliche Visuals über alle Plattformen hinweg sorgen für Wiedererkennung und Markenbindung.
          </p>
          <p className="mt-3">
            Das Ziel: Bilder, die nicht nur gesehen, sondern <strong>gefühlt</strong> werden.
          </p>
        </div>

        {/* Punkt 5 */}
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">
            5) Lokal & Digital verzahnt – ganzheitliche Präsenz
          </h3>
          <p>
            Sichtbarkeit endet nicht online. Wir verknüpfen digitale Maßnahmen mit lokalem Marketing:
            Eröffnungsaktionen, Flyer, QR-Kampagnen oder City-Light-Plakate, die perfekt auf deine Online-Strategie abgestimmt sind.
          </p>
          <p className="mt-3">
            So entsteht ein durchgängiger Markenerlebnis-Loop:  
            Menschen entdecken dich online, erleben dich offline – und teilen es wieder online.
          </p>
        </div>

        {/* Punkt 6 */}
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">
            6) Transparente Zusammenarbeit & echte Ergebnisse
          </h3>
          <p>
            Wir sind 24/7 erreichbar, kommunizieren ehrlich und liefern Ergebnisse, keine Ausreden.
            Du bekommst monatliche Reports, klare KPIs und greifbare Fortschritte.
          </p>
          <p className="mt-3">
            Wir arbeiten diskret, effizient und partnerschaftlich – mit Fokus auf Wachstum, Vertrauen und Beständigkeit.
            Unser Ziel ist nicht die einmalige Kampagne, sondern deine dauerhafte digitale Stärke.
          </p>
        </div>
      </section>

      <div className="mt-16 flex justify-center">
        <button
          onClick={goContact}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 hover:bg-white hover:text-black transition"
        >
          Jetzt unverbindlich anfragen <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}


/* ---------- HILFSKOMPONENTEN ---------- */
function Field({
  name,
  icon,
  placeholder,
  type = "text",
  required = false,
}: {
  name: string;
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
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
      <div
        className="absolute -z-10 inset-x-0 top-1/3 h-64 blur-3xl opacity-50"
        aria-hidden
      >
        <div className="mx-auto max-w-5xl h-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-full" />
      </div>
    </>
  );
}
