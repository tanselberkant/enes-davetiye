## AI Geliştirici Kılavuzu

Bu kılavuz, projeyi geliştirecek yapay zekâ veya geliştiricilere mimariyi, standartları ve değişiklik kurallarını aktarır. Amaç, iskeleti bozmadan, mevcut mantığı koruyarak geliştirme yapmaktır.

### Teknoloji Yığını

- **Next.js 15 (App Router)**, **React 19**, **TypeScript (strict)**
- **Tailwind CSS v4** (postcss plugin), global tema `src/app/globals.css`
- **MongoDB (Node Driver v6)**, custom cookie tabanlı auth

### Proje Yapısı ve Temel Modüller

- `src/app/`
  - `layout.tsx`: Global layout, Google font `Cormorant` ve `globals.css` yükler.
  - `page.tsx`: Ana sayfa; `Banner`, `EventCard`, `AccommodationList`, `AttendenceModalTrigger`, `PhotoUpload`, `FooterNote` bileşenleri ile sayfayı kompoze eder.
  - `api/attendence/route.ts`: Katılım API’si (GET/POST). DİKKAT: Koleksiyon ve route adı kasıtlı olarak `attendence` şeklindedir, değiştirmeyin.
  - `admin/(auth)/*`: Giriş sayfası ve auth layout.
  - `admin/(protected)/*`: Auth zorunlu admin alanı layout ve ana sayfa.
- `src/components/`
  - Görsel ve form bileşenleri: `Banner`, `Countdown`, `EventCard`, `AccommodationList`, `PhotoUpload`, `FooterNote`, `ReturnHomeButton`
  - Katılım: `AttendenceModalTrigger` (tetikleyici) ve `AttendenceModal` (modal). Not: Dosya içi default export adı geçmişten `RsvpModal` olarak kalmıştır; iskeleti bozmayın, yeniden adlandırmayın.
  - Admin liste: `AttendenceList` (client bileşen; `GET /api/attendence` ile sayfalı/aranabilir liste)
- `src/lib/`
  - `auth.ts`: Cookie tabanlı basit oturum: `loginWithCredentials`, `isAuthenticated`, `logout`
  - `db.ts`: Mongo bağlantısı (tekil client cache), koleksiyon işlemleri (`insertAttendence`, `searchAttendence`)
  - `utils.ts`: `getEnv(name)` — env değişkenleri zorunlu; yoksa hata atar
- `src/constants.ts`: Site metinleri ve içerik (`SITE_DATA`), RSVP seçenekleri `getRsvpOptions()`
- `src/types.ts`: UI/icerik tipleri (`SiteData`, `LocationInfo`, vb.)

### Türler ve Veri Modelleri

- `AttendenceDocument` (DB): `{ _id?, name: string, email?: string, attendance: "biga"|"tokat"|"both"|"none", createdAt: Date }`
- API `GET /api/attendence` yanıtı: `{ ok: true, items, total, page, limit }` veya `{ ok: false, error: "DB_ERROR" }`
- API `POST /api/attendence` gövdesi: `{ name, email, attendance }`
  - Hata halinde: `{ ok: false, field: "name"|"attendance", message: string }` ve 400 status

### Auth ve Yetkilendirme

- Cookie adı: `admin_session`, TTL: 1 gün.
- İmza: HMAC-SHA256 (`AUTH_SECRET`). `isAuthenticated()` imzayı ve yaş kontrolünü yapar.
- Giriş: `loginWithCredentials(username, password)` → `cookies().set(...)`
- Çıkış: `logout()` → cookie `maxAge: 0`
- Admin koruma paterni: `(protected)/layout.tsx` içinde `isAuthenticated()` kontrolü + `redirect("/admin/login")`. Server Action ile `logout` formu.

### Çevresel Değişkenler (ENV)

- Zorunlu: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `AUTH_SECRET`
- Mongo: Tercihen `MONGO_CONNECTION_URI`; yoksa `MONGO_DB_USERNAME`, `MONGO_DB_PASSWORD` ile URI türetimi
- Tüm env erişimleri `getEnv(name)` ile yapılır; boş ise hata atar. Geliştirme/CI ortamında değişkenleri eksiksiz tanımlayın.

### Veri Erişimi ve DB Kuralları

- `getMongoClient()` tekil client’ı cache eder. Yeni client oluşturmayın; var olanı kullanın.
- Varsayılan DB adı: `enesdavatiye`. Koleksiyon adı: `attendence`. İSİM DEĞİŞTİRMEYİN.
- Arama: `searchAttendence({ q, page, limit })` — regex ile `name` üzerinde case-insensitive arama, sıralama `createdAt: -1`.
- Ekleme: `insertAttendence(...)` — `createdAt` otomatik atanır.

### UI ve Bileşen Standartları

- Client bileşenlerinde ilk satırda `"use client"` kullanın. Server komponentlerinde useState/useEffect kullanmayın.
- Metinler Türkçe, kod ve tipler İngilizce. Bileşen isimleri PascalCase, fonksiyon/degisken camelCase.
- Stil: Tailwind CSS sınıfları; `globals.css` içindeki `@theme inline` tanımları ve `Cormorant` fontu korunmalı.
- Erişilebilirlik: Temel `aria-*` ve semantik etiketler mevcut; düzenlerken koruyun.
- `AttendenceList`: sorgu debounce (350ms), `cache: "no-store"`, sayfalama; aynı sözleşmeyi koruyun.

