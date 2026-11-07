# TECH STACK SPECIFICATION
## Personal Soul Blueprint™ — The Soul of Speaking Indonesia

Dokumen ini mendefinisikan arsitektur teknologi, dependensi, dan prinsip rekayasa perangkat lunak yang diimplementasikan pada platform **Personal Soul Blueprint™**.

---

## 1. Arsitektur Inti (Core Architecture)

| Layer | Teknologi | Versi | Peran & Justifikasi |
|---|---|---|---|
| **Framework** | **Next.js (App Router)** | `15.x` | Server-Side Rendering (SSR), Static Site Generation (SSG), React Server Components (RSC), and Server Actions. |
| **Frontend Library** | **React** | `19.x` | Reaktifitas antarmuka, state form, transisi halaman, dan komponen modular. |
| **Bahasa Pemrograman** | **TypeScript** | `5.7+` | Strict mode typing untuk integritas data kuesioner, skor, dan tipe database. |
| **Styling Engine** | **Tailwind CSS** | `3.4.17` | Utility-first CSS dengan custom design tokens (Burgundy `#9B1B5A`, Deep Plum `#4B1735`, Rose `#F5E8EF`, Warm Ivory `#FCF9F7`). |
| **UI Components** | **shadcn/ui + Radix primitives** | Latest | Komponen tombol, kartu, badge, dan modal yang aksesibel (WCAG compliant). |
| **Iconography** | **Lucide React** | `0.475+` | Set ikon monokrom yang konsisten, ringan, dan modern. |
| **Visualisasi Data** | **Recharts** | `2.15+` | Grafik batang horizontal profil 9 pola komunikasi dengan tooltip dan penyesuaian warna level skor. |
| **Validasi Skema** | **Zod** | `3.24+` | Validasi runtime ketat sisi klien dan sisi server untuk pendaftaran partisipan, progres, submit, dan refleksi. |
| **Form Handling** | **React State & React Hook Form** | `7.54+` | Pengelolaan state formulir, validasi real-time, dan autosave ke server. |
| **Backend & Database** | **Supabase PostgreSQL** | Native / SSR | Database relasional dengan Row Level Security (RLS), UUID keys, dan token hashing. |
| **Testing Harness** | **Node.js Test Runner + TSX** | Native | Eksekusi pengujian unit engine dan integrasi E2E secepat kilat tanpa overhead Jest. |

---

## 2. Prinsip Rekayasa (Engineering Principles)

1. **No Frontend Scoring Authority:**
   Klien (browser) dilarang menghitung skor akhir. Klien hanya mengirimkan payload 27 jawaban mentah yang divalidasi dan dihitung secara independen di sisi server melalui `src/modules/assessment/scoring.ts`.
2. **Dual-Mode High Availability Repository:**
   Platform dilengkapi dengan gateway repository (`src/lib/db/assessment-repository.ts`) yang mendukung koneksi langsung ke Supabase PostgreSQL, serta fallback database transaksional JSON atomic (`data/tsosi_db.json`) berkecepatan tinggi saat beroperasi di lingkungan demo/lokal tanpa kehilangan kapabilitas CRUD, pencarian, filter, dan ekspor.
3. **Stateless Result Access with Token Hashing:**
   Partisipan tidak perlu login/membuat akun. Akses laporan hasil diamankan dengan URL bertoken acak 48-karakter hex unik (`/assessment/result/[token]`). Di basis data, token dipetakan melalui SHA-256 hash untuk mencegah serangan enumerasi data.
4. **Dedicated Print Stylesheet:**
   Tersedia aturan `@media print` khusus yang mengeliminasi bilah navigasi, tombol interaktif, dan footer situs publik, serta menyusun laporan menjadi format cetak resmi berstandar tinggi yang siap diekspor ke PDF melalui browser.
5. **Strict Exclusion of Forbidden Stacks:**
   - Tidak menggunakan Prisma ORM.
   - Tidak menggunakan Neon.
   - Tidak menggunakan MongoDB.
   - Tidak menggunakan Express.js / NestJS terpisah.
   - Tidak ada microservices yang tidak perlu.
