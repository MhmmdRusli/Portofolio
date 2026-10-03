"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, UserCircle2 } from "lucide-react";

interface Comment {
  id: number;
  name: string;
  message: string;
  date: string;
}

const INITIAL_COMMENTS: Comment[] = [
  { id: 1, name: "Alex", message: "Amazing portfolio! The design is super clean and the animations feel very smooth. Great work.", date: "2 days ago" },
  { id: 2, name: "Jordan", message: "Really love the space aesthetic you went with here. The colors and typography are spot on.", date: "1 week ago" },
  { id: 3, name: "Sam", message: "Incredible attention to detail. This is exactly the kind of frontend polish I look for.", date: "2 weeks ago" },
];

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: "Just now",
    };

    setComments([newComment, ...comments]);
    setName("");
    setMessage("");
  };

  return (
    <section className="py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transition={{ duration: 0.5, ease: "easeOut" as any }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-10 flex items-center gap-3">
          <MessageSquare className="text-[var(--color-accent)]" size={28} />
          <h2 className="text-3xl font-bold text-white">Guestbook</h2>
        </div>

        {/* ── Add Comment Form ── */}
        <div className="card mb-12 p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="comment-name" className="sr-only">Name</label>
              <input
                id="comment-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder-[var(--color-text-muted)] transition-colors focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="comment-message" className="sr-only">Message</label>
              <textarea
                id="comment-message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a message..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder-[var(--color-text-muted)] transition-colors focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[var(--color-accent-hover)] active:scale-95"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>

        {/* ── Comments List ── */}
        <div className="flex flex-col gap-6">
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="flex gap-4 overflow-hidden"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] border border-white/10 text-[var(--color-text-muted)]">
                  <UserCircle2 size={24} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col pt-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-bold text-white">{comment.name}</span>
                    <span className="text-xs font-medium text-[var(--color-text-muted)]">{comment.date}</span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)] leading-relaxed">{comment.message}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
