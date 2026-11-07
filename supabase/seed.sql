-- Seed Data: 9 Communication Patterns and 27 Assessment Statements
-- Personal Soul Blueprint™ (The Soul of Speaking Indonesia)

INSERT INTO assessment_patterns (pattern_code, pattern_name, indonesian_title, definition, description, action_advice, sort_order)
VALUES
('REACTIVE', 'Reactive Pattern', 'Bereaksi sebelum sadar',
 'Respons spontan saat emosi meningkat dapat membuat jawaban terasa lebih tajam daripada yang dimaksud.',
 'Kecenderungan langsung bereaksi ketika menghadapi kritik, perbedaan pendapat, atau situasi yang memicu emosi.',
 'Memberi jeda, menyadari emosi dan sensasi tubuh, memahami kebutuhan, lalu memilih respons secara sadar.', 1),

('ASSUMPTION', 'Assumption Pattern', 'Menganggap tafsir sebagai fakta',
 'Pola ini berkaitan dengan kecenderungan menyimpulkan maksud orang lain sebelum meminta klarifikasi.',
 'Memperlakukan interpretasi awal seolah-olah sudah pasti benar tanpa mengonfirmasi fakta atau konteks sebenarnya.',
 'Pisahkan fakta dari dugaan, tanyakan maksud secara langsung, dan uji tafsir sebelum mengambil kesimpulan.', 2),

('DEFENSIVE', 'Defensive Pattern', 'Cepat membela diri',
 'Pola ini berkaitan dengan respons membela diri saat menerima kritik atau masukan.',
 'Cenderung langsung menjelaskan alasan, mencari pembenaran, atau menyalahkan pihak lain sebelum mendengarkan hingga tuntas.',
 'Dengarkan sampai selesai, minta contoh yang spesifik, lalu pilah bagian masukan yang relevan sebelum menjelaskan posisi sendiri.', 3),

('AVOIDANCE', 'Avoidance Pattern', 'Menghindari percakapan sulit',
 'Pola ini berkaitan dengan menunda, diam, mengganti topik, atau berharap masalah selesai sendiri.',
 'Menghindari ketegangan langsung karena merasa tidak nyaman atau cemas akan risiko konflik yang memburuk.',
 'Pilih waktu yang cukup aman, sepakati waktu bicara yang jelas, dan mulai dari satu isu yang spesifik.', 4),

('PEOPLE_PLEASING', 'People-Pleasing Pattern', 'Menyenangkan orang dengan mengabaikan kebutuhan diri',
 'Pola ini berkaitan dengan menyetujui permintaan meskipun keberatan, sulit mengatakan tidak, atau berharap orang lain memahami kebutuhan tanpa disampaikan.',
 'Mengutamakan kenyamanan orang lain demi mendapatkan persetujuan atau menghindari penolakan, meski harus mengorbankan batasan pribadi.',
 'Kenali kebutuhan diri, tunda jawaban otomatis, lalu nyatakan batas dengan jelas, tegas, dan hormat.', 5),

('CONTROL', 'Control Pattern', 'Membutuhkan cara sendiri',
 'Pola ini berkaitan dengan kesulitan menerima cara berbeda atau kebutuhan mengarahkan proses.',
 'Dorongan kuat untuk mengatur detail cara kerja atau keputusan agar berjalan persis sesuai standar pribadi.',
 'Sepakati tujuan dan standar hasil yang penting, lalu beri ruang dan kepercayaan bagi cara orang lain selama standar tercapai.', 6),

('JUDGMENT', 'Judgment Pattern', 'Cepat menilai',
 'Pola ini berkaitan dengan kecenderungan memberi label atau menilai sebelum memahami konteks.',
 'Mudah melabeli kekurangan atau kepribadian seseorang saat perilakunya tidak sesuai dengan ekspektasi atau nilai kita.',
 'Deskripsikan perilaku yang terlihat secara faktual, tunda label, eksplorasi konteks, dan jelaskan dampaknya tanpa menyerang pribadi.', 7),

('LISTENING_GAP', 'Listening Gap Pattern', 'Mendengar untuk membalas, bukan memahami',
 'Pola ini berkaitan dengan menyiapkan jawaban saat orang lain berbicara, menyela, atau baru menyadari salah paham setelah percakapan berlanjut.',
 'Fokus perhatian terserap untuk menyusun argumen atau membantah ketimbang menangkap pesan emosi lawan bicara secara utuh.',
 'Fokuskan perhatian penuh, latih mendengarkan aktif, refleksikan inti pesan, dan parafrasekan sebelum memberikan tanggapan.', 8),

('ESCALATION', 'Escalation Pattern', 'Konflik makin panas dan sulit diperbaiki',
 'Pola ini berkaitan dengan meningkatnya nada atau intensitas, mengungkit masalah lama, atau kesulitan kembali ke isu utama.',
 'Ketika berselisih, emosi cepat meruncing, perdebatan melebar ke hal masa lalu, dan upaya perbaikan hubungan terasa berat.',
 'Kenali tanda awal eskalasi, sepakati jeda pendinginan, fokus kembali pada satu isu utama, lalu lakukan perbaikan konkret.', 9)
