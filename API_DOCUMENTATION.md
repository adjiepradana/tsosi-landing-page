# API & SERVER ACTIONS SPECIFICATION
## Personal Soul Blueprint™ — The Soul of Speaking Indonesia

Dokumen ini mendokumentasikan antarmuka endpoint API publik dan administratif yang tersedia pada platform.

---

## 1. Public Assessment Endpoints

### 1.1. Inisiasi Sesi Asesmen (`POST /api/assessment/start`)
Mendaftarkan data dasar partisipan dan menghasilkan ID sesi asesmen serta token rahasia hasil.

- **Request Body (JSON):**
  ```json
  {
    "fullName": "Irwansyah Asadullah",
    "email": "irwansyah@example.com",
    "phone": "081234567890",
    "consent": true
  }
  ```
- **Response Success (200 OK):**
  ```json
  {
    "success": true,
    "submissionId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "resultToken": "3f8a9e102bc4819d0e12...",
    "redirectUrl": "/assessment/instructions?sid=f47ac10b-58cc-4372-a567-0e02b2c3d479"
  }
  ```
- **Error Response (400 Bad Request):**
  ```json
  {
    "success": false,
    "errors": {
      "email": ["Format alamat email tidak valid"]
    },
    "message": "Data peserta tidak valid."
  }
  ```

---

### 1.2. Simpan Progres / Autosave (`POST /api/assessment/save-progress`)
Menyimpan draft jawaban secara asinkron saat partisipan berpindah antar pertanyaan.

- **Request Body (JSON):**
  ```json
  {
    "submissionId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "answers": {
      "1": 3,
      "2": 4,
      "3": 2
    },
    "currentStep": 4
  }
  ```
- **Response Success (200 OK):**
  ```json
  {
    "success": true
  }
  ```

---

### 1.3. Finalisasi & Submit Asesmen (`POST /api/assessment/submit`)
Memvalidasi kelengkapan 27 butir pertanyaan, menjalankan kalkulasi mesin skoring resmi di sisi server, dan menerbitkan laporan hasil.

- **Request Body (JSON):**
  ```json
  {
    "submissionId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "answers": {
      "1": 3, "2": 3, "3": 3, "4": 2, "5": 2, "6": 3,
      "7": 2, "8": 2, "9": 3, "10": 2, "11": 3, "12": 3,
      "13": 3, "14": 3, "15": 3, "16": 2, "17": 3, "18": 3,
      "19": 2, "20": 2, "21": 3, "22": 3, "23": 3, "24": 3,
      "25": 2, "26": 3, "27": 3
    }
  }
  ```
- **Response Success (200 OK):**
  ```json
  {
    "success": true,
    "resultToken": "3f8a9e102bc4819d0e12...",
    "redirectUrl": "/assessment/result/3f8a9e102bc4819d0e12..."
  }
  ```

---

### 1.4. Simpan Lembar Refleksi Personal (`POST /api/assessment/reflection`)
Menyimpan masukan refleksi kualitatif partisipan pasca-melihat laporan hasil.

- **Request Body (JSON):**
  ```json
  {
    "token": "3f8a9e102bc4819d0e12...",
    "triggerSituation": "Ketika dikritik secara mendadak saat rapat...",
    "automaticThoughts": "Mereka tidak menghargai usaha saya...",
    "emotions": "Dada terasa panas, denyut jantung meningkat...",
    "responseTaken": "Langsung memotong dan membela diri...",
    "alternativeResponse": "Menarik nafas 3 detik dan mendengarkan sampai tuntas...",
    "notes": "Latihan jeda hari ke-1"
  }
  ```
- **Response Success (200 OK):**
  ```json
  {
    "success": true,
    "message": "Refleksi diri berhasil disimpan."
  }
  ```

---

## 2. Admin Endpoints

### 2.1. Admin Authentication (`POST /api/admin/login`)
Memverifikasi kredensial staf/fasilitator dan menerbitkan cookie sesi `tsosi_admin_session` (`httpOnly`).

- **Request Body:**
  ```json
  {
    "email": "admin@thesoulofspeaking.id",
    "password": "SoulSpeaking2026!"
  }
  ```
- **Response Success:**
  ```json
  {
    "success": true,
    "redirectUrl": "/admin"
  }
  ```

### 2.2. Admin Logout (`POST /api/admin/logout`)
Menghapus cookie sesi administratif dan mengarahkan kembali ke `/admin/login`.

### 2.3. Ekspor Data CSV (`GET /api/admin/export-csv`)
Mengunduh rekapitulasi data seluruh partisipan yang telah menyelesaikan asesmen dalam format file CSV terenkode UTF-8. Hanya dapat diakses oleh sesi admin aktif (HTTP 401 Unauthorized jika tidak sah).
