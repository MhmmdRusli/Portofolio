"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  /** Daftar kata/kalimat yang diketik bergantian. Pakai array yang stabil (konstanta di luar komponen). */
  words: readonly string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  /** Jeda (ms) setelah kata selesai diketik sebelum mulai dihapus. */
  holdMs?: number;
  className?: string;
}

export default function TypingText({
  words,
  typeSpeed = 70,
  deleteSpeed = 40,
  holdMs = 1600,
  className = "",
}: TypingTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Reduced motion: tampilkan kata pertama saja, tanpa animasi.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setText(words[0]), 0);
      return () => clearTimeout(id);
    }

    const full = words[wordIndex];
    let delay = deleting ? deleteSpeed : typeSpeed;
    if (!deleting && text === full) delay = holdMs;
    if (deleting && text === "") delay = 350;

    const id = setTimeout(() => {
      if (!deleting && text === full) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(id);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, holdMs]);

  return (
    <p className={`min-h-[1.6em] ${className}`}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] animate-[blink_1s_infinite] bg-current" />
      </span>
    </p>
  );
}