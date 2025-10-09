import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ServiceDetails() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const services = [
    {
      title: "🌐 Website erstellen",
      content: `Wir entwickeln maßgeschneiderte Websites, die perfekt zu Ihrem gastronomischen Betrieb passen – 
modern, mobiloptimiert und auf Umsatzsteigerung ausgelegt. 
Von der digitalen Speisekarte bis zur Online-Reservierung: alles auf Ihre Marke abgestimmt.`,
    },
    {
      title: "📸 Professionelle Fotos",
      content: `Unser Fotografenteam fängt das Ambiente, die Speisen und die Menschen Ihres Betriebs authentisch ein. 
Für Social Media, Website oder Print – jedes Foto stärkt Ihr Markenimage und zieht neue Gäste an.`,
    },
    {
      title: "📱 Social-Media-Präsenz",
      content: `Wir übernehmen den kompletten Aufbau und die Betreuung Ihrer Social-Media-Kanäle – 
inklusive Contentplanung, Postings und Interaktion. 
Ziel: Reichweite, Wiedererkennung und echte Community-Bindung.`,
    },
    {
      title: "📊 Marketing & Ads",
      content: `Wir kombinieren gezieltes Online-Marketing mit lokaler Reichweite. 
Von Meta Ads und Google-Kampagnen bis zu Stadtplakaten und QR-Aktionen – 
Sie werden sichtbar, wo Ihre Gäste wirklich sind.`,
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 mt-32 mb-20 space-y-6 text-white/80">
      {services.map((service, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300"
          >
            {/* Header */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-medium hover:bg-white/10 transition"
            >
              <span>{service.title}</span>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 opacity-80" />
              ) : (
                <ChevronDown className="h-5 w-5 opacity-80" />
              )}
            </button>

            {/* Expanded Content */}
            <div
              className={`px-5 pb-4 text-sm text-white/70 transition-all duration-300 ${
                isOpen
                  ? "max-h-[500px] opacity-100 mt-1"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {service.content}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}