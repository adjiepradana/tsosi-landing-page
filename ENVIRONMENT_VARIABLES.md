# ENVIRONMENT VARIABLES SPECIFICATION
## Personal Soul Blueprint™ — The Soul of Speaking Indonesia

Dokumen ini mendokumentasikan setiap variabel lingkungan (*environment variable*), tipe data, tingkat kerahasiaan, serta nilai standarnya.

---

| Nama Variabel | Tipe Data | Cakupan (*Scope*) | Deskripsi & Nilai Contoh |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | String (URL) | **Public** (Terekspos ke Client) | URL endpoint proyek Supabase Cloud (contoh: `https://xyzprojectref.supabase.co`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | String (JWT) | **Public** (Terekspos ke Client) | Anon public key Supabase untuk interaksi browser yang dibatasi oleh aturan RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | String (JWT) | **Server-Only (Secret)** | Kunci otorisasi master untuk eksekusi server-side terproteksi (jangan pernah diekspos ke klien). |
| `NEXT_PUBLIC_APP_URL` | String (URL) | **Public** (Terekspos ke Client) | Domain utama tempat aplikasi di-hosting (contoh: `http://localhost:3000` di lokal, atau `https://blueprint.thesoulofspeaking.id` di produksi). |
| `ADMIN_DEFAULT_EMAIL` | String (Email) | **Server-Only** | Alamat email resmi untuk akun administrator (default: `admin@thesoulofspeaking.id`). |
| `ADMIN_DEFAULT_PASSWORD` | String | **Server-Only (Secret)** | Kata sandi untuk login portal admin fasilitator (default lokal: `SoulSpeaking2026!`). |

---

## ⚠️ Pedoman Keamanan Konfigurasi

1. **File `.env.local`:** Digunakan khusus untuk lingkungan pengembangan lokal dan **tidak boleh di-commit** ke Git repository publik.
2. **File `.env.example`:** Berisi template nama-nama variabel dengan nilai dummy sebagai panduan bagi developer tim.
3. **Produksi (Vercel):** Seluruh variabel di atas dimasukkan secara aman melalui dashboard Vercel di menu **Project Settings -> Environment Variables**.
