import type { CSSProperties } from "react";

const wrap: CSSProperties = { padding: "2rem 1.75rem 3rem", maxWidth: 640, fontFamily: "inherit", color: "#1a2326", lineHeight: 1.6 };
const h1: CSSProperties = { fontSize: "1.5rem", fontWeight: 600, margin: "0 0 0.35rem", color: "#1f4f55" };
const lead: CSSProperties = { fontSize: "1rem", margin: "0 0 2rem", color: "#4a5b5f" };
const card: CSSProperties = { border: "1px solid #dbe5e6", borderRadius: 12, padding: "1.1rem 1.25rem", marginBottom: "0.9rem", background: "#fff" };
const h2: CSSProperties = { fontSize: "1.0625rem", fontWeight: 600, margin: "0 0 0.3rem", color: "#1f4f55" };
const p: CSSProperties = { margin: 0, fontSize: "0.9375rem", color: "#2c3a3d" };
const note: CSSProperties = { marginTop: "1.5rem", padding: "1rem 1.25rem", borderRadius: 12, background: "#eaf3f3", color: "#1f4f55", fontSize: "0.9375rem" };

export function HowTo() {
  return (
    <div style={wrap}>
      <h1 style={h1}>How to edit your website</h1>
      <p style={lead}>Everything you can change is here. Nothing goes public until you press Publish.</p>

      <div style={card}>
        <h2 style={h2}>Change a photo or some words</h2>
        <p style={p}>
          Click <strong>Edit my website</strong> at the top. Click any photo, heading or sentence on your site. A box
          opens on the left. Change it, then press <strong>Publish to website</strong>.
        </p>
      </div>

      <div style={card}>
        <h2 style={h2}>Write a blog post</h2>
        <p style={p}>
          Click <strong>Blog posts</strong> on the left, then the <strong>+</strong> button at the top. Add a title, a
          photo and your writing. Press <strong>Publish to website</strong>. The web address, date and reading time fill
          in by themselves.
        </p>
      </div>

      <div style={card}>
        <h2 style={h2}>Change a button or a menu word</h2>
        <p style={p}>
          Open <strong>Buttons &amp; menu words</strong>. Every button, heading and menu link on the site is in there.
        </p>
      </div>

      <div style={card}>
        <h2 style={h2}>Change your phone, address, hours or logo</h2>
        <p style={p}>
          Open <strong>Phone, address, hours &amp; logo</strong>.
        </p>
      </div>

      <div style={note}>
        Changes show on your site about a minute after you press Publish. Stuck or something looks wrong? Ask Mehdi.
      </div>
    </div>
  );
}
