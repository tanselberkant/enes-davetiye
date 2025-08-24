"use client";

import { useState } from "react";
import RsvpModal from "@/components/RsvpModal";

export default function RsvpTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex font-semibold items-center justify-center gap-2 rounded-full bg-black text-white px-5 text-xl shadow min-w-[305px] min-h-[62px] hover:opacity-90 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M12.1 20.3 4.8 13a5.2 5.2 0 0 1 7.3-7.3 5.2 5.2 0 0 1 7.3 7.3l-7.3 7.3Z"
          />
        </svg>
        Katılım Durumunu Bildir
      </button>
      <RsvpModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
