"use client";

import { useEffect, useState } from "react";

type Props = {
  label: string;
  targetISO: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Countdown({ label, targetISO }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(new Date(targetISO))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(calculateTimeLeft(new Date(targetISO)));
    }, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  // background: rgba(0, 0, 0, 0.6);
  const itemClass =
    "flex flex-col items-center justify-center bg-[rgba(0,0,0,0.6)] text-white rounded-md min-w-20 min-h-[92px] ";
  const numberClass = "text-[32px] font-semibold";
  const labelClass = "mt-1 text-[18px] font-semibold";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-4">
        <div className={itemClass}>
          <div className={numberClass}>
            {String(timeLeft.days).padStart(2, "0")}
          </div>
          <div className={labelClass}>GÜN</div>
        </div>
        <div className={itemClass}>
          <div className={numberClass}>
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <div className={labelClass}>SAAT</div>
        </div>
        <div className={itemClass}>
          <div className={numberClass}>
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <div className={labelClass}>DAKİKA</div>
        </div>
        <div className={itemClass}>
          <div className={numberClass}>
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <div className={labelClass}>SANİYE</div>
        </div>
      </div>
      <div className="text-xl font-semibold opacity-90">{label}</div>
    </div>
  );
}
