import { AssessmentPattern, PatternCode } from "../../types/assessment";

export const ASSESSMENT_PATTERNS: Record<PatternCode, AssessmentPattern> = {
  REACTIVE: {
    code: 'REACTIVE',
    name: 'Reactive Pattern',
    indonesianTitle: 'Bereaksi sebelum sadar',
    definition: 'Respons spontan saat emosi meningkat dapat membuat jawaban terasa lebih tajam daripada yang dimaksud. Latihan yang relevan adalah memberi jeda, menyadari emosi dan sensasi tubuh, memahami kebutuhan, lalu memilih respons.',
    description: 'Kecenderungan langsung bereaksi ketika menghadapi kritik, perbedaan pendapat, atau situasi yang memicu emosi. Perhatian dapat terlalu melekat pada pengalaman emosional dan kebutuhan diri saat itu.',
    actionAdvice: 'Memperkuat regulasi emosi dan kemampuan merespons secara sadar dengan memberi jeda 3-5 detik sebelum berbicara.',
    sortOrder: 1,
    itemNumbers: [1, 2, 3],
    sampleTrigger: 'Merasa diserang, dikritik secara tiba-tiba, atau saat lawan bicara menggunakan nada suara tinggi.',
    impactNote: 'Dapat memicu eskalasi konflik yang cepat dan meninggalkan rasa sesal setelah percakapan selesai.'
  },
  ASSUMPTION: {
    code: 'ASSUMPTION',
    name: 'Assumption Pattern',
    indonesianTitle: 'Menganggap tafsir sebagai fakta',
    definition: 'Pola ini berkaitan dengan kecenderungan menyimpulkan maksud orang lain sebelum meminta klarifikasi. Pisahkan fakta dari dugaan, tanyakan maksud secara langsung, dan uji tafsir sebelum mengambil kesimpulan.',
    description: 'Kecenderungan memperlakukan interpretasi atau dugaan awal sebagai kebenaran mutlak tanpa menguji realitas.',
    actionAdvice: 'Memperluas perspektif, memeriksa bukti objektif, dan mengajukan pertanyaan klarifikasi terbuka sebelum merespons.',
    sortOrder: 2,
    itemNumbers: [4, 5, 6],
    sampleTrigger: 'Pesan teks singkat yang dingin, keterlambatan respons, atau ekspresi wajah yang tampak berbeda dari biasa.',
    impactNote: 'Menimbulkan prasangka dan kesalahpahaman yang sebenarnya tidak ada dalam maksud lawan bicara.'
  },
  DEFENSIVE: {
    code: 'DEFENSIVE',
    name: 'Defensive Pattern',
    indonesianTitle: 'Cepat membela diri',
    definition: 'Pola ini berkaitan dengan respons membela diri saat menerima kritik atau masukan. Dengarkan sampai selesai, minta contoh yang spesifik, lalu pilah bagian masukan yang relevan sebelum menjelaskan posisi sendiri.',
    description: 'Cenderung merasa diserang secara personal saat menerima kritik sehingga terdorong untuk segera membenarkan diri atau menyalahkan orang lain.',
    actionAdvice: 'Mengenali dorongan membela diri, mendengarkan kritik hingga tuntas, meminta contoh konkret, dan mengevaluasi masukan secara objektif.',
    sortOrder: 3,
    itemNumbers: [7, 8, 9],
    sampleTrigger: 'Umpan balik kinerja, koreksi atas kesalahan, atau perbedaan pandangan mengenai tanggung jawab.',
    impactNote: 'Menutup ruang pembelajaran, menghambat perbaikan diri, dan membuat orang lain enggan memberikan masukan jujur.'
  },
  AVOIDANCE: {
    code: 'AVOIDANCE',
    name: 'Avoidance Pattern',
    indonesianTitle: 'Menghindari percakapan sulit',
    definition: 'Pola ini berkaitan dengan menunda, diam, mengganti topik, atau berharap masalah selesai sendiri. Pilih waktu yang cukup aman, sepakati waktu bicara, dan mulai dari satu isu yang spesifik.',
    description: 'Kecenderungan menarik diri atau menunda perbincangan krusial demi menghindari rasa tidak nyaman atau risiko konfrontasi.',
    actionAdvice: 'Membedakan jeda sehat dari penghindaran pasif serta menetapkan waktu yang jelas untuk melanjutkan percakapan.',
    sortOrder: 4,
    itemNumbers: [10, 11, 12],
    sampleTrigger: 'Isu sensitif terkait perasaan, perbedaan prinsip mendalam, atau ketidaksesuaian ekspektasi yang menumpuk.',
    impactNote: 'Masalah tidak kunjung terselesaikan, menimbulkan ketegangan tersembunyi (resentment) di bawah permukaan.'
  },
  PEOPLE_PLEASING: {
    code: 'PEOPLE_PLEASING',
    name: 'People-Pleasing Pattern',
    indonesianTitle: 'Menyenangkan orang dengan mengabaikan kebutuhan diri',
    definition: 'Pola ini berkaitan dengan menyetujui permintaan meskipun keberatan, sulit mengatakan tidak, atau berharap orang lain memahami kebutuhan tanpa disampaikan. Kenali kebutuhan, tunda jawaban otomatis, lalu nyatakan batas dengan hormat.',
    description: 'Kecenderungan mengutamakan kenyamanan dan persetujuan orang lain di atas kebutuhan atau batasan diri sendiri.',
    actionAdvice: 'Mengenali kebutuhan diri sendiri, memperkuat batas sehat (healthy boundaries), dan berlatih mengatakan tidak secara tegas serta hormat.',
    sortOrder: 5,
    itemNumbers: [13, 14, 15],
    sampleTrigger: 'Permintaan bantuan mendadak, figur otoritas yang meminta sesuatu, atau ketakutan akan penolakan sosial.',
    impactNote: 'Kelelahan mental (burnout), hilangnya jati diri, dan kekecewaan terpendam karena merasa tidak dihargai.'
  },
  CONTROL: {
    code: 'CONTROL',
    name: 'Control Pattern',
    indonesianTitle: 'Membutuhkan cara sendiri',
    definition: 'Pola ini berkaitan dengan kesulitan menerima cara berbeda atau kebutuhan mengarahkan proses. Sepakati hasil yang memang penting, lalu beri ruang bagi cara lain selama hasil dan standar utama tetap terjaga.',
    description: 'Dorongan kuat untuk memastikan semua proses dan langkah berjalan sesuai ekspektasi serta standar pribadi.',
    actionAdvice: 'Menyepakati tujuan akhir dan standar hasil utama, lalu memberikan fleksibilitas dan kepercayaan atas cara orang lain mencapainya.',
    sortOrder: 6,
    itemNumbers: [16, 17, 18],
    sampleTrigger: 'Tugas kelompok/tim yang lambat, pembagian peran kerja yang tidak jelas, atau metode kerja rekan yang tidak lazim.',
    impactNote: 'Menciptakan iklim kerja yang mencekik (micromanagement) dan membatasi kreativitas serta inisiatif rekan bicara.'
  },
  JUDGMENT: {
    code: 'JUDGMENT',
    name: 'Judgment Pattern',
    indonesianTitle: 'Cepat menilai',
    definition: 'Pola ini berkaitan dengan kecenderungan memberi label atau menilai sebelum memahami konteks. Deskripsikan perilaku yang terlihat, tunda label, cari konteks, dan jelaskan dampak tanpa menyerang pribadi.',
    description: 'Kecenderungan melabeli secara negatif atau menyederhanakan karakter seseorang saat mereka melakukan kesalahan.',
    actionAdvice: 'Menunda pemberian kesimpulan, mengeksplorasi konteks situasional, dan menilai perilaku spesifik tanpa menyerang identitas individu.',
    sortOrder: 7,
    itemNumbers: [19, 20, 21],
    sampleTrigger: 'Ketidaksesuaian hasil kerja orang lain, keterlambatan, atau perilaku yang bertentangan dengan standar moral pribadi.',
    impactNote: 'Membuat lawan bicara merasa dihakimi, defensif, dan merusak rasa percaya dalam relasi.'
  },
  LISTENING_GAP: {
    code: 'LISTENING_GAP',
    name: 'Listening Gap Pattern',
    indonesianTitle: 'Mendengar untuk membalas, bukan memahami',
    definition: 'Pola ini berkaitan dengan menyiapkan jawaban saat orang lain berbicara, menyela, atau baru menyadari salah paham setelah percakapan berlanjut. Fokuskan perhatian, refleksikan inti pesan, dan parafrasekan sebelum menanggapi.',
    description: 'Fokus perhatian lebih terserap oleh pikiran internal atau persiapan argumen balasan daripada menyimak pesan lawan bicara secara utuh.',
    actionAdvice: 'Melatih mendengarkan secara aktif, menahan dorongan menyela, melakukan parafrasa, dan mengonfirmasi pemahaman sebelum menanggapi.',
    sortOrder: 8,
    itemNumbers: [22, 23, 24],
    sampleTrigger: 'Diskusi yang cepat, perdebatan argumen, atau saat memiliki sudut pandang yang sangat diyakini.',
    impactNote: 'Pesan esensial terlewatkan, lawan bicara merasa diabaikan, dan kesalahpahaman berulang kali terjadi.'
  },
  ESCALATION: {
    code: 'ESCALATION',
    name: 'Escalation Pattern',
    indonesianTitle: 'Konflik makin panas dan sulit diperbaiki',
    definition: 'Pola ini berkaitan dengan meningkatnya nada atau intensitas, mengungkit masalah lama, atau kesulitan kembali ke isu utama. Kenali tanda eskalasi, sepakati jeda, bahas satu isu, lalu lakukan langkah perbaikan konkret.',
    description: 'Kecenderungan menaikkan intensitas perdebatan, memperlebar masalah ke isu-isu lampau, dan kesulitan melakukan rekonsiliasi.',
    actionAdvice: 'Mengenali tanda awal naiknya tensi, menyepakati waktu jeda (time-out), fokus ketat pada satu topik, dan segera melakukan perbaikan nyata.',
    sortOrder: 9,
    itemNumbers: [25, 26, 27],
    sampleTrigger: 'Perdebatan berulang tentang hal yang sama, rasa lelah/stres fisik, atau penggunaan kata mutlak ("selalu", "tidak pernah").',
    impactNote: 'Kerusakan hubungan jangka panjang, polarisasi tajam, dan luka emosional yang sulit dipulihkan.'
  }
};

export const PATTERNS_LIST: AssessmentPattern[] = Object.values(ASSESSMENT_PATTERNS).sort(
  (a, b) => a.sortOrder - b.sortOrder
);