ON CONFLICT (pattern_code) DO UPDATE SET
  pattern_name = EXCLUDED.pattern_name,
  indonesian_title = EXCLUDED.indonesian_title,
  definition = EXCLUDED.definition,
  description = EXCLUDED.description,
  action_advice = EXCLUDED.action_advice,
  sort_order = EXCLUDED.sort_order;

-- Insert 27 Statements
INSERT INTO assessment_items (item_number, question_code, question_text, pattern_code, sort_order)
VALUES
(1, 'Q01', 'Saat merasa diserang atau dikritik, saya cepat membalas sebelum memahami seluruh situasi.', 'REACTIVE', 1),
(2, 'Q02', 'Ketika emosi meningkat, nada bicara atau pilihan kata saya menjadi lebih tajam daripada yang saya maksud.', 'REACTIVE', 2),
(3, 'Q03', 'Setelah percakapan tegang, saya sering menyesali respons spontan saya.', 'REACTIVE', 3),

(4, 'Q04', 'Saya menyimpulkan maksud orang lain tanpa terlebih dahulu meminta klarifikasi.', 'ASSUMPTION', 4),
(5, 'Q05', 'Ketika pesan atau respons seseorang tidak sesuai harapan, saya cepat menganggapnya sebagai tanda tidak peduli atau tidak menghargai.', 'ASSUMPTION', 5),
(6, 'Q06', 'Saya memperlakukan interpretasi pertama saya seolah-olah sudah pasti benar.', 'ASSUMPTION', 6),

(7, 'Q07', 'Saat menerima kritik, saya langsung menjelaskan alasan atau kesalahan pihak lain sebelum mendengarkan sampai selesai.', 'DEFENSIVE', 7),
(8, 'Q08', 'Saya merasa sulit mengakui bagian dari masukan orang lain yang mungkin benar.', 'DEFENSIVE', 8),
(9, 'Q09', 'Saya sering mengalami percakapan umpan balik sebagai pertarungan tentang siapa yang benar.', 'DEFENSIVE', 9),

(10, 'Q10', 'Saya menunda membicarakan masalah penting karena tidak nyaman menghadapi kemungkinan konflik.', 'AVOIDANCE', 10),
(11, 'Q11', 'Saya memilih diam atau mengganti topik meskipun masalah belum terselesaikan.', 'AVOIDANCE', 11),
(12, 'Q12', 'Saya berharap masalah akan hilang sendiri tanpa perlu membahasnya.', 'AVOIDANCE', 12),

(13, 'Q13', 'Saya menyetujui permintaan meskipun sebenarnya tidak bersedia atau tidak mampu.', 'PEOPLE_PLEASING', 13),
(14, 'Q14', 'Saya sulit mengatakan tidak karena takut mengecewakan atau membuat orang lain tidak menyukai saya.', 'PEOPLE_PLEASING', 14),
(15, 'Q15', 'Saya berharap orang lain memahami kebutuhan saya tanpa saya menyampaikannya secara jelas.', 'PEOPLE_PLEASING', 15),

(16, 'Q16', 'Saya sulit menerima cara orang lain yang berbeda meskipun hasil akhirnya mungkin tetap baik.', 'CONTROL', 16),
(17, 'Q17', 'Saya merasa perlu mengarahkan detail pekerjaan atau keputusan yang juga menjadi tanggung jawab orang lain.', 'CONTROL', 17),
(18, 'Q18', 'Saya menjadi lebih tegang ketika hasil atau proses tidak berjalan sesuai rencana saya.', 'CONTROL', 18),

(19, 'Q19', 'Saya cepat memberi label negatif pada orang ketika mereka melakukan kesalahan.', 'JUDGMENT', 19),
(20, 'Q20', 'Saya lebih mudah memperhatikan kekurangan orang daripada mencari konteks perilakunya.', 'JUDGMENT', 20),
(21, 'Q21', 'Saat berbeda pendapat, saya cenderung menganggap perspektif saya lebih masuk akal tanpa mengeksplorasi perspektif lain.', 'JUDGMENT', 21),

(22, 'Q22', 'Saat orang lain berbicara, saya sibuk menyusun jawaban daripada mendengarkan sepenuhnya.', 'LISTENING_GAP', 22),
(23, 'Q23', 'Saya menyela atau menyelesaikan kalimat orang lain sebelum mereka selesai berbicara.', 'LISTENING_GAP', 23),
(24, 'Q24', 'Saya baru menyadari bahwa saya salah memahami pesan setelah percakapan berlanjut atau konflik muncul.', 'LISTENING_GAP', 24),

(25, 'Q25', 'Saat konflik meningkat, saya ikut menaikkan nada atau intensitas respons.', 'ESCALATION', 25),
(26, 'Q26', 'Saya mengungkit masalah lama atau menggunakan kata-kata seperti ''selalu'' dan ''tidak pernah'' ketika berdebat.', 'ESCALATION', 26),
(27, 'Q27', 'Setelah konflik, saya kesulitan kembali membahas masalah utama atau melakukan upaya perbaikan.', 'ESCALATION', 27)
ON CONFLICT (item_number) DO UPDATE SET
  question_code = EXCLUDED.question_code,
  question_text = EXCLUDED.question_text,
  pattern_code = EXCLUDED.pattern_code,
  sort_order = EXCLUDED.sort_order;
