"use client";
import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { columnTestimonials } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

export default function Testimonials() {
  const { t, lang } = useLanguage();
  const localized = columnTestimonials.map((item) => ({
    text: localize(item.text, lang),
    image: item.image,
    name: item.name,
    role: localize(item.role, lang),
  }));
  const firstColumn = localized.slice(0, 3);
  const secondColumn = localized.slice(3, 6);
  const thirdColumn = localized.slice(6, 9);

  return (
    <section className="bg-[var(--ink)] py-24 relative" id="testimonials">
      <div className="max-w-7xl z-10 mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center"
        >
          <div className="flex justify-center">
            <div className="border border-[var(--line)] py-1 px-4 rounded-lg text-[var(--text-on-ink-mute)] text-sm font-mono uppercase tracking-[0.08em]">
              {t("testimonialsSection.eyebrow")}
            </div>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mt-5 text-[var(--text-on-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("testimonialsSection.heading")}
          </h2>
          <p className="text-center mt-5 text-[var(--text-on-ink-mute)]">{t("testimonialsSection.sub")}</p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
