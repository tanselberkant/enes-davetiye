"use client";

import { useRouter } from "next/navigation";

const ReturnHomeButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="text-sm px-3 py-1.5 rounded-md border hover:bg-black/5 cursor-pointer"
    >
      Anasayfa
    </button>
  );
};

export default ReturnHomeButton;
