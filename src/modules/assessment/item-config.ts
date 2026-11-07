import { AssessmentItem } from "../../types/assessment";

export const LIKERT_OPTIONS = [
  { value: 1, label: "Hampir Tidak Pernah", shortLabel: "1", description: "Sangat jarang atau tidak pernah saya lakukan" },
  { value: 2, label: "Jarang", shortLabel: "2", description: "Hanya sesekali dalam situasi tertentu" },
  { value: 3, label: "Kadang-kadang", shortLabel: "3", description: "Cukup sering muncul dalam keadaan tertentu" },
  { value: 4, label: "Sering", shortLabel: "4", description: "Kerap menjadi reaksi saya saat situasi menegang" },
  { value: 5, label: "Hampir Selalu", shortLabel: "5", description: "Sangat khas dan menjadi respons spontan utama saya" },
];

export const ASSESSMENT_ITEMS: AssessmentItem[] = [
  // Reactive Pattern (Q01 - Q03)
  {
    itemNumber: 1,
    questionCode: "Q01",
    questionText: "Saat merasa diserang atau dikritik, saya cepat membalas sebelum memahami seluruh situasi.",
    patternCode: "REACTIVE",
    sortOrder: 1,
  },
  {
    itemNumber: 2,
    questionCode: "Q02",
    questionText: "Ketika emosi meningkat, nada bicara atau pilihan kata saya menjadi lebih tajam daripada yang saya maksud.",
    patternCode: "REACTIVE",
    sortOrder: 2,
  },
  {
    itemNumber: 3,
    questionCode: "Q03",
    questionText: "Setelah percakapan tegang, saya sering menyesali respons spontan saya.",
    patternCode: "REACTIVE",
    sortOrder: 3,
  },

  // Assumption Pattern (Q04 - Q06)
  {
    itemNumber: 4,
    questionCode: "Q04",
    questionText: "Saya menyimpulkan maksud orang lain tanpa terlebih dahulu meminta klarifikasi.",
    patternCode: "ASSUMPTION",
    sortOrder: 4,
  },
  {
    itemNumber: 5,
    questionCode: "Q05",
    questionText: "Ketika pesan atau respons seseorang tidak sesuai harapan, saya cepat menganggapnya sebagai tanda tidak peduli atau tidak menghargai.",
    patternCode: "ASSUMPTION",
    sortOrder: 5,
  },
  {
    itemNumber: 6,
    questionCode: "Q06",
    questionText: "Saya memperlakukan interpretasi pertama saya seolah-olah sudah pasti benar.",
    patternCode: "ASSUMPTION",
    sortOrder: 6,
  },

  // Defensive Pattern (Q07 - Q09)
  {
    itemNumber: 7,
    questionCode: "Q07",
    questionText: "Saat menerima kritik, saya langsung menjelaskan alasan atau kesalahan pihak lain sebelum mendengarkan sampai selesai.",
    patternCode: "DEFENSIVE",
    sortOrder: 7,
  },
  {
    itemNumber: 8,
    questionCode: "Q08",
    questionText: "Saya merasa sulit mengakui bagian dari masukan orang lain yang mungkin benar.",
    patternCode: "DEFENSIVE",
    sortOrder: 8,
  },
  {
    itemNumber: 9,
    questionCode: "Q09",
    questionText: "Saya sering mengalami percakapan umpan balik sebagai pertarungan tentang siapa yang benar.",
    patternCode: "DEFENSIVE",
    sortOrder: 9,
  },

  // Avoidance Pattern (Q10 - Q12)
  {
    itemNumber: 10,
    questionCode: "Q10",
    questionText: "Saya menunda membicarakan masalah penting karena tidak nyaman menghadapi kemungkinan konflik.",
    patternCode: "AVOIDANCE",
    sortOrder: 10,
  },
  {
    itemNumber: 11,
    questionCode: "Q11",
    questionText: "Saya memilih diam atau mengganti topik meskipun masalah belum terselesaikan.",
    patternCode: "AVOIDANCE",
    sortOrder: 11,
  },
  {
    itemNumber: 12,
    questionCode: "Q12",
    questionText: "Saya berharap masalah akan hilang sendiri tanpa perlu membahasnya.",
    patternCode: "AVOIDANCE",
    sortOrder: 12,
  },

  // People-Pleasing Pattern (Q13 - Q15)
  {
    itemNumber: 13,
    questionCode: "Q13",
    questionText: "Saya menyetujui permintaan meskipun sebenarnya tidak bersedia atau tidak mampu.",
    patternCode: "PEOPLE_PLEASING",
    sortOrder: 13,
  },
  {
    itemNumber: 14,
    questionCode: "Q14",
    questionText: "Saya sulit mengatakan tidak karena takut mengecewakan atau membuat orang lain tidak menyukai saya.",
    patternCode: "PEOPLE_PLEASING",
    sortOrder: 14,
  },
  {
    itemNumber: 15,
    questionCode: "Q15",
    questionText: "Saya berharap orang lain memahami kebutuhan saya tanpa saya menyampaikannya secara jelas.",
    patternCode: "PEOPLE_PLEASING",
    sortOrder: 15,
  },

  // Control Pattern (Q16 - Q18)
  {
    itemNumber: 16,
    questionCode: "Q16",
    questionText: "Saya sulit menerima cara orang lain yang berbeda meskipun hasil akhirnya mungkin tetap baik.",
    patternCode: "CONTROL",
    sortOrder: 16,
  },
  {
    itemNumber: 17,
    questionCode: "Q17",
    questionText: "Saya merasa perlu mengarahkan detail pekerjaan atau keputusan yang juga menjadi tanggung jawab orang lain.",
    patternCode: "CONTROL",
    sortOrder: 17,
  },
  {
    itemNumber: 18,
    questionCode: "Q18",
    questionText: "Saya menjadi lebih tegang ketika hasil atau proses tidak berjalan sesuai rencana saya.",
    patternCode: "CONTROL",
    sortOrder: 18,
  },

  // Judgment Pattern (Q19 - Q21)
  {
    itemNumber: 19,
    questionCode: "Q19",
    questionText: "Saya cepat memberi label negatif pada orang ketika mereka melakukan kesalahan.",
    patternCode: "JUDGMENT",
    sortOrder: 19,
  },
  {
    itemNumber: 20,
    questionCode: "Q20",
    questionText: "Saya lebih mudah memperhatikan kekurangan orang daripada mencari konteks perilakunya.",
    patternCode: "JUDGMENT",
    sortOrder: 20,
  },
  {
    itemNumber: 21,
    questionCode: "Q21",
    questionText: "Saat berbeda pendapat, saya cenderung menganggap perspektif saya lebih masuk akal tanpa mengeksplorasi perspektif lain.",
    patternCode: "JUDGMENT",
    sortOrder: 21,
  },

  // Listening Gap Pattern (Q22 - Q24)
  {
    itemNumber: 22,
    questionCode: "Q22",
    questionText: "Saat orang lain berbicara, saya sibuk menyusun jawaban daripada mendengarkan sepenuhnya.",
    patternCode: "LISTENING_GAP",
    sortOrder: 22,
  },
  {
    itemNumber: 23,
    questionCode: "Q23",
    questionText: "Saya menyela atau menyelesaikan kalimat orang lain sebelum mereka selesai berbicara.",
    patternCode: "LISTENING_GAP",
    sortOrder: 23,
  },
  {
    itemNumber: 24,
    questionCode: "Q24",
    questionText: "Saya baru menyadari bahwa saya salah memahami pesan setelah percakapan berlanjut atau konflik muncul.",
    patternCode: "LISTENING_GAP",
    sortOrder: 24,
  },

  // Escalation Pattern (Q25 - Q27)
  {
    itemNumber: 25,
    questionCode: "Q25",
    questionText: "Saat konflik meningkat, saya ikut menaikkan nada atau intensitas respons.",
    patternCode: "ESCALATION",
    sortOrder: 25,
  },
  {
    itemNumber: 26,
    questionCode: "Q26",
    questionText: "Saya mengungkit masalah lama atau menggunakan kata-kata seperti 'selalu' dan 'tidak pernah' ketika berdebat.",
    patternCode: "ESCALATION",
    sortOrder: 26,
  },
  {
    itemNumber: 27,
    questionCode: "Q27",
    questionText: "Setelah konflik, saya kesulitan kembali membahas masalah utama atau melakukan upaya perbaikan.",
    patternCode: "ESCALATION",
    sortOrder: 27,
  },
];
