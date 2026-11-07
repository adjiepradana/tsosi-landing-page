import { InterpretationLevel, PatternCode, RatingCategory } from "../../types/assessment";
import { ASSESSMENT_PATTERNS } from "./pattern-config";

export interface PatternNarrative {
  definition: string;
  categoryRangeDescription: string;
  level: InterpretationLevel;
  interpretationText: string;
  actionAdvice: string;
  reflectionQuestions: string[];
}

export function getCategoryFromScore(score: number): {
  category: RatingCategory;
  rangeDescription: string;
} {
  if (score < 1.8) {
    return {
      category: "Hampir tidak pernah",
      rangeDescription:
        "Skor di bawah 1,80 menunjukkan pola hampir tidak pernah dilaporkan; perilaku terkait relatif jarang muncul menurut jawaban responden.",
    };
  } else if (score < 2.6) {
    return {
      category: "Jarang dilaporkan",
      rangeDescription:
        "Rentang 1,80–2,59 menunjukkan pola jarang dilaporkan; pola dapat muncul sesekali, tetapi bukan kecenderungan yang paling menonjol.",
    };
  } else if (score < 3.4) {
    return {
      category: "Kadang-kadang muncul",
      rangeDescription:
        "Rentang 2,60–3,39 menunjukkan pola kadang-kadang muncul, biasanya dalam situasi atau konteks tertentu.",
    };
  } else if (score < 4.2) {
    return {
      category: "Sering muncul",
      rangeDescription:
        "Rentang 3,40–4,19 menunjukkan pola sering muncul, menjadi kecenderungan respons yang cukup konsisten saat situasi menegang.",
    };
  } else {
    return {
      category: "Sangat sering muncul",
      rangeDescription:
        "Rentang 4,20–5,00 menunjukkan pola sangat sering muncul, menjadi pola reaksi spontan dominan yang memerlukan perhatian sadar.",
    };
  }
}

export function getLevelFromScore(score: number): InterpretationLevel {
  if (score < 1.8) return "RENDAH";
  if (score >= 3.0) return "TINGGI";
  return "SEDANG";
}

export const PATTERN_INTERPRETATIONS: Record<
  PatternCode,
  Record<InterpretationLevel, { text: string; reflectionQuestions: string[] }>
