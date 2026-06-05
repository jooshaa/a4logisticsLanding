'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MoreVertical, Paperclip, Mic, Phone, Video } from 'lucide-react';

// ─── Chat message types ──────────────────────────────────────────
type Msg = {
  id: string;
  from: 'bot' | 'user';
  type: 'text' | 'voice' | 'action';
  text?: string;
  delay: number; // ms after step starts
};

// ─── 3 step chat scripts ─────────────────────────────────────────
const SCRIPTS: Msg[][] = [
  // STEP 0 — Arizani Kiritish
  [
    {
      id: 'w1', from: 'bot', type: 'text', delay: 0,
      text: 'Assalomu alaykum! 👋\nYuk haqida ma\'lumot yuboring:',
    },
    {
      id: 'w2', from: 'bot', type: 'action', delay: 600,
      text: '📍 Qayerdan → Qayerga\n⚖️ Vazni (tonna)\n🚛 Transport turi\n💰 Narxi',
    },
    {
      id: 'u1', from: 'user', type: 'text', delay: 1800,
      text: 'Toshkent → Andijon\n20 tonna, Furada\nNarxi kelishiladi\n📞 +998901234567',
    },
    {
      id: 'b1', from: 'bot', type: 'text', delay: 2800,
      text: '✅ Ariza tayyor!\n\n📍 Toshkent → Andijon\n⚖️ 20 tonna · Furada\n💰 Kelishilgan\n📞 +998901234567',
    },
  ],

  // STEP 1 — Guruhlarni Sozlash
  [
    {
      id: 'g1', from: 'bot', type: 'text', delay: 0,
      text: 'Qaysi guruhlarga yuborilsin?',
    },
    {
      id: 'g2', from: 'bot', type: 'action', delay: 600,
      text: '📋 Barcha logistika guruhlari (382)\n📍 Faqat Toshkent yo\'nalishlari\n📍 Faqat Andijon yo\'nalishlari',
    },
    {
      id: 'gu1', from: 'user', type: 'text', delay: 1900,
      text: '📋 Barcha logistika guruhlari (382)',
    },
    {
      id: 'gb1', from: 'bot', type: 'text', delay: 2800,
      text: '✅ 382 ta guruh tanlandi!\n\n👥 4 ta akkaunt orqali\nHar biri ≈ 95–96 ta guruh',
    },
  ],

  // STEP 2 — Ishga Tushirish
  [
    {
      id: 's1', from: 'bot', type: 'text', delay: 0,
      text: 'Har necha soatda qayta yuborilsin?',
    },
    {
      id: 's2', from: 'bot', type: 'action', delay: 600,
      text: '⏱ 1 soatda bir marta\n⏱ 2 soatda bir marta\n⏱ 4 soatda bir marta',
    },
    {
      id: 'su1', from: 'user', type: 'text', delay: 1900,
      text: '⏱ 1 soatda bir marta',
    },
    {
      id: 'sb1', from: 'bot', type: 'text', delay: 2800,
      text: '🚀 Tarqatish boshlandi!\n\n📊 Yuborilmoqda... 47/382\n⏳ Taxminiy: ~25 daqiqa',
    },
    {
      id: 'sb2', from: 'bot', type: 'text', delay: 4000,
      text: '✅ 382 ta guruhga muvaffaqiyatli yuborildi!\n\n🔄 Keyingi yuborish: 1 soatdan so\'ng',
    },
  ],
];

