"use client";

import Image from "next/image";
import Countdown from "./Countdown";
import { SITE_DATA } from "@/constants";

export default function Banner() {
  const { brideGroom, bannerImage, topCountdown, bottomCountdown } = SITE_DATA;

  return (
    <section className="relative w-full h-[100vh] min-h-[520px] overflow-hidden">
      <Image
        src={bannerImage}
        alt="Banner"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 max-w-[490px] mx-auto md:pt-14">
        <h1 className="text-5xl md:text-7xl  tracking-wide mb-8 text-center ">
          {brideGroom}
        </h1>

        <div className="flex flex-col items-center gap-8">
          <Countdown
            label={topCountdown.label}
            targetISO={topCountdown.targetISO}
          />
          <p className="max-w-[430px] text-center text-lg md:text-[22px] text-white font-semibold">
            Hayatımızın en özel anı, düğün törenimizde sizleri de aramızda
            görmekten mutluluk duyarız.
          </p>
          <Countdown
            label={bottomCountdown.label}
            targetISO={bottomCountdown.targetISO}
          />
          <a
            href="#details"
            className="mt-8 inline-flex flex-col items-center gap-2  text-white px-5 py-3 rounded-md text-sm md:text-base shadow hover:opacity-90"
            aria-label="Detaylara kaydır"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 animate-bounce"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M12 16a1 1 0 0 1-.7-.29l-6-6a1 1 0 1 1 1.4-1.42L12 13.59l5.3-5.3a1 1 0 0 1 1.4 1.42l-6 6A1 1 0 0 1 12 16Z"
              />
            </svg>
            <span>Aşağı kaydırınız.</span>
          </a>
        </div>
      </div>
    </section>
  );
}