### API ve Hata Yönetimi

- API route’larında try/catch kullanılır; 500 durumunda `{ ok: false, error: "DB_ERROR" }` dönülür.
- 4xx doğrulama hatalarında `field` ve `message` döndürün; UI bu alanı bekler.

### Next.js ve Yönlendirme

- `redirect()` sadece server tarafında kullanılır (ör. server action veya server component).
- İstemci yönlendirmeleri için `useRouter().push()` kullanın (`ReturnHomeButton`).

### Lint, TS, Yol Alias’ları

- ESLint: `eslint.config.mjs` → `next/core-web-vitals`, `next/typescript`. Yeni kurallar eklerken mevcut temeli bozmayın.
- TS Strict açıktır; tipleri genişletirken `any` kullanmayın. Yol alias: `@/*` → `./src/*`.

### Build/Çalıştırma

- `pnpm|npm run dev` (turbopack), `npm run build`, `npm start`
- Ortam değişkenleri olmadan uygulama hata verir (tasarım gereği). `.env.local` doldurulmalı.

### Genişletme Kuralları (Kritik İnvariantlar)

- `attendence` koleksiyon/route adını DEĞİŞTİRMEYİN (yanlış yazımına rağmen sözleşmenin parçası).
- `admin_session` cookie adı ve TTL korunmalı; imzalama mantığı (HMAC) değişmemeli.
- `SITE_DATA` yapısı ve `getRsvpOptions()` sözleşmesi bozulmamalı.
- `AttendenceList` beklediği API şekli korunmalı (`items`, `total`, `page`, `limit`).
- `getEnv` ile zorunlu env kontrolü KALMALI. Varsayılan/boş değer eklemeyin.
- Yeni alan eklerken: tipleri (`types.ts` ve DB tipleri), API doğrulamasını ve ilgili UI’ları birlikte güncelleyin.

### Örnek Geliştirme Akışı

1. Kapsamı belirleyin ve etkilenen modülleri bulun (types, constants, lib/db, api route, UI).
2. Tipleri güncelleyin (strict mode, null/undefined açıkça yönetilsin).
3. DB erişim fonksiyonlarını ekleyin/güncelleyin (tekil client, aynı koleksiyon adı).
4. API route’larını güncelleyin (doğrulama, hata sözleşmesi, payload/response şekli değişmeyecekse koruyun).
5. UI’da veri sözleşmesine uyun (loading/error boş durumlarını koruyun; erişilebilirlik nitelikleri bozulmasın).
6. Env gerektiriyorsa README/ENV örneğini güncelleyin.
7. Lint ve tip hatalarını giderin, build alın.

### Yapılmaması Gerekenler

- İskeleti (klasör yapısı, route adları, auth paterni) bozacak yeniden adlandırmalar.
- `any` tipleri, gizli runtime hataları doğuracak silent-catch kullanımı.
- Env fallback’ları veya gizli default değerler eklemek.
- Senkron olmayan yerde `redirect()` kullanmak veya client’ta server-only API’ları çağırmak.

### Güvenlik Notları

- Parola/kullanıcı adı sabitleri koda gömülmemeli; sadece ENV üzerinden.
- `AUTH_SECRET` sızdırılmamalı; log’lara yazmayın.
- Cookie `httpOnly`, `sameSite: "lax"`, prod’da `secure: true` korunmalı.

## AI için Kısa Sistem Prompt’u

Proje: Next.js 15 + React 19 + TS strict + Tailwind v4 + MongoDB. Aşağıdaki kurallara UY:

- İskeleti bozma: klasör yapısı ve route adları SABİT. `attendence` yazımı DAHİL.
- Auth mantığına dokunma: `admin_session` cookie, HMAC imza, TTL=1gün.
- Env erişimi sadece `getEnv` ile; eksikse hata vermeye devam et.
- DB client tekil cache; koleksiyon adı `attendence`.
- UI metinleri Türkçe; kod İngilizce. Tailwind ve `globals.css` teması korunur.
- API sözleşmesini koru: `/api/attendence` GET/POST yanıt şekilleri değişmesin.
- Client vs Server ayrımı: `"use client"` sadece gerekli bileşenlerde; server action’larda `"use server"`.
- Tipleri genişletirken `any` kullanma; TS strict koru.
- Değişiklik yaparken: önce types → lib/db → api → UI sırasını takip et; linter/build çalışır olmalı.

Kısıtlar/İnvariantlar: `attendence` adı, `admin_session` cookie, `SITE_DATA` yapısı, `getEnv` zorunluluğu, `AttendenceList` sözleşmesi.

Çıktı Beklentisi: Sadece gerekli dosyalarda minimal edit; iskeleti, sözleşmeleri ve stilleri bozma; hataları kullanıcı dostu mesajlarla yönet.
