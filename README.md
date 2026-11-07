# Personal Soul Blueprint™
### The Soul of Speaking Indonesia — Conflict Pattern Self-Assessment Platform

> **"Understand Your Patterns. Transform the Way You Communicate."**  
> *Kenali pola komunikasi yang muncul ketika menghadapi konflik. Bangun kesadaran diri dan temukan cara baru untuk berkomunikasi dengan lebih sehat.*

---

## 🌟 Ikhtisar Produk (Product Overview)

**Personal Soul Blueprint™** adalah platform fullstack refleksi diri dan komunikasi interpersonal yang dikembangkan untuk **The Soul of Speaking Indonesia**. Platform ini dirancang untuk memetakan kecenderungan respons bawah sadar seseorang saat menghadapi konflik, kritik, perbedaan pendapat, dan percakapan sulit.

Sistem ini menyediakan pengalaman menyeluruh:
1. **Landing Page Publik Premium:** Memperkenalkan 9 pola komunikasi dengan estetika soulful, tipografi Playfair Display & Inter, palet warna resmi Burgundy (`#9B1B5A`) dan Deep Plum (`#4B1735`), serta logo resmi The Soul of Speaking Indonesia.
2. **Formulir Pendaftaran Partisipan:** Tanpa password, tanpa akun, tanpa OTP, tanpa payment gateway. Hanya membutuhkan Nama Lengkap, Email, dan WhatsApp dengan validasi ketat Zod.
3. **Kuesioner Interaktif 27 Pernyataan:** Menyajikan 27 pernyataan reflektif terstruktur dengan skala penilaian 1 hingga 5, navigasi responsif, penyimpanan otomatis (autosave), bilah progres, dan modal tinjauan jawaban.
4. **Authoritative Server-side Scoring Engine:** Mengkalkulasi skor rata-rata pola (3 pernyataan per pola), skor rata-rata keseluruhan (27 pernyataan), perangkingan deterministik, penentuan kategori deskriptif, dan identifikasi prioritas refleksi utama.
5. **Laporan Hasil Personal Mendalam:** Visualisasi grafik horizontal Recharts, interpretasi detail per pola, rekomendasi latihan 7 hari (*Seven-Day Conscious Communication Practice*), lembar refleksi personal interaktif, dan fungsi cetak/simpan PDF profesional.
6. **Portal Eksekutif & Admin Dashboard:** Login fasilitator, kartu KPI real-time (total partisipan, selesai, hari ini, pola dominan), grafik agregat 9 pola, tabel partisipan dengan filter & pencarian, inspeksi audit 27 jawaban per partisipan, dan ekspor data CSV.

---

## 🏛️ Sembilan Pola Komunikasi (The 9 Patterns)

Setiap pola dievaluasi melalui 3 pernyataan reflektif:

| No | Pola Komunikasi | Judul Bahasa Indonesia | Pernyataan Terkait | Fokus Latihan Sadar |
|---|---|---|---|---|
| **01** | **Reactive Pattern** | Bereaksi sebelum sadar | Q01, Q02, Q03 | Memberi jeda, menyadari emosi & sensasi tubuh, lalu memilih respons sadar. |
| **02** | **Assumption Pattern** | Menganggap tafsir sebagai fakta | Q04, Q05, Q06 | Pisahkan fakta dari dugaan, tanyakan maksud langsung, dan uji tafsir sebelum menyimpulkan. |
| **03** | **Defensive Pattern** | Cepat membela diri | Q07, Q08, Q09 | Dengarkan sampai selesai, minta contoh spesifik, dan pilah masukan konstruktif. |
| **04** | **Avoidance Pattern** | Menghindari percakapan sulit | Q10, Q11, Q12 | Pilih waktu yang aman, sepakati waktu bicara yang jelas, dan mulai dari satu isu spesifik. |
| **05** | **People-Pleasing Pattern** | Menyenangkan orang dengan mengabaikan kebutuhan diri | Q13, Q14, Q15 | Kenali kebutuhan diri, tunda jawaban otomatis, dan nyatakan batas dengan hormat. |
| **06** | **Control Pattern** | Membutuhkan cara sendiri | Q16, Q17, Q18 | Sepakati standar hasil utama, lalu beri fleksibilitas dan kepercayaan atas cara orang lain. |
| **07** | **Judgment Pattern** | Cepat menilai | Q19, Q20, Q21 | Deskripsikan perilaku faktual, tunda label, eksplorasi konteks, dan hindari menyerang pribadi. |
| **08** | **Listening Gap Pattern** | Mendengar untuk membalas, bukan memahami | Q22, Q23, Q24 | Fokuskan perhatian, latih mendengarkan aktif, refleksikan inti pesan, dan parafrasekan. |
| **09** | **Escalation Pattern** | Konflik makin panas dan sulit diperbaiki | Q25, Q26, Q27 | Kenali tanda awal eskalasi, sepakati jeda pendinginan, dan fokus kembali pada solusi utama. |

---

## 🚀 Memulai Aplikasi (Quickstart)

### Prasyarat
- Node.js versi 18.18+ atau 20+ (terverifikasi kompatibel pada Node v24)
- npm versi 9+

### Instalasi & Menjalankan Mode Development
```bash
# Masuk ke direktori proyek
cd d:/tsosi-assesment-system

# Jalankan server development Next.js
npm run dev
```
Buka peramban di `http://localhost:3000`.

### Menjalankan Unit & Integration Test
```bash
npm test
```
*Seluruh 10 skenario pengujian unit engine dan integrasi E2E akan dieksekusi.*

### Menjalankan Build Produksi
```bash
npm run build
npm start
```

---

## 🔐 Kredensial Administrator Default

- **URL Login:** `http://localhost:3000/admin/login`
- **Email:** `admin@thesoulofspeaking.id`
- **Password:** `SoulSpeaking2026!`

*(Dapat dikonfigurasi melalui variabel lingkungan `ADMIN_DEFAULT_EMAIL` dan `ADMIN_DEFAULT_PASSWORD`)*

---

## 📄 Batasan Etis & Psikoedukasi

> **PENTING:** Personal Soul Blueprint™ adalah instrumen refleksi diri dan psikoedukasi awal. Instrumen ini **bukan alat diagnosis medis/psikologis klinis, bukan pengukuran gelombang/aktivitas otak**, dan bukan pengganti asesmen klinis psikolog atau psikiater berlisensi.
