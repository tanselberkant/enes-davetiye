import { SiteData } from "./types";

export const SITE_DATA: SiteData = {
  brideGroom: "Ceren & Enes",
  bannerImage: "/banner_photo.png",
  topCountdown: {
    label: "30 AĞUSTOS 2025 - Havuz Cafe",
    targetISO: "2025-08-30T20:00:00+03:00",
  },
  bottomCountdown: {
    label: "6 EYLÜL 2025 - Düğün",
    targetISO: "2025-09-06T20:00:00+03:00",
  },
  leftEvent: {
    cityLabel: "Şükrüye & Murat",
    family: "DEMİR",
    date: "30 AĞUSTOS 2025",
    time: "DÜĞÜN 20:00",
    venue: "Havuz Cafe",
    address: "Şirintepe Mh. 86. Sk. No:29\nBiga/ÇANAKKALE",
    title: "Biga",
    mapUrl:
      "https://www.google.com/search?q=%C3%A7anakkale+biga+havuz+cafe&rlz=1C5CHFA_enTR1151TR1151&oq=%C3%A7anakkale+biga+havuz+cafe&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABjvBTIHCAIQABjvBTIHCAMQABjvBTIHCAQQABjvBdIBCDQ0NTBqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8#:~:text=400%E2%80%A7Cafe-,Directions,-Reviews",
    contact: { phone: "+90 553 427 79 85", tel: "+905534277985" },
  },
  rightEvent: {
    cityLabel: "Gülderen & Mustafa",
    family: "ÜNAL",
    date: "6 EYLÜL 2025",
    time: "DÜĞÜN 20:00",
    venue: "Odessa",
    address: "Bahçelievler Mh. Küme 1. No:49\nMerkez/TOKAT",
    title: "Tokat",
    mapUrl:
      "https://www.google.com/search?q=odessa+d%C3%BC%C4%9F%C3%BCn+salonu&rlz=1C5CHFA_enTR1151TR1151&oq=odessa+d%C3%BC%C4%9Fn&gs_lcrp=EgZjaHJvbWUqCAgBEAAYDRgeMgYIABBFGDkyCAgBEAAYDRgeMggIAhAAGA0YHjIICAMQABgNGB4yBwgEEAAY7wUyBwgFEAAY7wUyCggGEAAYgAQYogQyBwgHEAAY7wUyBwgIEAAY7wXSAQg3MDI2ajBqMagCALACAA&sourceid=chrome&ie=UTF-8#:~:text=venue%20in%20Turkey-,Directions,-Reviews",
    contact: { phone: "+90 539 516 89 87", tel: "+905395168987" },
  },
  accommodations: [
    {
      city: "Biga",
      district: "Çanakkale",
      items: [
        {
          name: "Big Point Hotel",
          phone: { phone: "+90 555 555 55 55", tel: "+905555555555" },
          address: "Sakarya Mah. Şehitler Cad. No:99,\nBiga/Çanakkale",
          notes: "Biga Merkez: Düğüne 20 dk",
        },
        {
          name: "Big Inn Hotel",
          phone: { phone: "+90 599 744 00 12", tel: "+905997440012" },
          address: "Şirintepe, Esen Meşelik Cad. No:76,\nBiga/Çanakkale",
          notes: "Biga Merkez: Düğüne 7-8 dk",
        },
        {
          name: "Gönenen Çamlık Otel",
          phone: { phone: "+90 286 316 70 70", tel: "+902863167070" },
          address: "İstiklal Cad. No: 58, Çınarlı/ Biga / Çanakkale",
          notes: "Salon: Yakınlığı: 10 dk",
        },
      ],
    },
    {
      city: "Tokat",
      district: "Merkez",
      items: [
        {
          name: "Dedeman Tokat",
          phone: { phone: "+90 356 214 60 00", tel: "+903562146000" },
          address: "Karşıyaka, Orhangazi Cd. No:89,\nTokat Merkez",
          notes: "Salon: Merkezi, 10 dk",
        },
        {
          name: "Yazmacılar Han Butik Otel",
          phone: { phone: "+90 356 214 21 14", tel: "+903562142114" },
          address: "Meydan Mah. Hükümet Cd. No:5,\nTokat Merkez",
          notes: "Tarihî Merkez: Uzaktık: 5-6 dk",
        },
        {
          name: "Tokat Royal Hotel",
          phone: { phone: "+90 356 228 21 21", tel: "+903562282121" },
          address:
            "VANLAR MAH. G.O.P. BULVARI VAKIF İŞHAN NO:25,\nTokat Merkez",
          notes: "Salon: Merkezi, 7-8 dk",
        },
      ],
    },
  ],
  photoUploadLink:
    "https://drive.google.com/drive/folders/109q2UDujwEygGQMICQeso_9gmhPwdY8p",
};

export type RsvpOption = { value: string; label: string };

export function getRsvpOptions(): RsvpOption[] {
  return [
    { value: "", label: "Lütfen seçiniz" },
    {
      value: "biga",
      label: `${SITE_DATA.leftEvent.title} (${SITE_DATA.leftEvent.date})`,
    },
    {
      value: "tokat",
      label: `${SITE_DATA.rightEvent.title} (${SITE_DATA.rightEvent.date})`,
    },
    { value: "both", label: "Her ikisine de Katılacağım" },
    { value: "none", label: "Katılmayacağım" },
  ];
}
