import { motion } from "framer-motion";

export default function ServiceDetails() {
  return (
    <section className="max-w-5xl mx-auto px-4 mt-32 mb-20 space-y-24 text-white/80">
      {/* WEBSITE */}
      <div id="websites" className="scroll-mt-32">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-4"
        >
          🌐 Website erstellen
        </motion.h3>
        <p>
          Wir entwickeln maßgeschneiderte Websites, die perfekt zu Ihrem gastronomischen Betrieb passen – modern,
          mobiloptimiert und auf Umsatzsteigerung ausgelegt. Von der digitalen Speisekarte bis zur Online-Reservierung:
          alles auf Ihre Marke abgestimmt.
        </p>
      </div>

      {/* FOTOS */}
      <div id="fotos" className="scroll-mt-32">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-4"
        >
          📸 Professionelle Fotos
        </motion.h3>
        <p>
          Unser Fotografenteam fängt das Ambiente, die Speisen und die Menschen Ihres Betriebs authentisch ein. 
          Für Social Media, Website oder Print – jedes Foto stärkt Ihr Markenimage und zieht neue Gäste an.
        </p>
      </div>

      {/* SOCIAL MEDIA */}
      <div id="socialmedia" className="scroll-mt-32">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-4"
        >
          📱 Social-Media-Präsenz
        </motion.h3>
        <p>
          Wir übernehmen den kompletten Aufbau und die Betreuung Ihrer Social-Media-Kanäle – inklusive Contentplanung,
          Postings und Interaktion. Ziel: Reichweite, Wiedererkennung und echte Community-Bindung.
        </p>
      </div>

      {/* MARKETING */}
      <div id="marketing" className="scroll-mt-32">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-4"
        >
          📊 Marketing & Ads
        </motion.h3>
        <p>
          Wir kombinieren gezieltes Online-Marketing mit lokaler Reichweite. 
          Von Meta Ads und Google-Kampagnen bis zu Stadtplakaten und QR-Aktionen – 
          Sie werden sichtbar, wo Ihre Gäste wirklich sind.
        </p>
      </div>
    </section>
  );
}
