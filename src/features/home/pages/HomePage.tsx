import { Link } from '@tanstack/react-router'
import { LazyMotion, m, MotionConfig, useReducedMotion } from 'motion/react'

import { TechnologyIcon } from '../components/TechnologyIcon'

import type { Variants } from 'motion/react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const technologies = [
  { name: 'React 19', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'TanStack', icon: 'tanstack' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'Motion', icon: 'motion' },
] as const

const loadMotionFeatures = () =>
  import('../lib/motion-features').then(({ default: features }) => features)

export function HomePage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
        <main className="relative isolate min-h-screen overflow-hidden bg-[#f8fafc] text-slate-950 selection:bg-blue-200 selection:text-slate-950">
          <div aria-hidden="true" className="absolute inset-0 -z-20">
            <m.div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(15, 23, 42, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.055) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage:
                  'radial-gradient(ellipse 78% 68% at 50% 43%, black 28%, transparent 82%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 78% 68% at 50% 43%, black 28%, transparent 82%)',
              }}
              animate={
                shouldReduceMotion
                  ? { backgroundPosition: '0px 0px' }
                  : { backgroundPosition: ['0px 0px', '40px 40px'] }
              }
              transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
            />

            <div className="absolute top-[38%] left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/70 shadow-[0_0_28px_8px_rgba(6,182,212,0.32)]" />
            <m.div
              className="absolute top-[38%] left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-600/10 sm:h-64 sm:w-64"
              animate={
                shouldReduceMotion
                  ? { opacity: 0.5 }
                  : { scale: [1, 1.16], opacity: [0.55, 0] }
              }
              transition={{ duration: 3.8, ease: 'easeOut', repeat: Infinity }}
            />
            <m.div
              className="absolute top-[38%] left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-900/8 sm:h-96 sm:w-96"
              animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
              transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
            >
              <span className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white bg-blue-500 shadow-[0_0_16px_rgba(6,182,212,0.6)]" />
            </m.div>
          </div>

          <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-10">
            <m.a
              href="/"
              className="flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/aif-logo.png"
                alt=""
                width={48}
                height={26}
                className="h-5 w-auto object-contain drop-shadow-sm"
              />
              <span className="text-xs tracking-[0.16em] text-slate-900 uppercase">
                Adapt - Innovate - Forward
              </span>
            </m.a>

            <m.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to="/login"
                className="group inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition hover:border-slate-300 hover:bg-white hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Sign in
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </m.div>
          </header>

          <m.section
            className="mx-auto flex min-h-[calc(100vh-168px)] w-full max-w-6xl flex-col items-center justify-center px-5 pt-10 pb-20 text-center sm:px-8 sm:pt-14 lg:px-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <m.div
              variants={itemVariants}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3.5 py-2 text-xs font-semibold tracking-wide text-slate-700 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              FRONT-END STARTER · READY TO BUILD
            </m.div>

            <m.h1
              variants={itemVariants}
              className="max-w-5xl text-5xl leading-[0.98] font-bold tracking-[-0.055em] text-balance text-slate-950 sm:text-xl md:text-2xl lg:text-5xl"
            >
              Build better products,
              <span>
                without the setup noise.
              </span>
            </m.h1>

            <m.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-base leading-8 text-pretty text-slate-600 sm:text-lg"
            >
              A production-ready front-end foundation—well structured, easy to
              scale, and designed to help your team ship faster.
            </m.p>

            <m.div
              variants={itemVariants}
              className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            >
              <m.div
                className="w-full sm:w-auto"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/dashboard"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(15,23,42,0.24)] transition-colors hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-4 focus-visible:outline-none sm:w-auto"
                >
                  Get started
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  >
                    <path
                      d="M4 10h12m-5-5 5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </m.div>

              <m.div
                className="w-full sm:w-auto"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/login"
                  className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white/75 px-6 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 focus-visible:outline-none sm:w-auto"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4.5 w-4.5"
                  >
                    <path
                      d="M8 4H4.75A1.75 1.75 0 0 0 3 5.75v8.5C3 15.22 3.78 16 4.75 16H8m3-3.5L13.5 10 11 7.5M6.5 10h7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Explore sign in
                </Link>
              </m.div>
            </m.div>

            <m.div variants={itemVariants} className="mt-14 w-full max-w-3xl">
              <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                Powered by modern tools
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {technologies.map((technology) => (
                  <m.span
                    key={technology.name}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200/80 bg-white/65 px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm backdrop-blur-sm"
                    whileHover={{
                      y: -2,
                      color: '#0f172a',
                      borderColor: '#0f172a',
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-5 w-5 place-items-center"
                    >
                      <TechnologyIcon name={technology.icon} />
                    </span>
                    {technology.name}
                  </m.span>
                ))}
              </div>
            </m.div>
          </m.section>

          <m.div
            aria-hidden="true"
            className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-400 sm:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase">
              Explore
            </span>
            <m.span
              className="h-6 w-px bg-linear-to-b from-slate-400 to-transparent"
              animate={
                shouldReduceMotion
                  ? { opacity: 0.6 }
                  : { scaleY: [0.35, 1, 0.35] }
              }
              transition={{
                duration: 1.8,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
          </m.div>
        </main>
      </LazyMotion>
    </MotionConfig>
  )
}
