'use client';
import { useState, useEffect, useRef } from 'react';
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
  const [selectedPlan, setSelectedPlan] = useState(1); // default: Pro

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
            {totalSent.toLocaleString()} <span className="text-white/30 text-[28px] md:text-[36px]">/ 1,000+</span>
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
      <section className="relative pt-10 pb-16 overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),transparent_60%)]">
        <div className="absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t from-[#0a0a0a] via-[#050505]/80 to-transparent pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 pt-4 md:pt-8 animate-fade-in text-center md:text-left">
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
          </div>
        </div>

        {/* Steps + phone demo (Moved to replace Dashboard) */}
        <div id="how" className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 mt-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
            
            {/* Steps list */}
            <div className="flex-1 space-y-3 w-full">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => triggerStepChange(i)}
                  className={`w-full text-left p-5 sm:p-7 rounded-2xl border transition-all duration-300 ${activeStep === i ? 'border-white/20 bg-[#111111] block' : 'border-white/[0.06] bg-transparent hover:border-white/10 hover:bg-white/[0.02] hidden lg:block'}`}
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

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-32 relative bg-black border-t border-white/5">
        <div className="max-w-[520px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-[28px] sm:text-[40px] font-medium text-white mb-3 tracking-tight">Obuna Ta'riflari</h2>
            <p className="text-[14px] sm:text-[16px] text-[#8A8F98] leading-relaxed">
              To'lovlar Click yoki Payme orqali qabul qilinadi.
            </p>
          </div>

          {/* ── Tab switcher ── */}
          {(() => {
            const plans = [
              {
                name: "Starter",
                subtitle: "Botni sinab ko'ring",
                price: "$10",
                period: "30 kun uchun",
                cta: "Boshlash",
                features: ["Cheksiz arizalar", "4 ta Telegram akkunt", "1,000+ guruh bazasi", "Anti-ban himoya"],
                icon: (
                  <svg width="40" height="40" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="12" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M24 16h4l4 6v6h-8V16z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                    <circle cx="9" cy="27" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <circle cx="27" cy="27" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                )
              },
              {
                name: "Pro",
                subtitle: "Eng mashhur tanlov",
                price: "$18",
                period: "60 kun uchun",
                cta: "Pro ni tanlash",
                features: ["Cheksiz arizalar", "4 ta Telegram akkunt", "1,000+ guruh bazasi", "Anti-ban himoya"],
                icon: (
                  <svg width="40" height="40" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 4L22 14H32L24 20L27 30L18 24L9 30L12 20L4 14H14L18 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                  </svg>
                )
              },
              {
                name: "Max",
                subtitle: "Uzoq muddatli qulaylik",
                price: "$25",
                period: "90 kun uchun",
                cta: "Max ni tanlash",
                features: ["Cheksiz arizalar", "4 ta Telegram akkunt", "1,000+ guruh bazasi", "Anti-ban himoya"],
                icon: (
                  <svg width="40" height="40" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 4C18 4 8 10 8 20C8 25.5 12.5 30 18 30C23.5 30 28 25.5 28 20C28 10 18 4 18 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M18 14V20L22 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )
              }
            ];
            const plan = plans[selectedPlan];
            return (
              <>
                {/* Pill tabs */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex items-center gap-1 bg-white/[0.05] border border-white/[0.08] rounded-2xl p-1">
                    {plans.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedPlan(i)}
                        className={`px-5 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200
                          ${selectedPlan === i
                            ? 'bg-[#18181B] text-white shadow-sm border border-white/10'
                            : 'text-[#8A8F98] hover:text-white border border-transparent'
                          }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Single plan card */}
                <div className="rounded-3xl border border-white/[0.08] bg-[#0A0A0A] overflow-hidden">
                  <div className="px-8 pt-8 pb-7">
                    {/* Icon + name */}
                    <div className="text-white mb-6">{plan.icon}</div>
                    <h3 className="text-[48px] font-semibold tracking-tight text-white leading-none mb-2">{plan.name}</h3>
                    <p className="text-[15px] text-[#8A8F98] mb-8">{plan.subtitle}</p>

                    {/* Price */}
                    <div className="mb-1 text-[40px] font-semibold text-white tracking-tight">
                      {plan.price}
                    </div>
                    <p className="text-[14px] text-[#555] mb-8">{plan.period}</p>

                    {/* CTA */}
                    <a
                      href="https://t.me/a4logistics_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl bg-white text-black text-[15px] font-semibold hover:bg-white/90 transition-colors text-center block shadow-lg"
                    >
                      {plan.cta}
                    </a>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.06]" />

                  {/* Features */}
                  <div className="px-8 py-6">
                    <ul className="space-y-4">
                      {plan.features.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-[14px] text-white/70">
                          <svg className="w-4 h-4 flex-shrink-0 text-white/50" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </section>



      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-10 sm:py-12 border-t border-white/5 bg-black">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-white/80">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-black text-[11px] font-bold">A4</div>
            <span className="font-medium text-[14px]">a4logistics bot</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="text-[12px] text-[#8A8F98]">© {new Date().getFullYear()} Barcha huquqlar himoyalangan.</div>
            <a href="https://etamin.uz/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-[11px] text-[#8A8F98] uppercase tracking-widest">Powered by</span>
              <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 hover:border-white/30 transition-colors">
                <img src="/etamin-logo.png" alt="ETAMIN logo" className="h-4 w-auto object-contain" />
                <span className="text-[13px] font-semibold tracking-wide text-white">ETAMIN</span>
              </div>
            </a>
          </div>
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
