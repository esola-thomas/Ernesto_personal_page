import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import {
  fadeUp,
  heroFacts,
  heroBlob,
  staggerContainer,
  buttonMotion,
  slideInFromRight
} from "../motion";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";

interface HeroData {
  name: string;
  title: string;
  tagline: string;
  statements: string[];
  ctas: { label: string; href: string }[];
}

interface Fact {
  label: string;
  value: string;
}

interface HeroMotionProps {
  hero: HeroData;
  quickFacts: Fact[];
}

const HeroMotion = memo(({ hero, quickFacts }: HeroMotionProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animationProps = useMemo(() => {
    if (prefersReducedMotion) {
      return { initial: undefined, animate: undefined };
    }

    return {
      initial: "hidden" as const,
      animate: "show" as const
    };
  }, [prefersReducedMotion]);

  return (
    <motion.section
      id="hero"
      className="relative overflow-hidden pb-28 pt-28"
      {...animationProps}
      variants={staggerContainer}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[var(--gradient-hero)]"
        variants={prefersReducedMotion ? undefined : heroBlob}
        initial="initial"
        animate="animate"
      />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[color:var(--surface-base)]" />

      <div className="container relative">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div className="space-y-10" variants={fadeUp}>
            <motion.span className="badge" variants={fadeUp}>
              {hero.title}
            </motion.span>
            <div className="space-y-6">
              <motion.h1
                className="font-display text-5xl font-semibold leading-tight text-primary md:text-6xl"
                variants={fadeUp}
              >
                {hero.name}
              </motion.h1>
              <motion.p
                className="max-w-2xl text-xl text-secondary"
                variants={fadeUp}
              >
                {hero.tagline}
              </motion.p>
            </div>
            <motion.ul className="space-y-4 text-base text-muted" variants={fadeUp}>
              {hero.statements.map((statement) => (
                <motion.li
                  key={statement}
                  className="flex items-start gap-3"
                  variants={fadeUp}
                >
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-[var(--color-highlight)]"
                  />
                  <span>{statement}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div className="flex flex-wrap items-center gap-4" variants={fadeUp}>
              {hero.ctas.map((cta, index) => (
                <motion.a
                  key={cta.href}
                  href={cta.href}
                  className={index === 0 ? "button-primary" : "button-ghost"}
                  variants={buttonMotion}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {cta.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.aside
            className="glass-panel relative grid gap-6 p-10"
            variants={slideInFromRight}
          >
            <motion.div
              aria-hidden
              className="absolute -top-4 left-10 hidden rounded-full border border-soft bg-overlay px-4 py-1 text-xs uppercase tracking-[0.4em] text-soft shadow-[var(--shadow-glass)] lg:inline-flex"
              variants={prefersReducedMotion ? undefined : fadeUp}
            >
              Creating with Passion
            </motion.div>
            <motion.div
              className="relative flex flex-col items-center gap-6 text-center"
              variants={fadeUp}
            >
              <motion.div
                className="relative h-48 w-48 overflow-hidden rounded-full border border-soft bg-overlay"
                variants={prefersReducedMotion ? undefined : heroBlob}
                initial="initial"
                animate="animate"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0" />
                <div className="absolute inset-4 rounded-full border border-dashed border-soft" />
                <div className="absolute inset-[18%] rounded-full border border-soft bg-overlay" />
                <span className="absolute inset-0 grid place-content-center text-sm uppercase tracking-[0.4em] text-soft">
                  Headshot
                </span>
              </motion.div>
              <p className="text-sm text-muted">
                Placeholder portrait—swap in your favorite photo to bring the story to life.
              </p>
            </motion.div>
            <motion.dl
              className="grid gap-3 text-sm text-left text-muted"
              variants={heroFacts}
            >
              {quickFacts.map((fact) => (
                <motion.div
                  key={fact.label}
                  className="flex items-center justify-between rounded-lg border border-soft bg-overlay px-4 py-3"
                  variants={fadeUp}
                >
                  <dt className="text-xs uppercase tracking-[0.35em] text-soft">{fact.label}</dt>
                  <dd className="text-right text-sm font-medium text-primary">{fact.value}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </motion.aside>
        </div>
      </div>

      <motion.div className="scroll-prompt" variants={fadeUp}>
        <span>Explore Profile</span>
        <svg
          aria-hidden="true"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 5v14" />
          <path d="m18 13-6 6-6-6" />
        </svg>
      </motion.div>
    </motion.section>
  );
});

HeroMotion.displayName = "HeroMotion";

export default HeroMotion;
