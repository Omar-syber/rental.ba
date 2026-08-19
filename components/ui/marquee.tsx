import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: unknown;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        // Named group ("marquee") so pauseOnHover below only ever reacts to
        // *this* wrapper's hover state — an unnamed .group here would also
        // catch :hover bubbling up from any group-scoped element nested
        // inside (e.g. each card's own hover-reveal), since Tailwind's
        // unnamed group-hover matches ANY hovered .group ancestor, not just
        // the nearest one.
        "group/marquee flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
              pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
              reverse && "[animation-direction:reverse]"
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
