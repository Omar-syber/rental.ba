"use client";
import React from "react";
import { motion } from "motion/react";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-[var(--ink)]"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-10 rounded-3xl border border-[var(--line)] bg-[var(--ink-card)] shadow-[0_20px_50px_rgba(0,0,0,0.35)] max-w-xs w-full"
                  key={i}
                >
                  <div className="text-[var(--text-on-ink)] leading-relaxed">{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img width={40} height={40} src={image} alt={name} className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-[var(--text-on-ink)]">{name}</div>
                      <div className="leading-5 text-[var(--text-on-ink-mute)] tracking-tight text-sm">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
