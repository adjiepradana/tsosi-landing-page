# DATABASE SCHEMA & MIGRATION SPECIFICATION
## Personal Soul Blueprint™ — The Soul of Speaking Indonesia

Dokumen ini mendokumentasikan skema database relasional PostgreSQL (Supabase), relasi antar entitas, indeks performa, dan kebijakan Row Level Security (RLS).

---

## 1. Diagram Relasi Entitas (ERD)

```mermaid
erDiagram
    participants ||--o{ assessment_submissions : "submits"
    assessment_patterns ||--o{ assessment_items : "contains"
    assessment_patterns ||--o{ pattern_results : "categorizes"
    assessment_submissions ||--o{ assessment_answers : "records"
    assessment_submissions ||--o{ pattern_results : "produces"
    assessment_submissions ||--o{ participant_reflections : "reflects"
    admin_users ||--o{ audit_logs : "triggers"

    participants {
        UUID id PK
        TEXT full_name
        TEXT email
        TEXT phone
        TIMESTAMPTZ consent_at
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }

    assessment_patterns {
        UUID id PK
        TEXT pattern_code UK
        TEXT pattern_name
        TEXT indonesian_title
        TEXT definition
        TEXT description
        TEXT action_advice
        INTEGER sort_order
    }

    assessment_items {
        UUID id PK
        INTEGER item_number UK
        TEXT question_code UK
        TEXT question_text
        TEXT pattern_code FK
        INTEGER sort_order
        TEXT assessment_version
    }

    assessment_submissions {
        UUID id PK
        UUID participant_id FK
        TEXT assessment_version
        TEXT scoring_version
        TEXT status
        INTEGER current_step
        TIMESTAMPTZ started_at
        TIMESTAMPTZ submitted_at
        TEXT result_token UK
        TEXT result_token_hash UK
        NUMERIC overall_score
        TEXT overall_category
        TEXT primary_pattern_code FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }

    assessment_answers {
        UUID id PK
        UUID submission_id FK
        INTEGER item_number
        TEXT question_code
        INTEGER answer_value
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }

    pattern_results {
        UUID id PK
        UUID submission_id FK
        TEXT pattern_code FK
        NUMERIC score
        TEXT interpretation_category
        TEXT level
        TEXT interpretation_text
        INTEGER rank
        BOOLEAN is_priority
        TIMESTAMPTZ created_at
    }

    participant_reflections {
        UUID id PK
        UUID submission_id FK
        TEXT pattern_code
        TEXT trigger_situation
        TEXT automatic_thoughts
        TEXT emotions
        TEXT response_taken
        TEXT alternative_response
        TEXT notes
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }

    admin_users {
        UUID id PK
        UUID auth_user_id UK
        TEXT email UK
        TEXT role
        TIMESTAMPTZ created_at
    }

    audit_logs {
        UUID id PK
        UUID admin_user_id FK
        TEXT action
        TEXT entity_type
        TEXT entity_id
        JSONB details
        TEXT ip_address
        TIMESTAMPTZ created_at
    }
```

---

## 2. Definisi Tabel

### 2.1. `participants`
Menyimpan data identitas peserta yang mengikuti asesmen tanpa memerlukan pembuatan akun atau kata sandi.
- `id` (UUID, Primary Key, Default: `uuid_generate_v4()`)
- `full_name` (TEXT, NOT NULL): Nama lengkap peserta.
- `email` (TEXT, NOT NULL, Index): Alamat email aktif.
- `phone` (TEXT, NOT NULL): Nomor telepon/WhatsApp.
- `consent_at` (TIMESTAMPTZ, NOT NULL): Waktu persetujuan pemrosesan data privasi.
- `created_at`, `updated_at` (TIMESTAMPTZ): Jejak waktu.

### 2.2. `assessment_patterns`
Katalog 9 pola komunikasi saat konflik sesuai metodologi The Soul of Speaking Indonesia.
- `pattern_code` (TEXT, Unique): Kode unik (`REACTIVE`, `ASSUMPTION`, `DEFENSIVE`, `AVOIDANCE`, `PEOPLE_PLEASING`, `CONTROL`, `JUDGMENT`, `LISTENING_GAP`, `ESCALATION`).
- `pattern_name` (TEXT): Nama resmi pola.
- `indonesian_title` (TEXT): Judul deskriptif bahasa Indonesia.
- `definition` (TEXT): Definisi metodologis baku.
- `description` (TEXT): Karakteristik perilaku.
- `action_advice` (TEXT): Rekomendasi latihan sadar.
- `sort_order` (INTEGER): Urutan tampilan 1-9.

### 2.3. `assessment_items`
27 butir pernyataan refleksi baku yang dipetakan tepat 3 pernyataan untuk setiap pola.
- `item_number` (INTEGER, Unique): Nomor butir (1-27).
- `question_code` (TEXT, Unique): Kode pernyataan (`Q01` - `Q27`).
- `question_text` (TEXT): Teks pernyataan asli berbahasa Indonesia.
- `pattern_code` (TEXT, Foreign Key): Referensi pola terkait.
- `sort_order` (INTEGER): Urutan penyajian.

### 2.4. `assessment_submissions`
Sesi asesmen peserta dari status pengisian hingga selesai dinilai.
- `id` (UUID, Primary Key)
- `participant_id` (UUID, Foreign Key)
- `status` (TEXT): `'in_progress'`, `'completed'`, `'abandoned'`.
- `current_step` (INTEGER): Langkah pertanyaan aktif (1-27).
- `result_token` (TEXT, Unique): Token akses acak untuk peserta.
- `result_token_hash` (TEXT, Unique, Index): SHA-256 hash dari token.
- `overall_score` (NUMERIC(4,2)): Nilai rata-rata dari 27 item (1.00 - 5.00).
- `overall_category` (TEXT): Label kategori deskriptif keseluruhan.
- `primary_pattern_code` (TEXT, Foreign Key): Pola prioritas urutan pertama.

### 2.5. `assessment_answers`
Penyimpanan jawaban per butir (1-5) dengan constraint unik per sesi dan nomor pertanyaan.
- `submission_id` (UUID, Foreign Key)
- `item_number` (INTEGER, 1-27)
- `answer_value` (INTEGER, Range: 1 - 5)

### 2.6. `pattern_results`
Hasil kalkulasi skor masing-masing pola untuk setiap sesi pengisian.
- `submission_id` (UUID, Foreign Key)
- `pattern_code` (TEXT, Foreign Key)
- `score` (NUMERIC(4,2)): Nilai rata-rata 3 item pola.
- `interpretation_category` (TEXT): Rentang kategori deskriptif.
- `level` (TEXT): `'RENDAH'`, `'SEDANG'`, atau `'TINGGI'`.
- `rank` (INTEGER): Peringkat pola (1-9).
- `is_priority` (BOOLEAN): Status apakah termasuk prioritas refleksi utama.

### 2.7. `participant_reflections`
Catatan refleksi terstruktur pasca-asesmen (pemicu, pikiran, emosi, respons alternatif).

---

## 3. Kebijakan Row Level Security (RLS)

- **assessment_patterns & assessment_items:** Publik dapat membaca (`SELECT USING (true)`). Modifikasi dibatasi hanya untuk Superadmin.
- **participants & assessment_submissions:** Partisipan hanya dapat mengakses data miliknya melalui endpoint server yang memverifikasi token hash secara terisolasi. Partisipan tidak dapat melakukan query langsung untuk melihat partisipan lain.
- **Admin Access:** Hak akses penuh diberikan hanya jika `auth.uid()` terdaftar pada tabel `admin_users`.
