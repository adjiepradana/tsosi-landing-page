# SECURITY & DATA PROTECTION SPECIFICATION
## Personal Soul Blueprint™ — The Soul of Speaking Indonesia

Dokumen ini mendokumentasikan postur keamanan, proteksi privasi partisipan, dan mitigasi risiko kerentanan pada platform Personal Soul Blueprint™.

---

## 1. Prinsip Keamanan Utama (Security Principles)

1. **Privasi Partisipan Tanpa Akun Publik:**
   Partisipan tidak dipaksa membuat akun login dengan kata sandi publik, sehingga mengurangi risiko *credential stuffing*, *password reuse*, atau kebocoran database kredensial pengguna biasa.
2. **Result Access Tokenization & SHA-256 Hashing:**
   - Setelah asesmen diselesaikan, sistem menghasilkan token unik 48-karakter hex berbasis CSPRNG (`crypto.randomBytes(24)`).
   - Nilai token dikirimkan kepada partisipan melalui URL privat: `/assessment/result/[token]`.
   - Di sisi database, token disimpan dan dicari menggunakan nilai hash kriptografis SHA-256 (`result_token_hash`), mencegah serangan enumerasi ID berurutan (*IDOR / Insecure Direct Object References*).
3. **Server-Side Authoritative Processing:**
   Frontend Next.js tidak memiliki otoritas atas penghitungan skor. Semua data jawaban mentah divalidasi dengan Zod di server, dihitung dengan modul matematis murni, dan diverifikasi sebelum ditulis ke database.
4. **Isolasi Data Partisipan:**
   Partisipan biasa tidak memiliki API publik untuk me-list atau men-query data partisipan lain. Setiap permintaan data hasil dibatasi ketat hanya pada token yang bersangkutan.
5. **Row Level Security (RLS) PostgreSQL:**
   Tabel-tabel sensitif (`participants`, `assessment_submissions`, `assessment_answers`, `pattern_results`, `participant_reflections`) dilindungi oleh kebijakan RLS aktif di PostgreSQL. Akses administratif multi-partisipan hanya diizinkan untuk akun dengan role admin terverifikasi server.
6. **Perlindungan Kunci Layanan (Service Role Key):**
   `SUPABASE_SERVICE_ROLE_KEY` dan `ADMIN_DEFAULT_PASSWORD` hanya dibaca pada runtime Node.js sisi server (`server-only`) dan tidak pernah diekspos melalui variabel publik Next.js `NEXT_PUBLIC_*`.

---

## 2. Autentikasi & Otorisasi Administrator

- Rute administratif (`/admin`, `/admin/participants`, `/admin/participants/[id]`, `/api/admin/*`) dilindungi oleh middleware verifikasi sesi server.
- Sesi dikelola melalui HTTP-only secure cookie dengan atribut `SameSite=Lax` dan durasi kedaluwarsa 24 jam.
- Upaya akses tidak sah dialihkan langsung ke `/admin/login` dengan status HTTP 401/403.
- Endpoint ekspor CSV dilindungi secara ketat dan hanya dapat diunduh oleh admin yang telah terautentikasi.

---

## 3. Validasi Input & Pencegahan Serangan Web

- **SQL Injection:** Dicegah secara menyeluruh melalui parameterized queries dan ORM/Supabase SDK layer.
- **Cross-Site Scripting (XSS):** Dikelola otomatis oleh React JSX escaping dan sanitasi input teks sebelum persistensi.
- **Out-of-Range Scoring Abuse:** Skema Zod menolak payload jawaban jika terdapat nilai di luar integer 1 hingga 5, jika jumlah jawaban kurang atau lebih dari 27, atau jika ID sesi tidak berbentuk format UUID valid.
