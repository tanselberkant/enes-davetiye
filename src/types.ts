export type ContactInfo = {
  phone: string; // formatted display
  tel: string; // tel: link value without spaces
};

export type LocationInfo = {
  title: string;
  date: string; // e.g., "30 AĞUSTOS 2025"
  time: string; // e.g., "DÜĞÜN 20:00"
  venue: string; // e.g., "Havuz Cafe"
  address: string; // multiline acceptable
  cityLabel: string; // e.g., "Şükrüye & Murat"
  family: string; // e.g., "DEMİR"
  mapUrl: string;
  contact: ContactInfo;
};

export type AccommodationItem = {
  name: string;
  phone: ContactInfo;
  address: string;
  notes?: string;
};

export type AccommodationGroup = {
  city: string;
  district: string;
  items: AccommodationItem[];
};

export type CountdownEvent = {
  label: string; // e.g., "14 AĞUSTOS 2025 - İstem Günü"
  targetISO: string; // ISO timestamp used for countdown
};

export type SiteData = {
  brideGroom: string; // e.g., "Ceren & Enes"
  bannerImage: string; // path under public/
  topCountdown: CountdownEvent;
  bottomCountdown: CountdownEvent;
  leftEvent: LocationInfo;
  rightEvent: LocationInfo;
  accommodations: AccommodationGroup[];
  photoUploadLink: string; // a Google Drive folder link
};
