"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, CheckCircle2, Clock } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.5, ease: "easeOut" as any },
  },
};

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate network delay for frontend-only form
    setTimeout(() => {
      setStatus("success");
      // Reset form after a few seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="mx-auto flex max-w-5xl flex-col gap-12 lg:flex-row lg:gap-16"
      >
        {/* ── Left Info Column ── */}
        <div className="flex w-full flex-col lg:w-5/12">
          <motion.span variants={itemVariants} className="mb-4 font-mono text-sm font-semibold tracking-widest text-[var(--color-accent)]">
            CONTACT ME
          </motion.span>
          <motion.h2 variants={itemVariants} className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Let&apos;s Work Together
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-10 text-lg text-[var(--color-text-muted)]">
            I&apos;m currently available for new projects and collaborations. If you have an idea in mind, feel free to reach out.
          </motion.p>

          <div className="flex flex-col gap-6">
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] border border-white/5 text-[var(--color-accent)]">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-secondary)]">Email</h4>
                <p className="text-white font-medium">mhmmdrusliii77@gmail.com</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] border border-white/5 text-[var(--color-accent)]">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-secondary)]">Location</h4>
                <p className="text-white font-medium">Bogor, Indonesia</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] border border-white/5 text-[var(--color-accent)]">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-text-secondary)]">Availability</h4>
                <p className="text-white font-medium">Available for selected projects</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Right Form Column ── */}
        <motion.div variants={itemVariants} className="w-full lg:w-7/12">
          <div className="card p-6 sm:p-8 relative overflow-hidden">
            {/* Success Overlay */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[var(--color-bg-card)] backdrop-blur-md"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  transition={{ type: "spring", bounce: 0.5 } as any}
                  className="mb-4 text-green-400"
                >
                  <CheckCircle2 size={64} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="mt-2 text-[var(--color-text-muted)]">I&apos;ll get back to you soon.</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-0">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--color-text-secondary)]">Name</label>
                  <input
                    id="name"
                    required
                    type="text"
                    placeholder="John Doe"
                    className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-[var(--color-text-muted)] transition-colors focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--color-text-secondary)]">Email</label>
                  <input
                    id="email"
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-[var(--color-text-muted)] transition-colors focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-[var(--color-text-secondary)]">Subject</label>
                <input
                  id="subject"
                  required
                  type="text"
                  placeholder="Project Inquiry"
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-[var(--color-text-muted)] transition-colors focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-[var(--color-text-secondary)]">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-[var(--color-text-muted)] transition-colors focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl bg-[var(--color-accent)] px-6 font-medium text-white transition-all hover:bg-[var(--color-accent-hover)] active:scale-95 disabled:opacity-70 disabled:active:scale-100"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
