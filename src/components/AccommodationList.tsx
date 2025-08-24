import { AccommodationGroup } from "@/types";

type Props = {
  groups: AccommodationGroup[];
};

export default function AccommodationList({ groups }: Props) {
  return (
    <section id="accommodation" className="mb-20 mt-40">
      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
        Konaklama Seçenekleri
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {groups.map((group) => (
          <div
            key={group.city}
            className="bg-[#f8f8f8] py-[3rem] px-[2.5rem] rounded-t-[200px] rounded-b-[15px] shadow-2xl relative min-h-[500px] flex-1 max-w-[400px] "
          >
            <div className="text-center mb-8 border-b-[2px] border-[#e0e0e0] pb-6">
              <div className="text-4xl font-semibold">{group.city}</div>
              <div className="text-2xl mt-2 ">{group.district}</div>
            </div>
            <div className="flex flex-col gap-4">
              {group.items.map((hotel) => (
                <div
                  key={hotel.name}
                  className="rounded-2xl border border-[#e0e0e0] p-6 bg-white shadow-sm"
                >
                  <div className="text-center text-xl font-semibold font-serif">
                    {hotel.name}
                  </div>

                  <div className="mt-4 flex justify-center">
                    <a
                      className="inline-flex items-center gap-2 rounded-full border border-black h-11 px-5 text-sm"
                      href={`tel:${hotel.phone.tel}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                        aria-hidden="true"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.1 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.81.3 1.6.57 2.35a2 2 0 01-.45 2.11L8 9a16 16 0 006 6l.82-.23a2 2 0 012.11.45c.75.27 1.54.45 2.35.57A2 2 0 0122 16.92z" />
                      </svg>
                      {hotel.phone.phone}
                    </a>
                  </div>

                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 flex-none"
                        aria-hidden="true"
                      >
                        <path d="M12 2a8 8 0 00-8 8c0 4.42 8 12 8 12s8-7.58 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
                      </svg>
                      <div className="whitespace-pre-line opacity-80">
                        {hotel.address}
                      </div>
                    </div>

                    {hotel.notes && (
                      <div className="flex items-start gap-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 flex-none"
                          aria-hidden="true"
                        >
                          <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14h-2v-6h2zm0-8h-2V6h2z" />
                        </svg>
                        <div className="opacity-80">{hotel.notes}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
