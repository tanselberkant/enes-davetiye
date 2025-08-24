import { LocationInfo } from "@/types";

type Props = {
  data: LocationInfo;
};

export default function EventCard({ data }: Props) {
  return (
    <article className="flex-1 max-w-[400px] bg-[#f8f8f8] py-[3rem] px-[2.5rem] rounded-t-[200px] rounded-b-[15px] shadow-2xl relative min-h-[500px]">
      <div className="text-sm opacity-70 text-center">{data.cityLabel}</div>
      <h3 className="text-2xl font-semibold tracking-widest mt-1 text-center border-b-[2px] border-[#e0e0e0] pb-2">
        {data.family}
      </h3>

      <div className="mt-8 text-center">
        <div className="text-3xl font-semibold uppercase tracking-wide">
          {data.date}
        </div>
        <div className="mt-2 text-lg">{data.time}</div>
        <div className="mt-4 text-2xl font-medium">{data.venue}</div>
        <p className="mt-2 text-lg whitespace-pre-line opacity-80">
          {data.address}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <a
          href={data.mapUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center rounded-full bg-black text-white h-11 px-6 text-sm"
        >
          Konum
        </a>
        <a
          href={`tel:${data.contact.tel}`}
          className="inline-flex items-center justify-center rounded-full border border-black h-11 px-6 text-sm"
        >
          {data.contact.phone}
        </a>
      </div>
    </article>
  );
}
