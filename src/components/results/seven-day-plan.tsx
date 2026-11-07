import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2, Sparkles } from "lucide-react";

export function SevenDayPlan() {
  const days = [
    {
      day: "Hari 1",
      title: "Sadar Sensasi Tubuh",
      focus: "Kenali sinyal fisik pertama ketika emosi mulai naik (dada kencang, nafas memburu, rahang mengatup).",
      practice: "Saat sensasi terasa, jangan langsung berbicara. Letakkan telapak tangan di dada atau meja selama 5 detik.",
    },
    {
      day: "Hari 2",
      title: "Memberi Jeda Sadar",
      focus: "Menciptakan ruang hening sebelum bereaksi spontan terhadap ucapan atau pesan seseorang.",
      practice: "Hitung satu hingga tiga dalam hati sebelum menjawab pesan atau pertanyaan yang memancing emosi.",
    },
    {
      day: "Hari 3",
      title: "Memisahkan Fakta dari Tafsir",
      focus: "Menguji kebenaran asumsi sebelum memperlakukannya sebagai fakta mutlak.",
      practice: "Tanyakan pada diri sendiri: 'Apakah ini fakta yang pasti terjadi, atau ini baru tafsiran pikiran saya?'",
    },
    {
      day: "Hari 4",
      title: "Mendengarkan untuk Memahami",
      focus: "Menghentikan kebiasaan menyiapkan argumen balasan saat lawan bicara masih berbicara.",
      practice: "Lakukan satu parafrasa sederhana: 'Maksudmu tadi adalah [ulangi inti kalimatnya], betul begitu?'",
    },
    {
      day: "Hari 5",
      title: "Menegakkan Batasan Sehat",
      focus: "Berani menyatakan batasan tanpa rasa bersalah atau memaksakan diri menyenangkan semua orang.",
      practice: "Gunakan kalimat hormat namun tegas: 'Terima kasih atas tawarannya, saat ini saya belum bisa membantunya.'",
    },
    {
      day: "Hari 6",
      title: "Melepaskan Kebutuhan Mengontrol",
      focus: "Memberi ruang bagi orang lain untuk memilih caranya sendiri selama standar utama terjaga.",
      practice: "Fokuslah menyepakati hasil akhir, dan biarkan rekan kerja atau pasangan menentukan metodenya.",
    },
    {
      day: "Hari 7",
      title: "Refleksi & Upaya Perbaikan",
      focus: "Mengevaluasi dinamika percakapan selama seminggu dan berani meminta maaf jika terjadi kesalahpahaman.",
      practice: "Tuliskan 3 percakapan yang berhasil Anda kelola dengan lebih tenang, dan rayakan kesadaran baru Anda.",
    },
  ];

  return (
    <Card className="border border-brand-border bg-white shadow-soft">
      <CardHeader className="border-b border-brand-border/60 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-burgundy mb-1">
          <Calendar className="h-4 w-4" />
          <span>Panduan Praktik 7 Hari</span>
        </div>
        <CardTitle className="font-serif text-2xl text-brand-charcoal">
          Latihan Komunikasi Sadar (Conscious Communication Practice)
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-brand-gray pt-1">
          Langkah bertahap untuk mengintegrasikan hasil refleksi ke dalam interaksi keseharian Anda.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {days.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-5 space-y-3 transition-all ${
                idx === 6 ? "md:col-span-2 lg:col-span-3 bg-brand-rose/30 border-brand-burgundy/30" : "bg-brand-ivory/30 border-brand-border/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <Badge variant={idx === 6 ? "default" : "secondary"} className="text-xs font-semibold">
                  {item.day}
                </Badge>
                <Sparkles className="h-4 w-4 text-brand-burgundy/50" />
              </div>
              <h4 className="font-serif text-base font-bold text-brand-charcoal">
                {item.title}
              </h4>
              <p className="text-xs text-brand-gray leading-relaxed">
                <strong>Fokus:</strong> {item.focus}
              </p>
              <div className="text-xs bg-white/80 p-3 rounded-xl border border-brand-border/60 text-brand-charcoal leading-relaxed">
                <span className="font-bold text-brand-burgundy">Latihan:</span> {item.practice}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