// ─── StatusBar SVG ────────────────────────────────────────────────
function StatusBar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 414 44"
      width="100%"
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 101, pointerEvents: 'none', height: 'auto' }}
      fill="none"
    >
      <path
        fill="#fff"
        d="M345 20.7c2.612 0 5.124 1.01 7.017 2.82a.36.36 0 0 0 .51-.005l1.363-1.383a.381.381 0 0 0-.003-.54 12.79 12.79 0 0 0-17.774 0 .381.381 0 0 0-.003.54l1.363 1.384c.14.142.368.143.511.003A10.152 10.152 0 0 1 345 20.7Zm0 4.5c1.435 0 2.819.536 3.883 1.505.144.137.37.135.511-.007l1.36-1.383a.383.383 0 0 0-.005-.544 8.402 8.402 0 0 0-11.494 0 .384.384 0 0 0-.005.544l1.36 1.383c.14.142.367.144.511.007A5.765 5.765 0 0 1 345 25.2Zm2.616 3.3a.373.373 0 0 0-.011-.541 4.015 4.015 0 0 0-5.209 0 .372.372 0 0 0-.011.542l2.354 2.39a.366.366 0 0 0 .523 0l2.354-2.39ZM361.923 21.205c0-.708.574-1.282 1.282-1.282h17.628c.708 0 1.282.574 1.282 1.282v6.09c0 .708-.574 1.282-1.282 1.282h-17.628a1.282 1.282 0 0 1-1.282-1.282v-6.09Z"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M363.205 18.962h17.628a2.244 2.244 0 0 1 2.244 2.243v6.09a2.244 2.244 0 0 1-2.244 2.243h-17.628a2.243 2.243 0 0 1-2.243-2.243v-6.09a2.243 2.243 0 0 1 2.243-2.243ZM360 21.204A3.205 3.205 0 0 1 363.205 18h17.628a3.205 3.205 0 0 1 3.205 3.205v6.09a3.205 3.205 0 0 1-3.205 3.205h-17.628A3.205 3.205 0 0 1 360 27.295v-6.09Zm26.603 3.045c0 .985-.684 1.81-1.603 2.028v-4.056a2.084 2.084 0 0 1 1.603 2.028Z"
        clipRule="evenodd"
        opacity={0.4}
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M326.85 19a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h1.3a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-1.3Zm-5.95 3.2a1 1 0 0 1 1-1h1.3a1 1 0 0 1 1 1V29a1 1 0 0 1-1 1h-1.3a1 1 0 0 1-1-1v-6.8Zm-3.95 1.2a1 1 0 0 0-1 1V29a1 1 0 0 0 1 1h1.3a1 1 0 0 0 1-1v-4.6a1 1 0 0 0-1-1h-1.3ZM312.1 30a1.1 1.1 0 0 1-1.1-1.1v-2.75a1.1 1.1 0 0 1 1.1-1.1h1.1a1.1 1.1 0 0 1 1.1 1.1v2.75a1.1 1.1 0 0 1-1.1 1.1h-1.1Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        d="M43.35 31h2.224V18.317h-2.242l-3.313 2.33v2.083l3.278-2.25h.053V31Zm9.51-12.902c-2.733 0-4.746 1.837-4.746 4.394v.018c0 2.382 1.723 4.14 4.166 4.14 1.714 0 2.98-.88 3.48-2.04h.053c0 .141-.009.273-.018.405-.087 2.4-.94 4.35-2.979 4.35-1.134 0-1.907-.562-2.25-1.432l-.026-.08h-2.25l.017.097c.396 1.916 2.154 3.27 4.5 3.27 3.235 0 5.177-2.505 5.177-6.697v-.018c0-4.447-2.33-6.407-5.124-6.407Zm0 6.802c-1.441 0-2.514-1.028-2.514-2.47v-.017c0-1.371 1.134-2.46 2.54-2.46 1.424 0 2.532 1.098 2.532 2.504v.009c0 1.415-1.108 2.434-2.558 2.434Zm7.594-2.197c.712 0 1.266-.562 1.266-1.274a1.25 1.25 0 0 0-1.266-1.266c-.712 0-1.274.554-1.274 1.266s.562 1.274 1.274 1.274Zm0 6.451c.712 0 1.266-.562 1.266-1.274a1.25 1.25 0 0 0-1.266-1.266c-.712 0-1.274.554-1.274 1.266s.562 1.274 1.274 1.274Zm7.462 2.066c3.103 0 4.984-2.523 4.984-6.557v-.018c0-4.034-1.881-6.547-4.984-6.547-3.111 0-4.983 2.513-4.983 6.547v-.018c0 4.034 1.872 6.557 4.983 6.557Zm0-1.855c-1.713 0-2.698-1.775-2.698-4.702v-.018c0-2.926.984-4.684 2.698-4.684 1.705 0 2.699 1.758 2.699 4.684v-.018c0 2.927-.994 4.702-2.699 4.702ZM74.113 31h8.912v-1.855H77.11v-.096l2.795-2.654c2.232-2.145 2.927-3.156 2.927-4.65v-.018c0-2.091-1.776-3.63-4.316-3.63-2.575 0-4.526 1.662-4.526 3.982v.062h2.127v-.062c.026-1.222 1.01-2.162 2.417-2.162 1.222 0 2.074.809 2.083 1.942v.018c0 .94-.36 1.582-2.022 3.208l-4.482 4.368V31Z"
      />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────
