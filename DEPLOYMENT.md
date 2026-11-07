# DEPLOYMENT GUIDE
## Personal Soul Blueprint™ — The Soul of Speaking Indonesia

Panduan komprehensif untuk deployment produksi platform Personal Soul Blueprint™ ke **Vercel** dan **Supabase Cloud**.

---

## 1. Persiapan Basis Data di Supabase Cloud

1. **Buat Proyek Supabase Baru:**
   - Kunjungi [Supabase Dashboard](https://supabase.com/dashboard) dan buat organisasi atau proyek baru (misal: `tsosi-blueprint-prod`).
   - Pilih region terdekat (misal: Singapore `ap-southeast-1`).
2. **Jalankan Migrasi Database:**
   - Buka menu **SQL Editor** di Supabase Dashboard.
   - Salin isi file `supabase/migrations/20261107000000_init_tsosi_schema.sql` dan jalankan (*Run*).
   - Salin isi file `supabase/seed.sql` untuk menginisialisasi 9 pola komunikasi dan 27 pernyataan asesmen baku, lalu jalankan (*Run*).
3. **Dapatkan Kredensial API:**
   - Masuk ke menu **Project Settings -> API**.
   - Salin **Project URL** (`https://<project-id>.supabase.co`).
   - Salin **anon public key** (`eyJhbGci...`).
   - Salin **service_role secret key** (`eyJhbGci...`).

---

## 2. Deployment ke Vercel

### Metode 1: Melalui Vercel CLI
```bash
# 1. Login ke Vercel
npx vercel login

# 2. Deploy ke staging / preview
npx vercel

# 3. Deploy ke production
npx vercel --prod
```

### Metode 2: Melalui Git Repository (GitHub / GitLab)
1. Push repositori lokal ke GitHub:
   ```bash
   git add .
   git commit -m "feat: complete production Personal Soul Blueprint platform"
   git push origin main
   ```
2. Buka [Vercel Dashboard](https://vercel.com/new).
3. Import repositori `tsosi-assesment-system`.
4. Pilih framework **Next.js** (Vercel akan otomatis mendeteksi konfigurasi App Router).
5. Pada bagian **Environment Variables**, tambahkan variabel berikut:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://<project-id>.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<anon-public-key>`
   - `SUPABASE_SERVICE_ROLE_KEY` = `<service-role-secret-key>`
   - `NEXT_PUBLIC_APP_URL` = `https://blueprint.thesoulofspeaking.id` (atau domain Vercel Anda)
   - `ADMIN_DEFAULT_EMAIL` = `admin@thesoulofspeaking.id`
   - `ADMIN_DEFAULT_PASSWORD` = `<kata-sandi-admin-kuat>`
6. Klik **Deploy**.

---

## 3. Konfigurasi Domain Kustom

1. Di Vercel Dashboard proyek, buka tab **Settings -> Domains**.
2. Masukkan domain resmi (misal: `blueprint.thesoulofspeaking.id` atau `asesmen.thesoulofspeaking.id`).
3. Buat CNAME record di DNS provider domain Anda mengarah ke `cname.vercel-dns.com`.
4. Sertifikat SSL/TLS akan otomatis diterbitkan oleh Vercel.

---

## 4. Verifikasi Pasca-Deployment (Smoke Testing Checklist)

- [ ] Buka beranda publik: Hero, logo resmi The Soul of Speaking, 9 pola komunikasi, dan FAQ dapat diakses lancar.
- [ ] Buka `/assessment/start`: Isi data simulasi nama, email, nomor telepon, dan centang persetujuan.
- [ ] Buka petunjuk asesmen: Pastikan penjelasan skala 1-5 tampil rapi.
- [ ] Jawab 27 pernyataan: Pastikan autosave, navigasi, dan tinjauan bekerja.
- [ ] Submit asesmen: Pastikan diarahkan ke `/assessment/result/[token]` dengan grafik Recharts dan interpretasi lengkap.
- [ ] Uji fitur cetak: Klik tombol *Cetak / Simpan PDF* untuk memverifikasi print stylesheet.
- [ ] Akses `/admin/login`: Masuk dengan kredensial admin dan periksa metrik KPI partisipan.
- [ ] Unduh CSV: Klik *Ekspor CSV* untuk memverifikasi rekapitulasi data partisipan.
