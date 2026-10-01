"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Settings, Navigation, CloudRain, ShieldAlert, PackageCheck } from 'lucide-react';
import Link from 'next/link';

export default function NavigatePage() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col relative h-[100dvh] overflow-hidden">
      
      {/* Top Navigation Instruction Header */}
      <div className="bg-[#1f2937] text-white p-4 flex items-center z-20 shadow-lg" style={{ backgroundColor: '#1f2937', color: 'white', padding: '16px', display: 'flex', alignItems: 'center', zIndex: 20, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
        <div className="flex flex-col items-center justify-center mr-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
          <ArrowUpRight size={32} strokeWidth={3} className="text-white" />
          <div className="font-bold text-lg leading-none mt-1" style={{ fontWeight: 'bold', fontSize: '1.125rem', lineHeight: 1, marginTop: '4px' }}>{'>'}1</div>
        </div>
        <div className="flex-1" style={{ flex: 1 }}>
          <div className="text-gray-400 text-sm font-medium mb-1" style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500, marginBottom: '4px' }}>Điểm đến tiếp theo</div>
          <div className="font-bold text-xl truncate" style={{ fontWeight: 'bold', fontSize: '1.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>72 Nguyễn Trãi, Q.1</div>
          <div className="text-gray-300 font-medium" style={{ color: '#d1d5db', fontWeight: 500 }}>2,5 km • 8 phút</div>
        </div>
        <button className="p-2 ml-2" style={{ padding: '8px', marginLeft: '8px' }}>
          <Settings size={24} />
        </button>
      </div>

      {/* Map Background (Mockup) */}
      <div className="flex-1 bg-gray-200 relative overflow-hidden" style={{ flex: 1, backgroundColor: '#e5e7eb', position: 'relative', overflow: 'hidden' }}>
        {/* Simple map grid lines */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#d1d5db 1px, transparent 1px), linear-gradient(90deg, #d1d5db 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }}></div>
        
        {/* Mock Route Path SVG */}
        <svg className="absolute inset-0 w-full h-full" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}>
          {/* Passed path (gray) */}
          <path d="M50,400 L150,300" fill="none" stroke="#9ca3af" strokeWidth="8" strokeLinecap="round" />
          
          {/* Upcoming path (blue) */}
          <path d="M150,300 L250,150 L100,50" fill="none" stroke="var(--color-primary)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Arrow on path */}
          <polygon points="250,150 240,165 260,165" fill="white" transform="rotate(-35 250 150)" />
        </svg>

        {/* Navigation Marker */}
        <div className="absolute" style={{ left: 150, top: 300, transform: 'translate(-50%, -50%)', zIndex: 20 }}>
          <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transform rotate-45 border-4 border-blue-100" style={{ width: '48px', height: '48px', backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(25deg)', border: '4px solid #dbeafe' }}>
            <Navigation size={24} fill="var(--color-primary)" className="text-primary" style={{ color: 'var(--color-primary)' }} />
          </div>
          {/* Ping effect */}
          <div className="w-24 h-24 bg-primary/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping -z-10" style={{ width: '96px', height: '96px', backgroundColor: 'rgba(47, 128, 255, 0.2)', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite', zIndex: -1 }}></div>
        </div>

        {/* Next Point Marker */}
        <div className="absolute" style={{ left: 100, top: 50, transform: 'translate(-50%, -100%)', zIndex: 10 }}>
           <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg border-2 border-white" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2F80FF', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', border: '2px solid white' }}>
            1
          </div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-600 mx-auto" style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '8px solid #2F80FF', margin: '0 auto', marginTop: '-2px' }}></div>
        </div>

        {/* Floating Actions Right */}
        <div className="absolute right-4 top-4 flex flex-col gap-3 z-20" style={{ position: 'absolute', right: '16px', top: '16px', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 20 }}>
          <button onClick={() => router.push('/driver/routes/weather')} className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-700" style={{ width: '48px', height: '48px', backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#374151' }}>
            <CloudRain size={24} />
          </button>
          <button onClick={() => router.push('/driver/routes/traffic')} className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-orange-500" style={{ width: '48px', height: '48px', backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
            <ShieldAlert size={24} />
          </button>
        </div>

        {/* Floating Action Delivery Status */}
        <div className="absolute right-4 bottom-8 z-20" style={{ position: 'absolute', right: '16px', bottom: '32px', zIndex: 20 }}>
          <button onClick={() => router.push('/driver/routes/delivery')} className="w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center text-white relative" style={{ width: '64px', height: '64px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', boxShadow: '0 10px 15px -3px rgba(47, 128, 255, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative' }}>
            <PackageCheck size={32} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white" style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#ef4444', color: 'white', fontSize: '12px', fontWeight: 'bold', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>1</span>
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ping {
          75%, 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
      `}} />

      {/* Bottom Info Bar */}
      <div className="bg-white z-30 flex flex-col" style={{ backgroundColor: 'white', zIndex: 30, display: 'flex', flexDirection: 'column' }}>
        
        {/* Stats Row */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
          <div className="text-center" style={{ textAlign: 'center' }}>
            <div className="text-gray-500 text-xs font-medium uppercase mb-1" style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', marginBottom: '4px' }}>ETA</div>
            <div className="font-bold text-lg text-gray-800" style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937' }}>08:45</div>
          </div>
          <div className="w-px h-10 bg-gray-200" style={{ width: '1px', height: '40px', backgroundColor: '#e5e7eb' }}></div>
          <div className="text-center" style={{ textAlign: 'center' }}>
            <div className="text-gray-500 text-xs font-medium uppercase mb-1" style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', marginBottom: '4px' }}>Còn lại</div>
            <div className="font-bold text-lg text-gray-800" style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937' }}>18 điểm</div>
          </div>
          <div className="w-px h-10 bg-gray-200" style={{ width: '1px', height: '40px', backgroundColor: '#e5e7eb' }}></div>
          <div className="text-center" style={{ textAlign: 'center' }}>
            <div className="text-gray-500 text-xs font-medium uppercase mb-1" style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', marginBottom: '4px' }}>Còn lại</div>
            <div className="font-bold text-lg text-gray-800" style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937' }}>3h 25m</div>
          </div>
        </div>

        {/* Action Row */}
        <div className="p-4 flex gap-3" style={{ padding: '16px', display: 'flex', gap: '12px' }}>
          <button onClick={() => router.push('/driver/home')} className="flex-1 py-3 px-4 rounded-xl border-2 border-red-500 text-red-500 font-bold bg-white" style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '2px solid #ef4444', color: '#ef4444', fontWeight: 'bold', backgroundColor: 'white' }}>
            Kết thúc tuyến
          </button>
        </div>
        
      </div>
    </div>
  );
}
