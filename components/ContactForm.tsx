"use client";

import { useState } from "react";

// Web3Forms access key. Get a free key at https://web3forms.com (enter Kathy's
// email, they email you a key). It is safe to expose this key publicly.
const ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "New message from the Pain & Wellness website",
          from_name: "Pain & Wellness Website",
          ...data,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    color: "var(--ink)",
    background: "var(--cream)",
    border: "1px solid var(--cream-edge)",
    borderRadius: 10,
    padding: "0.85rem 1rem",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "0.8125rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "var(--teal-deep)",
    marginBottom: "0.4rem",
    display: "block",
  };

  if (status === "success") {
    return (
      <div
        style={{
          background: "var(--cream)",
          border: "1px solid var(--cream-edge)",
          borderRadius: 16,
          padding: "2.5rem 2rem",
          textAlign: "center",
        }}
      >
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--deep-forest)", marginBottom: "0.5rem" }}>
          Thank you, your message is on its way.
        </p>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-soft)", lineHeight: 1.7 }}>
          Kathy will get back to you soon. For anything urgent, call 613-885-1311.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "var(--cream)",
        border: "1px solid var(--cream-edge)",
        borderRadius: 16,
        padding: "clamp(1.5rem, 3vw, 2.25rem)",
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem",
        boxShadow: "0 10px 28px -14px oklch(20% 0.01 240 / 0.18)",
      }}
    >
      {/* Honeypot for spam bots */}
      <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div>
        <label style={labelStyle} htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" type="text" required style={fieldStyle} placeholder="Your name" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }} className="cf-row">
        <div>
          <label style={labelStyle} htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required style={fieldStyle} placeholder="you@email.com" />
        </div>
        <div>
          <label style={labelStyle} htmlFor="cf-phone">Phone (optional)</label>
          <input id="cf-phone" name="phone" type="tel" style={fieldStyle} placeholder="613-000-0000" />
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" required rows={5} style={{ ...fieldStyle, resize: "vertical" }} placeholder="How can Kathy help you or your animals?" />
      </div>

      {status === "error" && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "oklch(55% 0.18 25)" }}>
          Something went wrong sending your message. Please try again, or call 613-885-1311.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--cream)",
          background: status === "sending" ? "var(--teal-light)" : "var(--teal)",
          padding: "1rem 2rem",
          borderRadius: 10,
          border: "none",
          cursor: status === "sending" ? "default" : "pointer",
          letterSpacing: "0.01em",
          boxShadow: "0 6px 16px oklch(20% 0.01 240 / 0.2)",
          transition: "background 0.2s, transform 0.2s",
          marginTop: "0.25rem",
        }}
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      <style>{`
        @media (max-width: 560px) {
          .cf-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
