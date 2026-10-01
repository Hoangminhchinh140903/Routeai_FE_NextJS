"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Clock, Banknote, Navigation } from 'lucide-react';
import Link from 'next/link';

export default function OptimizedRoutePage() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col relative h-[100dvh] overflow-hidden">
      {/* Header overlaid on map */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center" style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <ChevronLeft size={24} className="-ml-1" />
        </button>
        <div className="bg-white px-4 py-2 rounded-full shadow-md font-bold text-gray-800 text-sm" style={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: '999px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', color: '#1f2937', fontSize: '0.875rem' }}>
          Tuyến được tối ưu
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Map Background (Mockup) */}
      <div className="flex-1 bg-gray-200 relative overflow-hidden" style={{ flex: 1, backgroundColor: '#e5e7eb', position: 'relative', overflow: 'hidden' }}>
        {/* Simple map grid lines */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#d1d5db 1px, transparent 1px), linear-gradient(90deg, #d1d5db 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }}></div>
        
        {/* Mock Route Path SVG */}
        <svg className="absolute inset-0 w-full h-full" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}>
          <path d="M100,150 L200,100 L250,200 L150,300 L50,250 Z" fill="none" stroke="var(--color-primary)" strokeWidth="6" strokeLinejoin="round" />
          <path d="M100,150 L200,100 L250,200 L150,300 L50,250 Z" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeLinejoin="round" />
        </svg>

        {/* Map Pins */}
        {[
          { x: 100, y: 150, n: 1, bg: 'var(--color-primary)' },
          { x: 200, y: 100, n: 2, bg: '#3b82f6' },
          { x: 250, y: 200, n: 3, bg: '#f59e0b' },
          { x: 150, y: 300, n: 4, bg: '#10b981' },
          { x: 50, y: 250, n: 5, bg: '#8b5cf6' },
        ].map(pin => (
          <div key={pin.n} className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-full" style={{ position: 'absolute', left: pin.x, top: pin.y, transform: 'translate(-50%, -100%)', zIndex: 10 }}>
            <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold shadow-lg text-sm border-2 border-white" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: pin.bg, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '0.875rem', border: '2px solid white' }}>
              {pin.n}
            </div>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px]" style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `8px solid ${pin.bg}`, marginTop: '-2px' }}></div>
          </div>
        ))}
        
        {/* Current Location */}
        <div className="absolute" style={{ left: 100, top: 150, transform: 'translate(-50%, -50%)' }}>
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md z-20" style={{ width: '16px', height: '16px', backgroundColor: '#3b82f6', borderRadius: '50%', border: '2px solid white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}></div>
          <div className="w-12 h-12 bg-blue-500/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(59, 130, 246, 0.2)', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ping {
          75%, 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
      `}} />

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30 p-6" style={{ backgroundColor: 'white', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', boxShadow: '0 -10px 40px rgba(0,0,0,0.1)', zIndex: 30, padding: '24px' }}>
        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" style={{ width: '48px', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '999px', margin: '0 auto 24px' }}></div>
        
        <div className="grid grid-cols-2 gap-4 mb-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div className="flex items-center text-gray-500 text-sm mb-1" style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '0.875rem', marginBottom: '4px' }}>
              <MapPin size={16} className="mr-1" /> 25 điểm giao
            </div>
            <div className="flex items-center text-gray-500 text-sm" style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
              <Clock size={16} className="mr-1" /> 4h 30m
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-500 text-sm mb-1" style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '4px' }}>Chi phí ước tính</div>
            <div className="text-lg font-bold text-gray-800" style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>150.000 đ</div>
          </div>
        </div>

        <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => router.push('/driver/routes/navigate')}
            className="w-full py-4 px-4 rounded-xl bg-primary text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-primary/30"
            style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 'bold', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: '0 10px 15px -3px rgba(47, 128, 255, 0.3)' }}
          >
            Bắt đầu giao hàng
          </button>
          
          <button 
            className="w-full py-4 px-4 rounded-xl border-2 border-primary text-primary font-bold text-lg bg-white"
            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.125rem', backgroundColor: 'white' }}
          >
            Lưu tuyến này
          </button>
        </div>
      </div>
    </div>
  );
}