export default function IphoneTgDemo({ activeStep }: { activeStep: number }) {
  const [visibleMsgs, setVisibleMsgs] = useState<Msg[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  // Reset and replay messages whenever step changes
  useEffect(() => {
    setVisibleMsgs([]);
    const script = SCRIPTS[activeStep] ?? [];
    const timers: ReturnType<typeof setTimeout>[] = [];

    script.forEach((msg) => {
      const t = setTimeout(() => {
        setVisibleMsgs((prev) => [...prev, msg]);
      }, msg.delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [activeStep]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [visibleMsgs]);

  return (
    <div style={{
      width: '310px',
      height: '630px',
      background: '#fff',
      borderRadius: '50px',
      border: '10px solid #1c1c1c',
      position: 'relative',
      boxShadow: '0 50px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <StatusBar />

      {/* Dynamic Island */}
      <div style={{
        position: 'absolute', top: '12px',
        left: '50%', transform: 'translateX(-50%)',
        width: '95px', height: '30px',
        background: '#000', borderRadius: '20px',
        zIndex: 200,
      }} />

      {/* Chat area */}
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `url('https://telegram.org/img/tgme/pattern.svg'), #0f0f0f`,
        backgroundSize: '260px, auto',
      }}>
        {/* TG Header — transparent bg, blends with dark chat */}
        <div style={{
          background: 'transparent',
          padding: '42px 12px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 30,
          flexShrink: 0,
        }}>
          <div style={{
            display:'flex', alignItems:'center', gap:'2px',
            background:'#1c1c1e', padding:'4px 10px 4px 6px', borderRadius:'20px',
          }}>
            <ChevronLeft size={16} color="#fff" />
            <span style={{ color:'#fff', fontSize:'12px', fontWeight:500 }}>22</span>
          </div>
          <div style={{
            background:'#1c1c1e', padding:'4px 16px', borderRadius:'20px',
            textAlign:'center',
          }}>
            <span style={{ fontWeight:600, fontSize:'12px', display:'block', color:'#fff' }}>a4logistics bot</span>
            <span style={{ fontSize:'9px', color:'#8e8e93', display:'block' }}>bot</span>
          </div>
          <div style={{
            width:'32px', height:'32px',
            background: '#72d572',
            color: '#fff', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 600, fontSize: '13px',
          }}>A</div>
        </div>


        {/* Top fade */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:'120px',
          pointerEvents:'none', zIndex:25,
          background:'linear-gradient(to bottom, rgba(15,15,15,1) 0%, rgba(15,15,15,0.8) 25%, rgba(15,15,15,0.45) 55%, rgba(15,15,15,0.1) 80%, rgba(15,15,15,0) 100%)',
        }} />

        {/* Messages */}
        <div ref={chatRef} style={{
          flex:1, padding:'10px 10px 6px',
          display:'flex', flexDirection:'column',
          gap:'6px', zIndex:20, overflowY:'auto',
          scrollbarWidth:'none',
        }}>
          <div style={{
            alignSelf:'center', background:'#1c1c1e', color:'#fff',
            padding:'3px 12px', borderRadius:'12px',
            fontSize:'9px', fontWeight:500, marginBottom:'4px',
          }}>Bugun</div>

          <AnimatePresence>
            {visibleMsgs.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.88, x: msg.from === 'user' ? 40 : -40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                style={{
                  alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  position: 'relative',
                }}
              >
                {msg.type === 'action' ? (
                  /* Bot action card (grey pill list) */
                  <div style={{
                    background: '#1c1c1e',
                    borderRadius: '14px',
                    padding: '10px 12px',
                    width: '210px',
                  }}>
                    {msg.text?.split('\n').map((line, li) => (
                      <div key={li} style={{
                        fontSize: '11px',
                        color: li === 0 ? '#fff' : '#8774e1',
                        fontWeight: li === 0 ? 600 : 500,
                        padding: li > 0 ? '5px 8px' : '0 0 6px 0',
                        marginTop: li > 0 ? '3px' : 0,
                        background: li > 0 ? 'rgba(135,116,225,0.1)' : 'transparent',
                        borderRadius: li > 0 ? '8px' : 0,
                        lineHeight: 1.35,
                        cursor: li > 0 ? 'pointer' : 'default',
                      }}>
                        {line}
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Normal bubble */
                  <div style={{
                    background: msg.from === 'user' ? '#8774e1' : '#1c1c1e',
                    borderRadius: msg.from === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    padding: '8px 10px 20px 10px',
                    minWidth: '80px',
                  }}>
                    <p style={{ fontSize:'12px', lineHeight:1.4, color:'#fff', margin:0, whiteSpace:'pre-wrap' }}>
                      {msg.text}
                    </p>
                    <span style={{
                      color: msg.from === 'user' ? 'rgba(255,255,255,0.7)' : '#8e8e93', fontSize:'8.5px',
                      position:'absolute', bottom:'4px', right:'8px',
                    }}>
                      {msg.from === 'user' ? '17:21 ✓✓' : '17:21'}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom input bar */}
        <div style={{ padding:'6px 8px 22px', zIndex:60, flexShrink:0, background:'transparent' }}>
          <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
            <div style={{ padding: '4px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Paperclip size={20} color="#8e8e93" />
            </div>
            <div style={{
              background:'#1c1c1e',
              borderRadius:'20px', padding:'8px 12px',
              display:'flex', alignItems:'center',
              flex:1, overflow:'hidden',
            }}>
              <span style={{ color:'#8e8e93', fontSize:'13px', flex:1 }}>Сообщение</span>
            </div>
            <div style={{
              background:'#1c1c1e',
              borderRadius:'50%',
              width:'36px', height:'36px',
              display:'flex', alignItems:'center',
              justifyContent:'center',
              flexShrink:0,
            }}>
              <Mic size={18} color="#8e8e93" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
