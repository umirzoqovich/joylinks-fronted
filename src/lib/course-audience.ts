export interface AudienceItem {
  title: string;
  text: string;
}

/** Umumiy matn — ro'yxatda yo'q (admin paneldan qo'shilgan) kurslar uchun */
export const DEFAULT_AUDIENCE: readonly AudienceItem[] = [
  { title: "Endi kirib kelayotganlar", text: "Sohaga yangi qadam qo'ymoqchi bo'lgan va noldan boshlamoqchilar uchun." },
  { title: "Yo'nalishni tanlay olmaganlar", text: "Qaysi yo'nalish o'zingizga mosligini amaliyotda sinab ko'rib aniqlaysiz." },
  { title: 'Kuchli poydevor istaganlar', text: "Mustahkam bilim va amaliy ko'nikma bilan ishga tayyorlanmoqchilar uchun." },
];

/** Kurs slug'i bo'yicha "Bu kurs kimlar uchun?" kartalari. Yangi kurs qo'shilsa, shu yerga ham qo'shing. */
const AUDIENCE_BY_SLUG: Record<string, readonly AudienceItem[]> = {
  'kompyuter-savodxonligi': [
    { title: 'Kompyuterda endi ishlashni boshlaganlar', text: "Klaviatura, sichqoncha va fayllar bilan ishlashni noldan o'rganmoqchi bo'lganlar uchun." },
    { title: "Maktab o'quvchilari va talabalar", text: "O'qish va kundalik ishlarda kompyuter hamda ofis dasturlaridan erkin foydalanmoqchilar uchun." },
    { title: 'IT yo\'nalishiga tayyorgarlik ko\'rayotganlar', text: "Keyingi bosqichdagi IT kurslariga mustahkam poydevor qo'ymoqchi bo'lganlar uchun." },
  ],
  'it-foundation': [
    { title: "IT sohasiga endi kirib kelayotganlar", text: "Dasturlash va texnologiyalar olamini birinchi marta ko'rmoqchi bo'lganlar uchun." },
    { title: "Yo'nalishni tanlay olmaganlar", text: "Frontend, backend yoki boshqa yo'nalishlardan qaysi biri mosligini bilmaganlar uchun." },
    { title: 'Kuchli poydevor istaganlar', text: "Algoritmik fikrlash va dasturlash asoslarini puxta egallamoqchilar uchun." },
  ],
  'frontend-dasturlash': [
    { title: "Veb-saytlar yaratishni xohlaganlar", text: "Ko'z oldidagi natijani darhol ko'rib, interfeys yaratishni yoqtiradiganlar uchun." },
    { title: "Dizayn va kodni birlashtirmoqchilar", text: "Chiroyli dizaynni ishlaydigan sahifaga aylantirishni o'rganmoqchi bo'lganlar uchun." },
    { title: "Tez ishga kirmoqchi bo'lganlar", text: "Amaliy loyihalar bilan portfolio yig'ib, junior Frontend lavozimiga tayyorlanayotganlar uchun." },
  ],
  'backend-dasturlash': [
    { title: "Mantiqiy fikrlashni yoqtiradiganlar", text: "Ilovaning ichki ishlashi, ma'lumotlar va serverlar qiziqtiradigan o'quvchilar uchun." },
    { title: "Dasturlash asosini bilganlar", text: "Boshlang'ich bilimini real loyiha darajasiga olib chiqmoqchi bo'lganlar uchun." },
    { title: "Backend dasturchi bo'lmoqchilar", text: "API, ma'lumotlar bazasi va server bilan ishlashni amaliyotda o'rganmoqchilar uchun." },
  ],
  'english-for-it': [
    { title: "IT bilan shug'ullanayotganlar", text: "Hujjatlar, qo'llanmalar va kodni ingliz tilida erkin o'qishni istaganlar uchun." },
    { title: "Xalqaro kompaniyada ishlashni xohlaganlar", text: "Intervyu va jamoada ingliz tilida muloqot qilishga tayyorlanayotganlar uchun." },
    { title: "Texnik atamalarni o'zlashtirmoqchilar", text: "Soha lug'ati va kasbiy muloqotni qisqa muddatda kuchaytirmoqchi bo'lganlar uchun." },
  ],
  kiberxavfsizlik: [
    { title: "Axborot xavfsizligi qiziqtirganlar", text: "Tizimlar qanday himoyalanishi va qanday buzilishini tushunmoqchi bo'lganlar uchun." },
    { title: "IT bilimi bor mutaxassislar", text: "Tarmoq, tizim yoki dasturlashda tajribasini xavfsizlik tomon kengaytirmoqchilar uchun." },
    { title: "Talabi yuqori kasb egasi bo'lmoqchilar", text: "Kiberxavfsizlik bo'yicha amaliy ko'nikma bilan ish topmoqchi bo'lganlar uchun." },
  ],
  robototexnika: [
    { title: "Texnikaga qiziqadigan o'quvchilar", text: "Qurilmalarni o'zi yig'ib, ishga tushirishni yoqtiradigan yoshlar uchun." },
    { title: "Elektronika va dasturlashni birlashtirmoqchilar", text: "Kod yozib, uni jismoniy qurilmalarni boshqarishda sinab ko'rmoqchi bo'lganlar uchun." },
    { title: "Loyiha va tanlovlarga tayyorlanayotganlar", text: "Robototexnika loyihalari va olimpiadalarda qatnashmoqchi bo'lganlar uchun." },
  ],
  'prompt-engineering': [
    { title: "Sun'iy intellektdan foydalanmoqchilar", text: "AI vositalaridan kundalik va kasbiy ishda samarali foydalanishni o'rganmoqchi bo'lganlar uchun." },
    { title: "Ish unumdorligini oshirmoqchilar", text: "Matn, tahlil va takroriy vazifalarni AI yordamida tezlashtirmoqchi bo'lganlar uchun." },
    { title: "Dasturlash bilimi shart emas", text: "Texnik tayyorgarligi bo'lmasa ham AI bilan to'g'ri muloqot qilishni o'rganmoqchilar uchun." },
  ],
};

export function getCourseAudience(slug: string): readonly AudienceItem[] {
  return AUDIENCE_BY_SLUG[slug] ?? DEFAULT_AUDIENCE;
}
