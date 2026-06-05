'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedStats({ progress = 98, totalSent = 1127 }: { progress?: number, totalSent?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const validProgress = isNaN(progress) ? 0 : progress;
  const progressOffset = 251.2 - (251.2 * (validProgress / 100));

  return (
    <div className="space-y-6">
      {/* 1. Live Activity Volume Bars */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-medium text-[#8A8F98] uppercase tracking-wider">Jonli Tarqatma</span>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] text-green-500 font-medium">LIVE</span>
          </div>
        </div>
        <div className="flex items-end gap-1 h-12">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="w-full bg-gradient-to-t from-white/10 to-white/40 rounded-t-sm"
              initial={{ height: '10%' }}
              animate={{
                height: [`${Math.random() * 40 + 20}%`, `${Math.random() * 60 + 40}%`, `${Math.random() * 30 + 10}%`],
              }}
              transition={{
                duration: Math.random() * 1.5 + 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 my-4"></div>

      {/* 2. Success Rate Donut Chart */}
      <div>
        <div className="text-[11px] font-medium text-[#8A8F98] mb-4 uppercase tracking-wider">Muvaffaqiyat ko'rsatkichi</div>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
              {/* Background circle */}
              <circle
                cx="50" cy="50" r="40"
                fill="transparent"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="12"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50" cy="50" r="40"
                fill="transparent"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeDasharray="251.2"
                strokeDashoffset="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: progressOffset }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="100%" stopColor="#666" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-[13px] font-bold text-white">{Math.floor(validProgress)}%</span>
            </div>
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span className="text-[#8A8F98]">Yuborildi</span>
              </div>
              <span className="text-white font-medium">{totalSent}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <span className="text-[#8A8F98]">Xatolik</span>
              </div>
              <span className="text-white font-medium">23</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 my-4"></div>

      {/* 3. Hourly Velocity Bar Chart */}
      <div>
        <div className="text-[11px] font-medium text-[#8A8F98] mb-4 uppercase tracking-wider">Soatlik tezlik</div>
        <div className="flex items-end gap-2 h-16">
          {[30, 45, 25, 60, 85, 50, 70].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1">
              <motion.div
                className="w-full bg-white/20 rounded-t-sm relative group cursor-pointer hover:bg-white/40 transition-colors"
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 + (i * 0.1) }}
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1c1c1e] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {val * 10} msg
                </div>
              </motion.div>
              <span className="text-[9px] text-[#8A8F98]">{i + 8}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
