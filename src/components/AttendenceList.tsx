"use client";

import { useEffect, useMemo, useState } from "react";

type Attendance = "biga" | "tokat" | "both" | "none";

type Item = {
  _id: string;
  name: string;
  email?: string;
  attendance: Attendance;
  createdAt: string;
};

function formatAttendance(value: Attendance) {
  switch (value) {
    case "biga":
      return "Biga";
    case "tokat":
      return "Tokat";
    case "both":
      return "Her ikisi";
    case "none":
      return "Katılmıyor";
    default:
      return value;
  }
}

function useDebounced<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

export default function AttendenceList() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const limit = 24;
  const debouncedQ = useDebounced(q, 350);

  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / limit)),
    [total, limit]
  );

  useEffect(() => {
    let aborted = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });
        if (debouncedQ) params.set("q", debouncedQ);
        const res = await fetch(`/api/attendence?${params.toString()}`, {
          cache: "no-store",
        });
        const data: { items: Item[]; total: number } = await res.json();
        if (!aborted) {
          const apiItems = data.items || [];
          setItems(
            apiItems.map((x) => ({
              _id: String(x._id),
              name: x.name,
              email: x.email,
              attendance: x.attendance,
              createdAt: x.createdAt,
            }))
          );
          setTotal(Number(data.total || apiItems.length || 0));
        }
      } catch {
        if (!aborted) setError("Veriler yüklenemedi");
      } finally {
        if (!aborted) setLoading(false);
      }
    }
    run();
    return () => {
      aborted = true;
    };
  }, [page, debouncedQ]);

  useEffect(() => {
    // yeni aramada ilk sayfaya dön
    setPage(1);
  }, [debouncedQ]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="İsim ile ara..."
          className="w-full max-w-sm rounded-md border border-black/20 px-3 h-10 outline-none focus:ring-2 focus:ring-black/20"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-black/5">
            <tr>
              <th className="text-left px-3 py-2 border-b">Ad Soyad</th>
              <th className="text-left px-3 py-2 border-b">E-posta</th>
              <th className="text-left px-3 py-2 border-b">Katılım</th>
              <th className="text-left px-3 py-2 border-b">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-6 text-center text-black/60" colSpan={4}>
                  Yükleniyor...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="px-3 py-6 text-center text-red-600" colSpan={4}>
                  {error}
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-center text-black/60" colSpan={4}>
                  Kayıt bulunamadı.
                </td>
              </tr>
            ) : (
              items.map((it) => (
                <tr key={it._id} className="hover:bg-black/5">
                  <td className="px-3 py-2 border-b">{it.name}</td>
                  <td className="px-3 py-2 border-b">{it.email || "-"}</td>
                  <td className="px-3 py-2 border-b">
                    {formatAttendance(it.attendance)}
                  </td>
                  <td className="px-3 py-2 border-b">
                    {new Date(it.createdAt).toLocaleString("tr-TR")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="text-black/60">
          {items.length > 0 && (
            <span>
              {(page - 1) * limit + 1}-{(page - 1) * limit + items.length} /{" "}
              {total}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded border disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
          >
            Önceki
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            className="px-3 py-1.5 rounded border disabled:opacity-50"
            onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
            disabled={page >= totalPages || loading}
          >
            Sonraki
          </button>
        </div>
      </div>
    </div>
  );
}
