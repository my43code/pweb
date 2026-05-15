"use client";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setDone(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    setDone(res.ok ? "Message sent successfully." : "Failed. Try again.");
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <input name="name" required placeholder="Full Name" className="w-full border p-3 rounded" />
        <input name="email" required type="email" placeholder="Email" className="w-full border p-3 rounded" />
        <input name="phone" placeholder="Phone / WhatsApp" className="w-full border p-3 rounded" />
        <select name="service" required className="w-full border p-3 rounded">
          <option value="">Select a service</option>
          <option>Graphic Design</option>
          <option>Logo Design</option>
          <option>CV / Resume Design</option>
          <option>Ticketing & Printing Layout</option>
          <option>Hardware Services</option>
          <option>Web Development (Full Stack)</option>
          <option>Other</option>
        </select>
        <textarea name="message" required placeholder="Message / Project details" className="w-full border p-3 rounded" rows={5} />
        <button disabled={loading} className="bg-black text-white px-5 py-3 rounded">
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {done && <p className="mt-4">{done}</p>}
    </section>
  );
}