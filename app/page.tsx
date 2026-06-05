'use client';
import { useState, useEffect } from 'react';
import { FileText, Users, Send, Key, Shield, Smartphone, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
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
    desc: "O'zingizga kerakli bo'lgan ommaviy guruhlarni tanlaysiz. Maxsus saralangan 382+ ta yuk va logistika guruhlari bazamiz sizning xizmatingizda.",
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
        const next = t + Math.floor(Math.random() * 5) + 1;
        return next >= 382 ? 0 : next;
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
    if(currentPhase === 0) {
      return (
        <div className="space-y-2 text-[12px] text-white/60">
          <div>✓ +998901234567 ulangan</div>
          <div>✓ +998931234567 ulangan</div>
          <div>✓ +998941234567 ulangan</div>
          <div>✓ +998991234567 ulangan</div>
        </div>
      );
    } else if (currentPhase === 1) {
      return (
        <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-[13px]">
          <span className="text-[#8A8F98]">Toshkent → Andijon</span><br/>
          Yuk: 20 tonna, Furada<br/>
          Narxi: Kelishilgan holda<br/>
          Tel: +998901234567
        </div>
      );
    } else if (currentPhase === 2) {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-[12px]">Akkaunt 1: 95 ta guruh</div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-[12px]">Akkaunt 2: 95 ta guruh</div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-[12px]">Akkaunt 3: 96 ta guruh</div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-[12px]">Akkaunt 4: 96 ta guruh</div>
        </div>
      );
    } else if (currentPhase === 3) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-[32px] md:text-[48px] font-medium text-white mb-2 text-center mt-6">
            {totalSent} / 382
          </div>
          <div className="text-center text-[#8A8F98] text-[12px]">Muvaffaqiyatli yuborilganlar</div>
        </div>
      );
    }
  };

  const getActionText = () => {
    if(currentPhase === 0) return "Telegram raqamlar ulanishi tekshirilmoqda...";
    if(currentPhase === 1) return "Yuk haqidagi ma'lumot qadoqlanmoqda...";
    if(currentPhase === 2) return "Har bir akkauntga guruhlar taqsimlanmoqda (Anti-Ban)...";
    if(currentPhase === 3) return "Tarqatish jarayoni ketmoqda (Random 5-15 sek)...";
    return "";
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 font-sans">
      <section className="relative pt-24 pb-16 overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),transparent_60%)]">
        <div className="absolute bottom-0 left-0 right-0 h-[600px] bg-gradient-to-t from-[#0a0a0a] via-[#050505]/80 to-transparent pointer-events-none"></div>
        <div className="relative max-w-[1200px] mx-auto px-6 pt-12 md:pt-20 animate-fade-in text-center md:text-left">
          <h1 className="text-[40px] md:text-[60px] leading-[1.1] font-medium tracking-tight text-white max-w-[900px]">
            Logistika dispetcherlari uchun avtomatik reklama tarqatish boti
          </h1>
          <p className="mt-6 text-[18px] text-[#8A8F98] max-w-[600px] leading-relaxed mx-auto md:mx-0">
            Siz yuk haqida bitta xabar yozasiz — bot uni 382+ ta guruhga avtomatik tarzda, belgilangan vaqtda tarqatadi.
          </p>
        </div>
        <div className="relative w-full max-w-[1200px] mx-auto px-6 mt-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="w-full border border-white/10 rounded-xl bg-[#0A0A0A] overflow-hidden flex flex-col md:flex-row h-auto md:h-[500px] shadow-2xl">
            <div className="w-full md:w-[260px] border-b md:border-b-0 md:border-r border-white/10 bg-[#0A0A0A] hidden md:flex flex-col">
              <div className="h-12 flex items-center justify-between px-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-white">
                  <div className="w-4 h-4 rounded bg-white flex items-center justify-center text-black text-[10px] font-bold">L</div>
                  <span className="text-[13px] font-medium">Logit Smartbot</span>
                </div>
              </div>
              <div className="flex-1 p-4">
                <div className="text-[11px] font-medium text-[#8A8F98] mb-3 uppercase tracking-wider">Ishlash jarayoni</div>
                <div className="space-y-1">
                  {phases.map((p, i) => (
                    <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] transition-colors duration-300 ${i === currentPhase ? 'bg-white/5 text-white' : i < currentPhase ? 'text-white/60' : 'text-[#8A8F98]'}`}>
                      <div className={`w-4 h-4 rounded-full border ${i === currentPhase ? 'border-white/50 flex items-center justify-center' : 'border-white/20 bg-white/10'}`}>
                        {i === currentPhase && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                      </div>
                      <span>{p.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="text-[11px] font-medium text-[#8A8F98] mb-3 uppercase tracking-wider">Holat</div>
                  <div className="space-y-2 text-[12px] text-[#8A8F98]">
                    <div className="flex justify-between"><span>Akkauntlar</span> <span className="text-white">4/4 Faol</span></div>
                    <div className="flex justify-between"><span>Guruhlar</span> <span className="text-white">382 ta</span></div>
                    <div className="flex justify-between"><span>Interval</span> <span className="text-white">Har 1 soatda</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col bg-[#0A0A0A]">
              <div className="h-12 border-b border-white/10 flex items-center justify-between px-4">
                <span className="text-[13px] font-medium text-white">Avto Yuborma Jarayoni</span>
                <span className="text-[12px] text-[#8A8F98]">Ishlamoqda...</span>
              </div>
              <div className="flex-1 p-6 flex flex-col relative overflow-hidden">
                <div className="text-[14px] text-[#8A8F98] mb-4">
                  {getActionText()}
                </div>
                <div className="flex-1">
                  {renderMainDisplay()}
                </div>
              </div>
            </div>
            <div className="hidden lg:flex w-[260px] border-l border-white/10 bg-[#0A0A0A] flex-col">
              <div className="h-12 border-b border-white/10 flex items-center px-4">
                <span className="text-[13px] font-medium text-white">Statistika</span>
              </div>
              <div className="p-4 flex-1">
                <AnimatedStats progress={progress} totalSent={totalSent} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative bg-black border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-[32px] md:text-[44px] font-medium text-white mb-4 tracking-tight">
              Sizning biznesingiz uchun <br/>maxsus yechimlar
            </h2>
            <p className="text-[17px] text-[#8A8F98] max-w-[500px] leading-relaxed">
              Botning imkoniyatlari logistika dispetcherlarining vaqtini tejashga qaratilgan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, title: "Ko'p Akkauntli Tizim", desc: "Birdaniga 4 tagacha shaxsiy Telegram raqamni ulash imkoniyati. Bu guruhlarga yuborish tezligini oshiradi va har bir akkauntni ortiqcha zo'riqishdan himoya qiladi." },
              { icon: Shield, title: "Anti-Ban Himoya", desc: "Guruhlar orasida tasodifiy (random 5-15 sek) pauzalar hamda avtomatik FloodWait aylanib o'tish mexanizmi Telegram limitlariga tushib qolmasligingizni ta'minlaydi." },
              { icon: Zap, title: "Keng Qamrov", desc: "O'zbekiston bo'ylab 382+ ta eng faol ommaviy logistika guruhlari bazasi bilan kuniga ~1150 xabar yuborish imkoniyati sizning mijozlar oqimingizni ko'paytiradi." }
            ].map((f, idx) => (
              <div key={idx} className="group border border-white/[0.08] rounded-xl bg-[#0A0A0A] p-8 transition-all duration-500 hover:border-white/20 hover:bg-[#111111]">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <f.icon className="w-6 h-6 text-white/80" />
                </div>
                <h3 className="text-[20px] font-medium text-white mb-3">{f.title}</h3>
                <p className="text-[14px] text-[#8A8F98] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative bg-black border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-20 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[13px] font-medium text-[#8A8F98] mb-6">
              Qanday ishlaydi
            </div>
            <h2 className="text-[32px] md:text-[44px] font-medium tracking-tight text-white leading-[1.1]">
              Hammasi judayam oddiy,<br/> atigi 3 ta qadam.
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="flex-1 space-y-4">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => triggerStepChange(i)}
                  className={`w-full text-left p-8 rounded-2xl border transition-all duration-300 ${activeStep === i ? 'border-white/20 bg-[#111111]' : 'border-white/[0.06] bg-transparent hover:border-white/10 hover:bg-white/[0.02]'}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors ${activeStep === i ? 'text-white/50' : 'text-[#444]'}`}>Qadam {s.id}</span>
                    <div className={`h-px flex-1 transition-colors ${activeStep === i ? 'bg-white/15' : 'bg-white/5'}`} />
                  </div>
                  <h3 className={`text-[22px] font-medium mb-2 transition-colors leading-snug ${activeStep === i ? 'text-white' : 'text-white/30'}`}>{s.title}</h3>
                  <p className={`text-[15px] leading-relaxed transition-colors ${activeStep === i ? 'text-[#8A8F98]' : 'text-[#3a3a3a]'}`}>{s.desc}</p>
                  {activeStep === i && (
                    <div className="mt-5 h-[2px] bg-white/10 rounded-full overflow-hidden">
                      <div key={activeStep} className="h-full bg-white/70 rounded-full" style={{ animation: 'stepProgress 4s linear forwards' }} />
                    </div>
                  )}
                </button>
              ))}
              <div className="flex gap-2 pt-2 lg:hidden">
                {steps.map((_, i) => (
                  <button key={i} onClick={() => triggerStepChange(i)} className={`h-2 rounded-full transition-all duration-300 ${activeStep === i ? 'bg-white w-6' : 'bg-white/20 w-2'}`} />
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:sticky lg:top-24 self-start">
              <IphoneTgDemo activeStep={activeStep} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative bg-black border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[44px] font-medium text-white mb-4 tracking-tight">Obuna Ta'riflari</h2>
            <p className="text-[17px] text-[#8A8F98] max-w-[500px] mx-auto leading-relaxed">Botdan foydalanish uchun o'zingizga qulay bo'lgan muddatni tanlang. To'lovlar Click yoki Payme orqali qabul qilinadi.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center max-w-[1000px] mx-auto">
            {[
              { days: "30 kunlik", desc: "Boshlang'ich tanlov", price: "$10", suffix: "/month", featured: false },
              { days: "60 kunlik", desc: "Foydali ta'rif", price: "$18", suffix: "/month", featured: true },
              { days: "90 kunlik", desc: "Uzoq muddatli qulaylik", price: "$25", suffix: "/month", featured: false }
            ].map((plan, i) => (
              <div key={i} className={`relative rounded-3xl border transition-all duration-300 w-full md:w-1/3 ${plan.featured ? 'border-white/30 bg-[#151515] py-12 px-8 z-10 shadow-2xl shadow-white/5 md:-mx-4 my-6 md:my-0' : 'border-white/10 bg-[#0A0A0A] py-8 px-6 hover:border-white/20'}`}>
                {plan.featured && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wider uppercase shadow-lg">Most popular</div>}
                <div className="flex flex-col h-full">
                  <h3 className="text-[20px] text-white font-medium mb-1">{plan.days}</h3>
                  <div className="text-[14px] text-[#8A8F98] mb-6">{plan.desc}</div>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-[40px] md:text-[48px] font-medium text-white tracking-tight">{plan.price}</span>
                    <span className="text-[14px] text-[#8A8F98] font-medium">{plan.suffix}</span>
                  </div>
                  <button className={`w-full py-3.5 rounded-xl text-[14px] font-medium transition-colors mb-8 ${plan.featured ? 'bg-white text-black hover:bg-white/90 shadow-md' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}>Ulanish uchun yozing</button>
                  <ul className="space-y-4">
                    {['Cheksiz arizalar yozish', '4 tagacha akkunt qo\'shish', '382+ guruhga tarqatish', 'Anti-ban himoyasi'].map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-[14px] text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-white/40 flex-shrink-0" />
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

      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-white/80">
            <div className="w-5 h-5 rounded bg-white flex items-center justify-center text-black text-[12px] font-bold">L</div>
            <span className="font-medium text-[14px]">Logit Smartbot</span>
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
