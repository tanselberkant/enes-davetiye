"use client";

import { useState } from "react";
import { getRsvpOptions } from "@/constants";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RsvpModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attendance, setAttendance] = useState("");
  const [errors, setErrors] = useState<{ name?: string; attendance?: string }>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const options = getRsvpOptions();

  if (!open) return null;

  const resetForm = () => {
    setName("");
    setEmail("");
    setAttendance("");
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const submit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    const nextErrors: { name?: string; attendance?: string } = {};
    if (!name.trim()) nextErrors.name = "Lütfen ad soyad giriniz.";
    if (!attendance) nextErrors.attendance = "Lütfen bir seçenek seçiniz.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    try {
      setSubmitting(true);
      const res = await fetch("/api/attendence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          attendance,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const apiErrors: { name?: string; attendance?: string } = {};
        if (data?.field && data?.message) {
          apiErrors[data.field as "name" | "attendance"] = data.message;
        }
        setErrors(apiErrors);
        return;
      }
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
        setSubmitted(false);
      }, 1200);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
        onClick={handleClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl rounded-2xl bg-white text-black shadow-xl">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Kapat"
            className="absolute right-4 top-3 h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-black/5 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M6.4 5l12.6 12.6-1.4 1.4L5 6.4 6.4 5Zm12.6 1.4L6.4 19.1 5 17.7 17.7 5l1.3 1.4Z"
              />
            </svg>
          </button>
          <form onSubmit={submit} noValidate className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6">Katılım Durumu</h2>

            <label className="block text-sm mb-1">Ad Soyad*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ad Soyad giriniz"
              className="w-full rounded-md border border-black/20 px-4 h-11 mb-1 outline-none focus:ring-2 focus:ring-black/20"
            />
            {errors.name && (
              <div className="mb-3 text-sm text-red-600">{errors.name}</div>
            )}

            <label className="block text-sm mb-1">E-posta (Opsiyonel)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="w-full rounded-md border border-black/20 px-4 h-11 mb-4 outline-none focus:ring-2 focus:ring-black/20"
            />

            <label className="block text-sm mb-1">
              Hangi Düğüne Katılacaksınız?*
            </label>
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-full rounded-md border border-black/20 px-4 h-11 mb-1 bg-white outline-none focus:ring-2 focus:ring-black/20"
            >
              {options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.value === ""}
                >
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.attendance && (
              <div className="mb-4 text-sm text-red-600">
                {errors.attendance}
              </div>
            )}

            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-black text-white h-11 px-6 text-sm shadow hover:opacity-90 disabled:opacity-60"
              >
                {submitting
                  ? "Gönderiliyor..."
                  : submitted
                  ? "Teşekkürler!"
                  : "Gönder"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
