"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import TransitionLink from "@/components/TransitionLink";
import { team } from "@/lib/data";
import { useLanguage, localize } from "@/lib/i18n/LanguageContext";

export default function Team() {
  const { t, lang } = useLanguage();
  return (
    <section className="relative w-full overflow-hidden py-24 bg-[var(--ink)]" id="team">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 flex max-w-2xl flex-col items-center px-6 text-center lg:px-0">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-[var(--ink)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
              <path d="M8 15H7a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
            </svg>
          </div>

          <h2 className="relative mb-4 font-medium text-4xl tracking-tight sm:text-5xl text-[var(--text-on-ink)]" style={{ fontFamily: "var(--font-display)" }}>
            {t("team.heading")}
          </h2>
          <p className="max-w-xl text-[var(--text-on-ink-mute)]">{t("team.sub")}</p>
        </div>

        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-[var(--ink)] to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-[var(--ink)] to-transparent" />

          <Marquee className="[--gap:1.5rem]" pauseOnHover repeat={3}>
            {team.map((member) => (
              <TransitionLink
                href={`/team/${member.slug}`}
                className="group flex w-64 shrink-0 flex-col"
                key={member.name}
                data-cursor="View"
              >
                <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-[var(--ink-card)] border border-[var(--line)]">
                  <Image
                    alt={`Portrait of ${member.name}`}
                    className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                    fill
                    sizes="256px"
                    src={member.image}
                  />
                  <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/85 via-black/30 to-transparent">
                    <h3 className="font-semibold text-[var(--text-on-ink)]">{member.name}</h3>
                    <p className="text-sm text-[var(--text-on-ink-mute)]">{localize(member.role, lang)}</p>
                  </div>
                </div>
              </TransitionLink>
            ))}
          </Marquee>
        </div>

        <div className="mx-auto mt-20 max-w-3xl px-6 text-center lg:px-0">
          <p
            className="mb-8 font-medium text-lg leading-relaxed md:text-xl text-[var(--text-on-ink)]"
            style={{ fontFamily: "var(--font-editorial)" }}
          >
            {t("team.quote")}
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full">
              <Image alt={team[0].name} className="h-full w-full object-cover" fill sizes="56px" src={team[0].image} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-[var(--text-on-ink)]">{team[0].name}</p>
              <p className="text-sm text-[var(--text-on-ink-mute)]">{localize(team[0].role, lang)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
