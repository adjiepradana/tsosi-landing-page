# SCORING ENGINE & INTERPRETATION SPECIFICATION
## Personal Soul Blueprint™ — The Soul of Speaking Indonesia

Dokumen ini mendokumentasikan metodologi matematis, aturan pembagian bobot pernyataan, pemetaan pola, dan ambang batas interpretasi yang digunakan dalam kalkulasi authoritative skoring.

---

## 1. Arsitektur Butir & Skala Likert

- **Jumlah Butir Pernyataan:** Tepat 27 pernyataan asli tanpa perubahan teks.
- **Jumlah Pola Komunikasi:** Tepat 9 pola komunikasi saat konflik.
- **Rasio Butir per Pola:** $27 / 9 = 3$ butir pernyataan untuk setiap pola.
- **Skala Jawaban:** Skala Likert seragam 1 hingga 5:
  - **1:** Hampir Tidak Pernah
  - **2:** Jarang
  - **3:** Kadang-kadang
  - **4:** Sering
  - **5:** Hampir Selalu

---

## 2. Pemetaan Pernyataan ke Pola (Item-to-Pattern Mapping)

| Kode Pola | Nama Pola | Judul Indonesia | Nomor Item Asli |
|---|---|---|---|
| `REACTIVE` | Reactive Pattern | Bereaksi sebelum sadar | Q01, Q02, Q03 |
| `ASSUMPTION` | Assumption Pattern | Menganggap tafsir sebagai fakta | Q04, Q05, Q06 |
| `DEFENSIVE` | Defensive Pattern | Cepat membela diri | Q07, Q08, Q09 |
| `AVOIDANCE` | Avoidance Pattern | Menghindari percakapan sulit | Q10, Q11, Q12 |
| `PEOPLE_PLEASING` | People-Pleasing Pattern | Menyenangkan orang dengan mengabaikan kebutuhan diri | Q13, Q14, Q15 |
| `CONTROL` | Control Pattern | Membutuhkan cara sendiri | Q16, Q17, Q18 |
| `JUDGMENT` | Judgment Pattern | Cepat menilai | Q19, Q20, Q21 |
| `LISTENING_GAP` | Listening Gap Pattern | Mendengar untuk membalas, bukan memahami | Q22, Q23, Q24 |
| `ESCALATION` | Escalation Pattern | Konflik makin panas dan sulit diperbaiki | Q25, Q26, Q27 |

---

## 3. Rumus Kalkulasi Matematis (Mathematical Formulas)

### 3.1. Skor Pola Komunikasi ($\text{Pattern Score}$)
Skor masing-masing pola dihitung dengan menjumlahkan nilai 3 item pernyataan terkait, lalu membaginya dengan 3. Hasil dibulatkan ke dua angka di belakang koma (2 decimal places).

$$\text{Pattern Score}_p = \frac{\sum_{i \in \text{Items}_p} \text{Answer}_i}{3}$$

*Contoh (Irwansyah Asadullah - Reactive Pattern):*  
$$\text{Items}: Q01 = 3, Q02 = 3, Q03 = 3 \implies \frac{3 + 3 + 3}{3} = 3.00$$

*Contoh (Irwansyah Asadullah - Assumption Pattern):*  
$$\text{Items}: Q04 = 2, Q05 = 2, Q06 = 3 \implies \frac{2 + 2 + 3}{3} = \frac{7}{3} = 2.33$$

---

### 3.2. Skor Rata-rata Keseluruhan ($\text{Overall Score}$)
Skor keseluruhan dihitung dari akumulasi jumlah total 27 jawaban dibagi 27. Hasil dibulatkan ke dua angka di belakang koma.

$$\text{Overall Score} = \frac{\sum_{i=1}^{27} \text{Answer}_i}{27}$$

*Contoh (Irwansyah Asadullah):*  
$$\sum_{i=1}^{27} \text{Answer}_i = 72 \implies \frac{72}{27} = 2.6666... \approx 2.67$$

*Contoh (Sani Gunawan):*  
$$\sum_{i=1}^{27} \text{Answer}_i = 65 \implies \frac{65}{27} = 2.4074... \approx 2.41$$

---

## 4. Kategori Deskriptif & Ambang Batas (Rating Ranges)

Sesuai dokumen metodologi resmi hasil asesmen responden, rentang nilai rating dikelompokkan ke dalam 5 kategori deskriptif interval:

| Rentang Skor | Kategori Deskriptif | Karakteristik Perilaku |
|---|---|---|
| **< 1.80** | **Hampir tidak pernah** | Perilaku terkait relatif jarang atau hampir tidak pernah muncul menurut jawaban responden. Menjadi kekuatan komunikasi yang stabil. |
| **1.80 – 2.59** | **Jarang dilaporkan** | Pola dapat muncul sesekali, tetapi bukan kecenderungan yang paling menonjol saat menghadapi ketegangan. |
| **2.60 – 3.39** | **Kadang-kadang muncul** | Pola kadang-kadang muncul, biasanya terpicu dalam situasi atau konteks tertentu. |
| **3.40 – 4.19** | **Sering muncul** | Pola kerap menjadi respons otomatis ketika situasi terasa menekan atau berbeda pendapat. |
| **4.20 – 5.00** | **Sangat sering muncul** | Pola merupakan reaksi spontan dominan utama yang memerlukan perhatian dan latihan regulasi sadar prioritas tinggi. |

---

## 5. Klasifikasi Level "Arti Skor Bagi Anda"

Di samping kategori deskriptif matematis, setiap pola diinterpretasikan melalui 3 jenjang kedalaman refleksi:
- **RENDAH ($\text{Skor} < 1.80$):** Menunjukkan kapasitas pengendalian diri yang matang, menjadi kekuatan alami dalam hubungan interpersonal.
- **SEDANG ($1.80 \le \text{Skor} < 3.00$):** Menunjukkan bahwa pola masih terkendali pada situasi umum, namun rentan terpicu saat emosi memuncak atau situasi dirasa sensitif.
- **TINGGI ($\text{Skor} \ge 3.00$):** Menunjukkan bahwa pola menjadi kecenderungan respons otomatis utama. Peserta disarankan memberi perhatian prioritas pada latihan jeda sadar dan regulasi emosi terkait pola ini.

---

## 6. Aturan Perangkingan & Tie-Breaking

1. Pola diurutkan menurun berdasarkan skor rata-rata tertinggi ($\text{Rank 1} = \text{Skor Tertinggi}$).
2. Jika dua atau lebih pola memiliki skor yang sama persis (*tie*), sistem menerapkan aturan deterministik berdasarkan urutan baku metodologis (`sortOrder` 1 hingga 9).
3. **Pola Prioritas Utama (Top Priorities):** 1 hingga 3 pola dengan peringkat tertinggi yang memiliki skor $\ge 2.60$ dikelompokkan sebagai fokus utama pengembangan pribadi.
