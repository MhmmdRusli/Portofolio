"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  CircleUser,
  ImagePlus,
  Mail,
  MessageCircle,
  MessageSquare,
  Send,
  User,
} from "lucide-react";

import { GithubIcon, InstagramIcon, LinkedinIcon } from "./icons";

/* ═══════════════ ANIMASI SCROLL REVEAL ═══════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const VIEWPORT = { once: true, margin: "-100px" } as const;

const OFFSET = {
  bottom: { x: 0, y: 32 },
  left: { x: -44, y: 20 },
  right: { x: 44, y: 20 },
} as const;

type RevealFrom = keyof typeof OFFSET;

const revealItem = (from: RevealFrom) => ({
  hidden: { opacity: 0, ...OFFSET[from], scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
});

const fromBottom = revealItem("bottom");
const fromLeft = revealItem("left");
const fromRight = revealItem("right");

/** Container yang mem staggering anak-anaknya secara berurutan. */
const stagger = (step: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: step } },
});

/* ═══════════════ DATA ═══════════════ */

const SOCIALS = [
  {
    title: "Let's Connect",
    subtitle: "on LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-rusli-0389b4404/",
    Icon: LinkedinIcon,
    tile: "bg-[#0a66c2]",
  },
  {
    title: "Instagram",
    subtitle: "@_rsliilsr",
    href: "https://instagram.com/_rsliilsr",
    Icon: InstagramIcon,
    tile: "bg-[linear-gradient(45deg,#f9a825,#ee2a7b,#6228d7)]",
  },
  {
    title: "Github",
    subtitle: "@MhmmdRusli",
    href: "https://github.com/MhmmdRusli",
    Icon: GithubIcon,
    tile: "bg-[#0d0f16]",
  },
];

interface CommentItem {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar?: string;
}

// Komentar awal (contoh) — ganti atau kosongkan sesuai kebutuhan.
const INITIAL_COMMENTS: CommentItem[] = [
  { id: 1, name: "Alex", message: "Amazing portfolio! The design is super clean and the animations feel very smooth.", time: "2d ago" },
  { id: 2, name: "Jordan", message: "Really love the space aesthetic you went with here.", time: "1w ago" },
  { id: 3, name: "Sam", message: "Incredible attention to detail. Great frontend polish.", time: "2w ago" },
];

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

/* ═══════════════ STYLE ═══════════════ */

const CARD =
  "rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-[#131729] to-[#0a0d19] p-[35px]";
const LEFT_FIELD =
  "w-full rounded-2xl border border-white/[0.08] bg-[#1e212e] text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#3c66e5]/70";
const RIGHT_FIELD =
  "w-full rounded-xl border border-white/[0.08] bg-[#1b1e2b] px-[11px] text-base text-white outline-none transition-colors placeholder:text-white/45 focus:border-[#3c66e5]/70";

/* ═══════════════ SECTION ═══════════════ */

