import { SITE_DATA } from "@/constants";

export default function PhotoUpload() {
  return (
    <section id="photos" className="py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold">Anılarımız</h2>
      <p className="mt-3 text-sm md:text-base opacity-80 max-w-2xl mx-auto">
        Bizimle paylaşmak istediğiniz fotoğrafları yükleyebilirsiniz.
      </p>
      <div className="mt-6">
        <a
          href={SITE_DATA.photoUploadLink}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center rounded-full bg-black text-white h-11 px-6 text-sm"
        >
          Fotoğraf Yükle
        </a>
      </div>
    </section>
  );
}
