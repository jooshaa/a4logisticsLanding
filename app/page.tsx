'use client';
import { useState, useEffect } from 'react';
import { FileText, Users, Send, Key, Shield, Smartphone, Zap, CheckCircle2 } from 'lucide-react';
import IphoneTgDemo from './components/IphoneTgDemo';
import AnimatedStats from './components/AnimatedStats';

const phases = [
  { name: "Akkauntlarni tekshirish", icon: Key },
  { name: "Arizani formatlash", icon: FileText },
  { name: "Guruhlarga taqsimlash", icon: Users },
  { name: "Xabarlarni tarqatish", icon: Send }
];

const steps = [
  {
    id: "01",
    title: "Arizani Kiritish",
    desc: "Qayerdan, qayerga, vazni va narxi kabi kerakli ma'lumotlarni erkin shaklda yozasiz. Bot uni barcha guruhlar uchun to'g'ri formatlab tayyorlaydi. Tahrirlash imkoni ham mavjud.",
    img: "/images/step1.png"
  },
  {
    id: "02",
    title: "Guruhlarni Sozlash",
    desc: "O'zingizga kerakli bo'lgan ommaviy guruhlarni tanlaysiz. Maxsus saralangan 1000+ ta yuk va logistika guruhlari bazamiz sizning xizmatingizda.",
    img: "/images/step2.png"
  },
  {
    id: "03",
    title: "Ishga Tushirish",
    desc: "Necha soatda va necha kun davomida qayta-qayta yuborilishini tanlaysiz va 'Boshlash' tugmasini bosasiz. Qolgan hamma narsani botning o'zi avtomatik tarzda hal qiladi.",
    img: "/images/step3.png"
  }
];

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalSent, setTotalSent] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [imgFading, setImgFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        let next = p + 2;
        if (next > 100) {
          next = 0;
          setCurrentPhase(c => (c + 1) % phases.length);
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentPhase === 3) {
      setTotalSent(t => {
        const next = t + Math.floor(Math.random() * 8) + 2;
        return next >= 1000 ? 0 : next;
      });
    }
  }, [progress, currentPhase]);

  useEffect(() => {
    const timer = setInterval(() => {
      triggerStepChange((s: number) => (s + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const triggerStepChange = (updater: number | ((s: number) => number)) => {
    setImgFading(true);
    setTimeout(() => {
      setActiveStep(typeof updater === 'function' ? updater : () => updater);
      setImgFading(false);
    }, 300);
  };

  const renderMainDisplay = () => {
    if (currentPhase === 0) {
      return (
        <div className="space-y-3 text-[13px]">
          {['+998901234567', '+998931234567', '+998941234567', '+998991234567'].map((num, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
              <span className="text-white/70">{num}</span>
              <span className="ml-auto text-green-400 text-[11px] font-medium">Faol</span>
            </div>
          ))}
        </div>
      );
    } else if (currentPhase === 1) {
      return (
        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.08] text-[13px] space-y-2">
          <div className="text-[#8A8F98] text-[11px] uppercase tracking-wider mb-3 font-medium">Ariza tarkibi</div>
          <div className="flex gap-2"><span className="text-white/40 w-20 flex-shrink-0">Yo'nalish:</span><span className="text-white">Toshkent → Andijon</span></div>
          <div className="flex gap-2"><span className="text-white/40 w-20 flex-shrink-0">Yuk:</span><span className="text-white">20 tonna, Furada</span></div>
          <div className="flex gap-2"><span className="text-white/40 w-20 flex-shrink-0">Narx:</span><span className="text-white">Kelishilgan</span></div>
          <div className="flex gap-2"><span className="text-white/40 w-20 flex-shrink-0">Aloqa:</span><span className="text-white">+998901234567</span></div>
        </div>
      );
    } else if (currentPhase === 2) {
      return (
        <div className="grid grid-cols-2 gap-3">
          {[
            { acc: 'Akkaunt 1', groups: 250 },
            { acc: 'Akkaunt 2', groups: 250 },
            { acc: 'Akkaunt 3', groups: 250 },
            { acc: 'Akkaunt 4', groups: 250 },
          ].map((a, i) => (
            <div key={i} className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-[12px]">
              <div className="text-white/50 mb-1">{a.acc}</div>
              <div className="text-white font-medium">{a.groups} ta guruh</div>
            </div>
          ))}
        </div>
      );
    } else if (currentPhase === 3) {
      const pct = Math.min(100, Math.round((totalSent / 1000) * 100));
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="text-[40px] md:text-[56px] font-medium text-white text-center tabular-nums">
            {totalSent.toLocaleString()} <span className="text-white/30 text-[28px] md:text-[36px]">/ 1,000</span>
          </div>
          <div className="text-center text-[#8A8F98] text-[12px]">Muvaffaqiyatli yuborilganlar</div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-gradient-to-r from-white/60 to-white rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="text-white/30 text-[12px]">{pct}% bajarildi</div>
        </div>
      );
    }
  };

  const getActionText = () => {
    if (currentPhase === 0) return "Telegram raqamlar ulanishi tekshirilmoqda...";
    if (currentPhase === 1) return "Yuk haqidagi ma'lumot qadoqlanmoqda...";
    if (currentPhase === 2) return "Har bir akkauntga guruhlar taqsimlanmoqda (Anti-Ban)...";
    if (currentPhase === 3) return "Tarqatish jarayoni ketmoqda (Random 5-15 sek)...";
    return "";
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 font-sans">

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),transparent_60%)]">
        <div className="absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t from-[#0a0a0a] via-[#050505]/80 to-transparent pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 md:pt-20 animate-fade-in text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[12px] font-medium text-[#8A8F98] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Hozir 1,000+ guruh bilan ishlayapti
          </div>
          <h1 className="text-[36px] sm:text-[48px] md:text-[62px] leading-[1.08] font-medium tracking-tight text-white max-w-[860px]">
            Logistika dispetcherlari uchun avtomatik reklama tarqatish boti
          </h1>
          <p className="mt-6 text-[16px] sm:text-[18px] text-[#8A8F98] max-w-[600px] leading-relaxed mx-auto md:mx-0">
            Siz yuk haqida bitta xabar yozasiz — bot uni <strong className="text-white">1,000+</strong> ta guruhga avtomatik tarzda, belgilangan vaqtda tarqatadi.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href="https://t.me/a4logistics_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-[14px] font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              Boshlash — Bepul
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-[14px] font-medium hover:bg-white/[0.08] transition-colors"
            >
              Qanday ishlaydi?
            </a>
          </div>
        </div>

        {/* Dashboard demo */}
        <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 mt-14 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="w-full border border-white/10 rounded-2xl bg-[#0A0A0A] overflow-hidden flex flex-col md:flex-row shadow-2xl" style={{ minHeight: 420 }}>

            {/* Left sidebar */}
            <div className="w-full md:w-[220px] border-b md:border-b-0 md:border-r border-white/10 bg-[#0A0A0A] flex flex-col">
              <div className="h-12 flex items-center justify-between px-4 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-2 text-white">
                  <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center text-black text-[10px] font-bold">A4</div>
                  <span className="text-[13px] font-medium">a4logistics bot</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
              </div>
              <div className="flex-1 p-3 overflow-hidden">
                <div className="text-[10px] font-semibold text-[#8A8F98] mb-2 uppercase tracking-wider">Jarayon</div>
                <div className="space-y-0.5">
                  {phases.map((p, i) => (
                    <div key={i} className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] transition-all duration-300 ${i === currentPhase ? 'bg-white/[0.06] text-white' : i < currentPhase ? 'text-white/40' : 'text-[#555]'}`}>
                      <div className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center ${i === currentPhase ? 'border-white/40' : i < currentPhase ? 'border-white/20 bg-white/10' : 'border-white/10'}`}>
                        {i < currentPhase && <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />}
                        {i === currentPhase && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                      </div>
                      <span className="leading-tight">{p.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <div className="text-[10px] font-semibold text-[#8A8F98] mb-2 uppercase tracking-wider">Holat</div>
                  <div className="space-y-1.5 text-[11px] text-[#8A8F98]">
                    <div className="flex justify-between"><span>Akkauntlar</span><span className="text-white">4/4 Faol</span></div>
                    <div className="flex justify-between"><span>Guruhlar</span><span className="text-white">1,000 ta</span></div>
                    <div className="flex justify-between"><span>Interval</span><span className="text-white">Har 1 soat</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center main area */}
            <div className="flex-1 flex flex-col bg-[#0A0A0A] min-w-0">
              <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 flex-shrink-0">
                <span className="text-[13px] font-medium text-white">Avto Yuborma Jarayoni</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[11px] text-green-400 font-medium">Ishlamoqda</span>
                </div>
              </div>
              <div className="flex-1 p-4 sm:p-6 flex flex-col overflow-hidden">
                <div className="text-[12px] text-[#8A8F98] mb-4 font-medium">{getActionText()}</div>
                <div className="flex-1">
                  {renderMainDisplay()}
                </div>
              </div>
            </div>

            {/* Right stats — hidden on small, visible on lg */}
            <div className="hidden lg:flex w-[240px] border-l border-white/10 bg-[#0A0A0A] flex-col flex-shrink-0">
              <div className="h-12 border-b border-white/10 flex items-center px-4 flex-shrink-0">
                <span className="text-[13px] font-medium text-white">Statistika</span>
              </div>
              <div className="p-4 flex-1 overflow-hidden">
                <AnimatedStats progress={progress} totalSent={totalSent} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 relative bg-black border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-medium text-white mb-4 tracking-tight">
              Sizning biznesingiz uchun <br className="hidden sm:block" />maxsus yechimlar
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#8A8F98] max-w-[500px] leading-relaxed">
              Botning imkoniyatlari logistika dispetcherlarining vaqtini tejashga qaratilgan.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Smartphone, title: "Ko'p Akkauntli Tizim", desc: "Birdaniga 4 tagacha shaxsiy Telegram raqamni ulash imkoniyati. Bu guruhlarga yuborish tezligini oshiradi va har bir akkauntni ortiqcha zo'riqishdan himoya qiladi." },
              { icon: Shield, title: "Anti-Ban Himoya", desc: "Guruhlar orasida tasodifiy (random 5-15 sek) pauzalar hamda avtomatik FloodWait aylanib o'tish mexanizmi Telegram limitlariga tushib qolmasligingizni ta'minlaydi." },
              { icon: Zap, title: "Keng Qamrov", desc: "O'zbekiston bo'ylab 1,000+ ta eng faol ommaviy logistika guruhlari bazasi bilan kuniga ~3,000 xabar yuborish imkoniyati sizning mijozlar oqimingizni ko'paytiradi." }
            ].map((f, idx) => (
              <div key={idx} className="group border border-white/[0.08] rounded-2xl bg-[#0A0A0A] p-6 sm:p-8 transition-all duration-500 hover:border-white/20 hover:bg-[#111111]">
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center mb-5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <f.icon className="w-5 h-5 text-white/80" />
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-medium text-white mb-3">{f.title}</h3>
                <p className="text-[14px] text-[#8A8F98] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section id="how" className="py-24 sm:py-32 relative bg-black border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="mb-16 sm:mb-20 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[12px] sm:text-[13px] font-medium text-[#8A8F98] mb-6">
              Qanday ishlaydi
            </div>
            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-medium tracking-tight text-white leading-[1.1]">
              Hammasi judayam oddiy,<br /> atigi 3 ta qadam.
            </h2>
          </div>

          {/* Steps + phone side-by-side on large, stacked on mobile */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">

            {/* Steps list */}
            <div className="flex-1 space-y-3 w-full">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => triggerStepChange(i)}
                  className={`w-full text-left p-5 sm:p-7 rounded-2xl border transition-all duration-300 ${activeStep === i ? 'border-white/20 bg-[#111111]' : 'border-white/[0.06] bg-transparent hover:border-white/10 hover:bg-white/[0.02]'}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors ${activeStep === i ? 'text-white/50' : 'text-[#444]'}`}>Qadam {s.id}</span>
                    <div className={`h-px flex-1 transition-colors ${activeStep === i ? 'bg-white/15' : 'bg-white/5'}`} />
                  </div>
                  <h3 className={`text-[19px] sm:text-[22px] font-medium mb-2 transition-colors leading-snug ${activeStep === i ? 'text-white' : 'text-white/30'}`}>{s.title}</h3>
                  <p className={`text-[14px] sm:text-[15px] leading-relaxed transition-colors ${activeStep === i ? 'text-[#8A8F98]' : 'text-[#3a3a3a]'}`}>{s.desc}</p>
                  {activeStep === i && (
                    <div className="mt-4 h-[2px] bg-white/10 rounded-full overflow-hidden">
                      <div key={activeStep} className="h-full bg-white/70 rounded-full" style={{ animation: 'stepProgress 4s linear forwards' }} />
                    </div>
                  )}
                </button>
              ))}
              {/* Mobile dots */}
              <div className="flex gap-2 pt-2 lg:hidden justify-center">
                {steps.map((_, i) => (
                  <button key={i} onClick={() => triggerStepChange(i)} className={`h-2 rounded-full transition-all duration-300 ${activeStep === i ? 'bg-white w-6' : 'bg-white/20 w-2'}`} />
                ))}
              </div>
            </div>

            {/* iPhone demo */}
            <div className="w-full lg:w-auto flex justify-center lg:sticky lg:top-24 self-start">
              <IphoneTgDemo activeStep={activeStep} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 relative bg-black border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-medium text-white mb-4 tracking-tight">Obuna Ta'riflari</h2>
            <p className="text-[15px] sm:text-[17px] text-[#8A8F98] max-w-[500px] mx-auto leading-relaxed">
              Botdan foydalanish uchun o'zingizga qulay bo'lgan muddatni tanlang. To'lovlar Click yoki Payme orqali qabul qilinadi.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch justify-center max-w-[1000px] mx-auto gap-4 sm:gap-0">
            {[
              { days: "30 kunlik", desc: "Boshlang'ich tanlov", price: "$10", suffix: "/month", featured: false },
              { days: "60 kunlik", desc: "Foydali ta'rif", price: "$18", suffix: "/month", featured: true },
              { days: "90 kunlik", desc: "Uzoq muddatli qulaylik", price: "$25", suffix: "/month", featured: false }
            ].map((plan, i) => (
              <div key={i} className={`relative rounded-3xl border transition-all duration-300 w-full sm:w-1/3 ${plan.featured ? 'border-white/30 bg-[#151515] py-10 sm:py-12 px-6 sm:px-8 z-10 shadow-2xl shadow-white/5 sm:-mx-2 my-0' : 'border-white/10 bg-[#0A0A0A] py-8 px-6 hover:border-white/20'}`}>
                {plan.featured && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-lg">Eng mashhur</div>}
                <div className="flex flex-col h-full">
                  <h3 className="text-[18px] sm:text-[20px] text-white font-medium mb-1">{plan.days}</h3>
                  <div className="text-[13px] text-[#8A8F98] mb-5">{plan.desc}</div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-[36px] sm:text-[44px] font-medium text-white tracking-tight">{plan.price}</span>
                    <span className="text-[13px] text-[#8A8F98] font-medium">{plan.suffix}</span>
                  </div>
                  <a
                    href="https://t.me/a4logistics_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl text-[14px] font-medium transition-colors mb-6 text-center block ${plan.featured ? 'bg-white text-black hover:bg-white/90 shadow-md' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                  >
                    Ulanish uchun yozing
                  </a>
                  <ul className="space-y-3">
                    {['Cheksiz arizalar yozish', '4 tagacha akkunt qo\'shish', '1,000+ guruhga tarqatish', 'Anti-ban himoyasi'].map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-[13px] sm:text-[14px] text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-white/40 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-10 sm:py-12 border-t border-white/5 bg-black">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-white/80">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-black text-[11px] font-bold">A4</div>
            <span className="font-medium text-[14px]">a4logistics bot</span>
          </div>
          <div className="text-[12px] text-[#8A8F98]">© {new Date().getFullYear()} Barcha huquqlar himoyalangan.</div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes stepProgress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
}