export default function ContactSection() {
  /* ── Form Hubungi (simulasi, tanpa backend) ── */
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "sent">("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const submitContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendStatus !== "idle") return;
    setSendStatus("sending");
    timers.current.push(
      setTimeout(() => {
        setSendStatus("sent");
        setContact({ name: "", email: "", message: "" });
        timers.current.push(setTimeout(() => setSendStatus("idle"), 4000));
      }, 1200),
    );
  };

  /* ── Komentar (disimpan di memori browser saja) ── */
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [cName, setCName] = useState("");
  const [cMessage, setCMessage] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const pickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("File harus berupa gambar.");
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError("Ukuran file melebihi 5MB.");
      return;
    }
    setPhotoError("");
    if (photo) URL.revokeObjectURL(photo);
    setPhoto(URL.createObjectURL(file));
  };

  const submitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cName.trim() || !cMessage.trim()) return;
    setComments((prev) => [
      {
        id: Date.now(),
        name: cName.trim(),
        message: cMessage.trim(),
        time: "Just now",
        avatar: photo ?? undefined,
      },
      ...prev,
    ]);
    setCName("");
    setCMessage("");
    setPhoto(null); // URL tetap dipakai oleh komentar yang baru dibuat
    setPhotoError("");
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={fromBottom}
        className="text-center text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-none tracking-tight text-[#eef0ff]"
      >
        Hubungi Saya
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={stagger(0.14)}
        className="mt-10 grid grid-cols-1 gap-[42px] lg:mt-12 lg:grid-cols-[434fr_530fr]"
      >
        {/* ═════════ Kartu kiri: Hubungi ═════════ */}
        <motion.div variants={fromLeft} className={CARD}>
          <h3 className="text-[27px] font-bold leading-tight text-[#3c66e5]">Hubungi</h3>
          <p className="mt-3 text-[15px] leading-[1.4] text-white/75">
            Punya ide atau pertanyaan? Kirim pesan ke saya, nanti saya balas secepatnya.
          </p>

          <form onSubmit={submitContact} className="mt-7 flex flex-col gap-[21px]">
            <div className="relative">
              <label htmlFor="contact-name" className="sr-only">Nama Anda</label>
              <User size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/55" />
              <input
                id="contact-name"
                required
                type="text"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                placeholder="Nama Anda"
                className={`${LEFT_FIELD} h-[50px] pl-[42px] pr-4`}
              />
            </div>

            <div className="relative">
              <label htmlFor="contact-email" className="sr-only">Email Anda</label>
              <Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/55" />
              <input
                id="contact-email"
                required
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                placeholder="Email Anda"
                className={`${LEFT_FIELD} h-[50px] pl-[42px] pr-4`}
              />
            </div>

            <div className="relative">
              <label htmlFor="contact-message" className="sr-only">Pesan Anda</label>
              <MessageSquare size={17} className="pointer-events-none absolute left-4 top-[17px] text-white/55" />
              <textarea
                id="contact-message"
                required
                value={contact.message}
                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                placeholder="Pesan Anda"
                className={`${LEFT_FIELD} h-[138px] resize-none py-[14px] pl-[42px] pr-4`}
              />
            </div>

            <button
              type="submit"
              disabled={sendStatus !== "idle"}
              className="mt-[5px] flex h-[49px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#3c66e5] text-base font-bold text-white transition-colors hover:bg-[#4a73ee] disabled:opacity-80"
            >
              <Send size={18} strokeWidth={1.8} />
              {sendStatus === "sending" ? "Mengirim..." : sendStatus === "sent" ? "Pesan terkirim" : "Kirim Pesan"}
            </button>
          </form>

          <div className="mt-[35px] border-t border-white/[0.06] pt-[30px]">
            <h4 className="text-lg font-extrabold uppercase tracking-wide text-white">Find Me</h4>
            <ul className="mt-[30px] flex flex-col gap-[14px]">
              {SOCIALS.map(({ title, subtitle, href, Icon, tile }) => (
                <li key={title}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-16 items-center gap-3.5 rounded-[14px] border border-white/[0.08] bg-[#1a1d28] px-3.5 transition-colors hover:border-white/20"
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white ${tile}`}>
                      <Icon size={22} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-bold leading-tight text-white">{title}</span>
                      <span className="block text-[13px] leading-tight text-white/70">{subtitle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ═════════ Kartu kanan: Komentar ═════════ */}
        <motion.div variants={fromRight} className={CARD}>
          <div className="flex items-center gap-4 border-b border-white/[0.07] pb-[22px]">
            <span className="flex h-[35px] w-[35px] items-center justify-center rounded-xl border border-white/[0.08] bg-[#1b1e2b]">
              <MessageCircle size={18} className="text-white" />
            </span>
            <h3 className="text-xl font-bold text-white">
              Komentar <span className="text-white/55">({comments.length})</span>
            </h3>
          </div>

          <form onSubmit={submitComment} className="mt-[26px] flex flex-col gap-[22px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="comment-name" className="text-[15px] text-white">Nama</label>
              <input
                id="comment-name"
                required
                type="text"
                value={cName}
                onChange={(e) => setCName(e.target.value)}
                placeholder="Masukkan nama kamu"
                className={`${RIGHT_FIELD} h-[43px]`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="comment-message" className="text-[15px] text-white">Komentar</label>
              <textarea
                id="comment-message"
                required
                value={cMessage}
                onChange={(e) => setCMessage(e.target.value)}
                placeholder="Tulis komentar kamu di sini..."
                className={`${RIGHT_FIELD} h-[104px] resize-none py-[13px] pl-[14px]`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[15px] text-white">
                Foto Profil <span className="text-white/60">(opsional)</span>
              </span>
              <input ref={fileRef} type="file" accept="image/*" onChange={pickPhoto} className="hidden" />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex h-[43px] w-full items-center justify-center gap-2.5 rounded-xl border border-dashed border-white/[0.18] bg-[#161924] text-base text-white transition-colors hover:bg-[#1b1e2b]"
              >
                {photo ? (
                  <span className="relative h-7 w-7 overflow-hidden rounded-full">
                    <Image src={photo} alt="" fill unoptimized sizes="28px" className="object-cover" />
                  </span>
                ) : (
                  <ImagePlus size={18} strokeWidth={1.6} />
                )}
                {photo ? "Ganti Foto" : "Choose Profile Photo"}
              </button>
              <p className={`text-center text-sm ${photoError ? "text-red-400" : "text-white/70"}`}>
                {photoError || "Max file size: 5MB"}
              </p>
            </div>

            <button
              type="submit"
              className="flex h-[42px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#3c66e5] text-base font-medium text-white transition-colors hover:bg-[#4a73ee]"
            >
              <Send size={17} strokeWidth={1.8} />
              Kirim Komentar
            </button>
          </form>

          {/* Daftar komentar */}
          <ul
            className="mt-[38px] max-h-[290px] overflow-y-auto [mask-image:linear-gradient(to_bottom,black_82%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {comments.map((c) => (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-3.5 border-b border-white/[0.06] px-2 py-5 last:border-b-0"
              >
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#1e212e] text-white/80">
                  {c.avatar ? (
                    <Image src={c.avatar} alt="" fill unoptimized sizes="32px" className="object-cover" />
                  ) : (
                    <CircleUser size={20} strokeWidth={1.6} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-base text-white">{c.name}</span>
                    <span className="shrink-0 text-[13px] text-white/55">{c.time}</span>
                  </div>
                  <p className="mt-1 break-words text-[15px] leading-snug text-white/75">{c.message}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}