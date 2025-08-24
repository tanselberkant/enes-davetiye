import AccommodationList from "@/components/AccommodationList";
import Banner from "@/components/Banner";
import EventCard from "@/components/EventCard";
import FooterNote from "@/components/FooterNote";
import PhotoUpload from "@/components/PhotoUpload";
import RsvpTrigger from "@/components/RsvpTrigger";
import { SITE_DATA } from "@/constants";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#171717]">
      <Banner />
      <section id="details" className="-mt-16 pb-8" />
      <section className="py-40">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <EventCard data={SITE_DATA.leftEvent} />
          <EventCard data={SITE_DATA.rightEvent} />
        </div>
      </section>
      <div className="flex items-center justify-center">
        <RsvpTrigger />
      </div>
      <AccommodationList groups={SITE_DATA.accommodations} />
      <PhotoUpload />
      <FooterNote />
    </div>
  );
}