> = {
  REACTIVE: {
    TINGGI: {
      text: "TINGGI — Individu cenderung langsung bereaksi ketika menghadapi kritik, perbedaan pendapat, atau situasi yang memicu emosi. Perhatian dapat terlalu melekat pada pengalaman emosional dan kebutuhan diri saat itu. Secara perilaku, hal ini dapat terlihat melalui respons tergesa-gesa, nada bicara yang meningkat, atau perkataan yang kemudian disesali. Individu mungkin belum konsisten mengenali jeda antara munculnya emosi dan tindakan yang dipilih. Pengembangan utama adalah memperkuat regulasi emosi dan kemampuan merespons secara sadar.",
      reflectionQuestions: [
        "Sensasi fisik apa (detak jantung berdebar, dada sesak, nafas memburu) yang biasanya mendahului reaksi spontan saya?",
        "Apa kalimat atau reaksi yang sering saya sesali setelah ketegangan emosi mereda?",
        "Bagaimana saya bisa mengambil jeda 3 detik sebelum memberikan kalimat balasan?",
      ],
    },
    SEDANG: {
      text: "SEDANG — Individu umumnya mampu mengendalikan respons spontan, meskipun dalam situasi tertentu masih dapat bereaksi secara emosional ketika kritik atau perbedaan pendapat memicu emosi. Jeda sadar membantu memilih respons yang lebih tepat. Pengembangan utama adalah mempertahankan jeda sebelum merespons dan mengenali pemicu emosi personal.",
      reflectionQuestions: [
        "Dalam kondisi pemicu seperti apa saya paling rentan kehilangan jeda tenang?",
        "Bagaimana saya dapat memperpanjang ruang jeda saat emosi mulai merayap naik?",
      ],
    },
    RENDAH: {
      text: "RENDAH — Individu memiliki ketenangan alami dan kemampuan meregulasi respons spontan dengan sangat baik. Kemampuan memberi jeda sebelum merespons merupakan kekuatan komunikasi yang matang dan perlu terus dipertahankan.",
      reflectionQuestions: [
        "Bagaimana ketenangan emosi saya membantu menciptakan rasa aman bagi orang lain di tengah konflik?",
      ],
    },
  },
  ASSUMPTION: {
    TINGGI: {
      text: "TINGGI — Individu cenderung memperlakukan interpretasi atau dugaan awal sebagai fakta objektif, terutama saat pesan yang diterima terasa ambigu atau tidak sesuai ekspektasi. Hal ini dapat menimbulkan rasa tidak dihargai yang sebenarnya belum tentu dimaksudkan oleh pihak lain. Pengembangan utama adalah memeriksa fakta, meminta klarifikasi terbuka, dan memisahkan tafsiran dari realitas sebelum menarik kesimpulan.",
      reflectionQuestions: [
        "Kapan terakhir kali dugaan atau kecurigaan saya ternyata keliru setelah mendapatkan penjelasan utuh?",
        "Pertanyaan klarifikasi seperti apa yang bisa saya ajukan daripada langsung menyimpulkan?",
      ],
    },
    SEDANG: {
      text: "SEDANG — Individu umumnya mampu mempertimbangkan informasi sebelum menyimpulkan maksud orang lain. Namun, dalam situasi ambigu atau sensitif, asumsi masih dapat muncul. Pengembangan utama adalah meningkatkan kebiasaan meminta klarifikasi dan membedakan fakta dari interpretasi pribadi.",
      reflectionQuestions: [
        "Apakah saya lebih sering mengasumsikan niat buruk atau niat baik ketika pesan orang lain tidak jelas?",
      ],
    },
    RENDAH: {
      text: "RENDAH — Individu relatif jarang menyimpulkan maksud orang lain tanpa klarifikasi. Kemampuan memeriksa fakta dan menanyakan maksud secara langsung merupakan modal kekuatan relasi yang sangat sehat.",
      reflectionQuestions: [
        "Bagaimana kebiasaan klarifikasi saya membantu mencairkan potensi prasangka antarpihak?",
      ],
    },
  },
  DEFENSIVE: {
    TINGGI: {
      text: "TINGGI — Individu sangat cepat merasa diserang saat menerima kritik sehingga terdorong untuk segera membela diri, menjelaskan alasan, atau menyalahkan orang lain. Kebutuhan untuk membuktikan diri benar dapat mengaburkan substansi masukan berharga. Pengembangan utama adalah mengenali dorongan defensif, mendengarkan kritik hingga tuntas tanpa memotong, dan mengevaluasi isi masukan secara objektif.",
      reflectionQuestions: [
        "Apa ketakutan terdalam saya saat seseorang menyampaikan kelemahan atau kesalahan saya?",
        "Bagaimana saya bisa melihat kritik sebagai data perbaikan tanpa merasa nilai diri saya terancam?",
      ],
    },
    SEDANG: {
      text: "SEDANG — Individu dapat menerima masukan dalam situasi yang dirasakan aman, tetapi cenderung defensif ketika kritik disampaikan keras atau menyentuh hal sensitif. Kapasitas refleksi ada, tetapi keterbukaan dapat menurun ketika merasa disalahkan. Pengembangan utama adalah mengenali respons defensif, meminta contoh spesifik, dan mengevaluasi masukan secara objektif.",
      reflectionQuestions: [
        "Bagian mana dari masukan orang lain yang sering kali sulit saya akui meskipun sebagian ada benarnya?",
      ],
    },
    RENDAH: {
      text: "RENDAH — Individu cenderung terbuka dalam menerima kritik dan masukan tanpa langsung menganggapnya sebagai serangan pribadi. Kemampuan mendengarkan dan mengevaluasi masukan menjadi kekuatan yang perlu dipertahankan agar proses komunikasi tetap konstruktif.",
      reflectionQuestions: [
        "Bagaimana keterbukaan saya terhadap masukan menjadi teladan positif bagi lingkungan sekitar?",
      ],
    },
  },
  AVOIDANCE: {
    TINGGI: {
      text: "TINGGI — Individu sangat cenderung menunda, menghindar, atau memilih diam ketika berhadapan dengan kemungkinan konflik. Harapan bahwa masalah akan reda dengan sendirinya sering kali justru menumpuk ketegangan tersembunyi. Pengembangan utama adalah membedakan jeda emosional yang sehat dari penghindaran pasif, serta berani menjadwalkan pembicaraan mendalam secara konstruktif.",
      reflectionQuestions: [
        "Percakapan penting apa yang sedang saya tunda saat ini karena rasa takut atau canggung?",
        "Langkah aman dan bertahap apa yang bisa saya ambil untuk memulai percakapan tersebut?",
      ],
    },
    SEDANG: {
      text: "SEDANG — Individu umumnya mampu menghadapi persoalan tanpa terlalu sering menghindari percakapan sulit. Namun, kecenderungan menunda pembahasan masih dapat muncul ketika situasi dirasakan terlalu tegang atau berisiko. Pengembangan utama adalah membangun keberanian untuk membicarakan masalah secara terbuka dan tepat waktu.",
      reflectionQuestions: [
        "Berapa lama waktu yang wajar saya ambil untuk menenangkan diri sebelum kembali membahas isu krusial?",
      ],
    },
    RENDAH: {
      text: "RENDAH — Individu cenderung bersedia menghadapi persoalan secara langsung dan relatif jarang menghindari percakapan sulit. Sikap berani dan jujur dalam berdiskusi adalah aset berharga dalam kepemimpinan dan relasi.",
      reflectionQuestions: [
        "Bagaimana saya menjaga agar ketegasan menghadapi konflik tidak terasa mengintimidasi orang yang lebih tertutup?",
      ],
    },
  },
  PEOPLE_PLEASING: {
    TINGGI: {
      text: "TINGGI — Individu cenderung mengutamakan kenyamanan dan persetujuan orang lain, bahkan ketika mengabaikan kebutuhan atau pendapat pribadi. Penerimaan eksternal mungkin sangat memengaruhi rasa aman dan penghargaan diri. Hal ini dapat tampak melalui kesulitan menolak permintaan, menyetujui hal yang tidak diinginkan, atau memendam kekecewaan. Pengembangan utama adalah mengenali kebutuhan diri, memperkuat batas sehat, dan berlatih mengatakan tidak secara tegas serta hormat.",
      reflectionQuestions: [
        "Apa yang paling saya takuti akan terjadi jika saya menolak permintaan seseorang yang tidak sesuai kemampuan saya?",
        "Kalimat sopan namun tegas apa yang bisa saya siapkan untuk menyatakan batasan saya?",
      ],
    },
    SEDANG: {
      text: "SEDANG — Individu umumnya mampu mempertimbangkan kebutuhan pribadi ketika berhadapan dengan permintaan orang lain. Namun, dalam situasi tertentu masih dapat muncul kesulitan menolak atau menyampaikan keberatan. Pengembangan utama adalah memperkuat batas pribadi dan mengomunikasikan kebutuhan secara jelas tanpa rasa bersalah berlebih.",
      reflectionQuestions: [
        "Kapan saya merasa paling sering mengorbankan energi demi membuat orang lain senang?",
      ],
    },
    RENDAH: {
      text: "RENDAH — Individu memiliki batasan diri yang kokoh dan sehat. Mampu menimbang kapasitas pribadi secara adil serta tidak bergantung pada persetujuan orang lain untuk merasa berharga.",
      reflectionQuestions: [
        "Bagaimana kejelasan batasan pribadi saya membantu orang lain memahami ekspektasi secara transparan?",
      ],
    },
  },
  CONTROL: {
    TINGGI: {
      text: "TINGGI — Individu cenderung ingin memastikan proses dan hasil berjalan sesuai harapan dan standarnya sendiri. Dorongan ini sering kali berakar dari kepedulian terhadap kualitas, tetapi berisiko membatasi inisiatif orang lain dan menciptakan iklim saling menuntut. Pengembangan utama adalah menyepakati tujuan serta standar hasil di awal, lalu memberikan fleksibilitas dan kepercayaan terhadap metode yang dipilih orang lain.",
      reflectionQuestions: [
        "Hal apa yang paling saya cemaskan jika membiarkan orang lain mengerjakan tugas dengan cara mereka sendiri?",
        "Bagaimana saya bisa melatih rasa percaya (trust) kepada rekan bicara?",
      ],
    },
    SEDANG: {
      text: "SEDANG — Individu umumnya dapat memberi ruang kepada orang lain, tetapi menjadi lebih mengontrol ketika hasil sangat penting, tanggung jawab tidak jelas, atau situasi terasa tidak pasti. Pengembangan utama adalah membangun kepercayaan, menyepakati standar hasil bersama, dan memberikan ruang bagi orang lain untuk menentukan cara kerja.",
      reflectionQuestions: [
        "Di area mana saya bisa mulai melepaskan kendali mikro demi memberdayakan pihak lain?",
      ],
    },
    RENDAH: {
      text: "RENDAH — Individu sangat fleksibel, mudah diajak bekerja sama, dan nyaman menerima perbedaan pendekatan selama tujuan inti tercapai. Kemampuan memberdayakan orang lain merupakan modal kolaborasi luar biasa.",
      reflectionQuestions: [
        "Bagaimana kemampuan saya memberi ruang otonomi dapat meningkatkan motivasi orang di sekitar saya?",
      ],
    },
  },
  JUDGMENT: {
    TINGGI: {
      text: "TINGGI — Individu sangat cepat memberi label atau mengevaluasi karakter seseorang sebelum memahami konteks di balik tindakannya. Sikap menghakimi ini dapat menciptakan jarak emosional dan membuat orang lain merasa tidak dipahami. Pengembangan utama adalah mendeskripsikan perilaku objektif yang terlihat, menunda pemberian label, mencari konteks lebih luas, dan menjelaskan dampak tanpa menyerang identitas individu.",
      reflectionQuestions: [
        "Label atau stereotip negatif apa yang paling otomatis muncul di kepala saya ketika seseorang berbuat salah?",
        "Faktor konteks apa yang mungkin tidak saya ketahui dari situasi kehidupan orang tersebut?",
      ],
    },
    SEDANG: {
      text: "SEDANG — Individu mampu memahami perspektif lain dalam banyak situasi, tetapi cenderung cepat menilai ketika perilaku seseorang bertentangan dengan nilai atau ekspektasinya. Ia mungkin mengoreksi penilaian setelah mendapat informasi baru. Pengembangan utama adalah menunda kesimpulan, mengeksplorasi konteks, dan menilai perilaku tanpa menyederhanakan keseluruhan pribadi seseorang.",
      reflectionQuestions: [
        "Bagaimana saya bisa mengubah pikiran 'dia sengaja berbuat buruk' menjadi rasa penasaran 'apa yang mendorongnya bertindak demikian'?",
      ],
    },
    RENDAH: {
      text: "RENDAH — Individu memiliki empati yang luas dan tidak mudah terjebak dalam prasangka moral sepihak. Menghargai keberagaman manusia dan memandang orang lain secara utuh dan berkeadilan.",
      reflectionQuestions: [
        "Bagaimana sikap tidak menghakimi saya menciptakan ruang percakapan yang aman bagi orang lain?",
      ],
    },
  },
  LISTENING_GAP: {
    TINGGI: {
      text: "TINGGI — Individu cenderung lebih berfokus pada pendapat atau responsnya sendiri daripada memahami pesan lawan bicara secara utuh. Perhatian dapat terserap oleh keinginan menjelaskan, membantah, atau mempertahankan posisi. Hal ini terlihat melalui kebiasaan menyela atau menjawab sebelum memahami persoalan. Pengembangan utama adalah melatih mendengarkan aktif, menahan diri untuk menyela, melakukan parafrasa, dan mengonfirmasi pemahaman sebelum menanggapi.",
      reflectionQuestions: [
        "Saat orang lain berbicara, apakah pikiran saya sibuk merangkai bantahan atau benar-benar menyimak maknanya?",
        "Bagaimana rasanya jika saya membiarkan jeda 2 detik setelah lawan bicara selesai bersuara sebelum saya mulai merespons?",
      ],
    },
    SEDANG: {
      text: "SEDANG — Individu umumnya mampu memberikan perhatian terhadap pesan yang disampaikan orang lain dan tidak terlalu sering menyela. Namun, kesalahpahaman masih mungkin terjadi saat topik terasa sensitif atau memancing emosi. Pengembangan utama adalah mempertahankan fokus, mendengarkan sampai selesai, dan memparafrasekan pesan sebelum memberikan tanggapan.",
      reflectionQuestions: [
        "Topik apa yang paling sering memicu godaan saya untuk menyela pembicaraan orang lain?",
      ],
    },
    RENDAH: {
      text: "RENDAH — Individu merupakan pendengar yang empatik, sabar, dan penuh rasa hormat. Mampu menyimak intisari perkataan orang lain dengan seksama sebelum memberikan umpan balik.",
      reflectionQuestions: [
        "Bagaimana kebiasaan mendengarkan secara utuh memperdalam kedekatan dan rasa percaya dalam relasi saya?",
      ],
    },
  },
  ESCALATION: {
    TINGGI: {
      text: "TINGGI — Individu cenderung menaikkan intensitas emosi, nada bicara, atau mengungkit persoalan masa lalu ketika konflik meningkat, serta sulit melakukan rekonsiliasi setelah perdebatan. Kata-kata mutlak seperti 'selalu' atau 'tidak pernah' sering memperburuk situasi. Pengembangan utama adalah mengenali sinyal awal peningkatan tensi, menyepakati waktu jeda untuk pendinginan, membatasi pembahasan pada isu saat ini, dan merumuskan langkah perbaikan konkret.",
      reflectionQuestions: [
        "Apa kata-kata atau nada bicara saya yang paling sering membuat lawan bicara semakin defensif atau marah?",
        "Bagaimana saya bisa berinisiatif mengajak de-eskalasi atau meminta maaf saat ketegangan memuncak?",
      ],
    },
    SEDANG: {
      text: "SEDANG — Individu umumnya mampu menjaga komunikasi agar tidak meledak, tetapi ketegangan dapat meningkat ketika masalah berulang, emosi memuncak, atau kebutuhan penting tidak terpenuhi. Pengembangan utama adalah mengenali tanda awal eskalasi, menyepakati jeda, menghindari pengungkitan hal yang tidak relevan, dan kembali pada persoalan utama setelah lebih tenang.",
      reflectionQuestions: [
        "Kapan saya tahu bahwa sebuah diskusi sudah berubah dari mencari solusi menjadi adu ego?",
      ],
    },
    RENDAH: {
      text: "RENDAH — Individu jarang menunjukkan peningkatan intensitas konflik atau mengungkit masalah lama ketika berdebat. Kemampuan menjaga kestabilan suasana dan merajut kembali rekonsiliasi merupakan kekuatan kepemimpinan yang luar biasa.",
      reflectionQuestions: [
        "Bagaimana kedamaian dan ketenangan saya menjadi jangkar penyejuk di tengah badai perdebatan tim atau keluarga?",
      ],
    },
  },
};
