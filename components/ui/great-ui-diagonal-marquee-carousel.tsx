"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { cn } from "@/lib/utils";
import TransitionLink from "@/components/TransitionLink";
import { useLanguage } from "@/lib/i18n/LanguageContext";

gsap.registerPlugin(Flip);

export interface CardItem {
  id: string | number;
  url: string;
  title: string;
  description?: string;
  href?: string;
}

export interface DiagonalMarqueeCarouselProps {
  cards?: CardItem[];
  angle?: number;
  baseSpeed?: number;
  alternateDirections?: boolean;
  className?: string;
  cardClassName?: string;
  fadeClassName?: string;
}

const DEFAULT_CARDS: CardItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
    title: "Ridgeline House",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    title: "Ashcombe Ridge",
  },
];

function Card({
  card,
  className,
  onOpen,
}: {
  card: CardItem;
  className?: string;
  onOpen: (card: CardItem, el: HTMLDivElement) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onClick={() => ref.current && onOpen(card, ref.current)}
      className={cn(
        "group relative h-[420px] w-[560px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.03]",
        className
      )}
    >
      <img src={card.url} alt={card.title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/35 transition-opacity duration-500 group-hover:bg-black/10" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6">
        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">Rental.ba</span>
        <span className="mt-1 block text-xl font-semibold text-white">{card.title}</span>
      </div>
    </div>
  );
}

function MarqueeRow({
  cards,
  speed,
  direction,
  cardClassName,
  onOpen,
}: {
  cards: CardItem[];
  speed: number;
  direction: 1 | -1;
  cardClassName?: string;
  onOpen: (card: CardItem, el: HTMLDivElement) => void;
}) {
  const animationClass = direction === -1 ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="flex w-full overflow-hidden">
      <div
        className={cn(
          "flex shrink-0 cursor-pointer hover:[animation-play-state:paused] [.is-frozen_&]:![animation-play-state:paused]",
          animationClass
        )}
        style={{ "--speed": `${speed}s` } as CSSProperties}
      >
        <div className="flex shrink-0">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}`} className="shrink-0 pr-10">
              <Card card={card} className={cardClassName} onOpen={onOpen} />
            </div>
          ))}
        </div>
        <div className="flex shrink-0">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}-copy`} className="shrink-0 pr-10">
              <Card card={card} className={cardClassName} onOpen={onOpen} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DiagonalMarqueeCarousel({
  cards = DEFAULT_CARDS,
  angle = -18,
  baseSpeed = 90,
  alternateDirections = true,
  className = "",
  cardClassName = "",
  fadeClassName = "",
}: DiagonalMarqueeCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const [expanded, setExpanded] = useState<CardItem | null>(null);
  const { t } = useLanguage();

  const rotationStyle = { transform: `rotate(${angle}deg)` };
  const rowCards = [...cards, ...cards, ...cards];
  const rowCardsReverse = [...rowCards].reverse();

  const openCard = (card: CardItem, el: HTMLDivElement) => {
    flipStateRef.current = Flip.getState(el, { props: "borderRadius" });
    containerRef.current?.classList.add("is-frozen");
    document.body.style.overflow = "hidden";
    setExpanded(card);
  };

  const closeCard = () => {
    if (!overlayRef.current || !backdropRef.current) {
      setExpanded(null);
      return;
    }
    gsap.to(overlayRef.current, { scale: 0.85, opacity: 0, duration: 0.35, ease: "power2.in" });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.35,
      onComplete: () => {
        containerRef.current?.classList.remove("is-frozen");
        document.body.style.overflow = "";
        setExpanded(null);
      },
    });
  };

  useLayoutEffect(() => {
    if (!expanded || !overlayRef.current || !flipStateRef.current) return;
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.to(backdropRef.current, { opacity: 1, duration: 0.4 });
    Flip.from(flipStateRef.current, {
      targets: overlayRef.current,
      duration: 0.75,
      ease: "power3.inOut",
      absolute: true,
      scale: true,
      onComplete: () => {
        flipStateRef.current = null;
      },
    });
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCard();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className={cn("relative flex h-screen w-full items-center justify-center overflow-hidden", className)}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          animation: marquee-left var(--speed) linear infinite;
          ${reduceMotion ? "animation-play-state: paused;" : ""}
        }
        .animate-marquee-right {
          animation: marquee-right var(--speed) linear infinite;
          ${reduceMotion ? "animation-play-state: paused;" : ""}
        }
      `,
        }}
      />

      <div ref={containerRef} className="absolute z-0 flex w-[200vw] flex-col gap-10" style={rotationStyle}>
        <MarqueeRow cards={rowCards} speed={baseSpeed} direction={-1} cardClassName={cardClassName} onOpen={openCard} />
        <MarqueeRow
          cards={rowCardsReverse}
          speed={baseSpeed - 15 > 20 ? baseSpeed - 15 : 30}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
          onOpen={openCard}
        />
        <MarqueeRow cards={rowCards} speed={baseSpeed + 15} direction={-1} cardClassName={cardClassName} onOpen={openCard} />
        <MarqueeRow
          cards={rowCardsReverse}
          speed={baseSpeed - 6 > 20 ? baseSpeed - 6 : 35}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
          onOpen={openCard}
        />
        <MarqueeRow cards={rowCards} speed={baseSpeed + 24} direction={-1} cardClassName={cardClassName} onOpen={openCard} />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-[var(--ink-soft)] to-transparent",
          fadeClassName
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 bg-gradient-to-t from-[var(--ink-soft)] to-transparent",
          fadeClassName
        )}
      />

      {expanded && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={closeCard}
          aria-hidden="true"
        />
      )}
      {expanded && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={expanded.title}
          className="fixed left-1/2 top-1/2 z-50 flex h-[min(480px,80vh)] w-[min(920px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[var(--ink-card)] shadow-2xl max-sm:flex-col max-sm:h-[min(640px,88vh)]"
        >
          <div className="relative h-full w-3/5 shrink-0 max-sm:h-1/2 max-sm:w-full">
            <img src={expanded.url} alt={expanded.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex w-2/5 flex-col justify-center gap-4 p-8 max-sm:w-full">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)]">Rental.ba</span>
            <h3 className="text-2xl font-semibold text-[var(--text-on-ink)]">{expanded.title}</h3>
            <p className="text-sm leading-relaxed text-[var(--text-on-ink-mute)]">
              {expanded.description || t("carousel.defaultDescription")}
            </p>
            <div className="mt-2 flex items-center gap-3">
              {expanded.href && (
                <TransitionLink
                  href={expanded.href}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--ink)] transition-transform hover:scale-[1.03]"
                >
                  {t("carousel.viewNeighborhood")}
                </TransitionLink>
              )}
              <button
                onClick={closeCard}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-transparent px-4 py-2 text-xs uppercase tracking-wide text-[var(--text-on-ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {t("carousel.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
