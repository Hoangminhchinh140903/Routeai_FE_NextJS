"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Clock, Calendar } from 'lucide-react';

export default function RouteDetailPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col relative h-[100dvh] overflow-hidden">
      {/* Header overlaid on map */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center" style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <ChevronLeft size={24} className="-ml-1" />
        </button>
        <div className="bg-white px-4 py-2 rounded-full shadow-md font-bold text-gray-800 text-sm" style={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: '999px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', color: '#1f2937', fontSize: '0.875rem' }}>
          Chi tiết tuyến
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Map Background (Mockup) */}
      <div className="flex-1 bg-gray-200 relative overflow-hidden" style={{ flex: 1, backgroundColor: '#e5e7eb', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#d1d5db 1px, transparent 1px), linear-gradient(90deg, #d1d5db 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }}></div>
        
        {/* Mock Route Path SVG */}
        <svg className="absolute inset-0 w-full h-full" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}>
          <path d="M100,100 L200,80 L250,150 L180,220 L80,180 Z" fill="none" stroke="var(--color-primary)" strokeWidth="4" strokeLinejoin="round" />
          
          <circle cx="100" cy="100" r="6" fill="white" stroke="var(--color-primary)" strokeWidth="3" />
          <circle cx="200" cy="80" r="6" fill="white" stroke="var(--color-primary)" strokeWidth="3" />
          <circle cx="250" cy="150" r="6" fill="white" stroke="var(--color-primary)" strokeWidth="3" />
          <circle cx="180" cy="220" r="6" fill="white" stroke="var(--color-primary)" strokeWidth="3" />
          <circle cx="80" cy="180" r="6" fill="white" stroke="var(--color-primary)" strokeWidth="3" />
        </svg>
      </div>

      {/* Bottom Sheet Details */}
      <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30 p-6" style={{ backgroundColor: 'white', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', boxShadow: '0 -10px 40px rgba(0,0,0,0.1)', zIndex: 30, padding: '24px' }}>
        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" style={{ width: '48px', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '999px', margin: '0 auto 24px' }}></div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-4" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Tuyến sáng 12/05</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div className="flex items-center text-gray-600 text-sm" style={{ display: 'flex', alignItems: 'center', color: '#4b5563', fontSize: '0.875rem' }}>
            <MapPin size={18} className="mr-2 text-gray-400" style={{ marginRight: '8px', color: '#9ca3af' }} />
            25 điểm giao
          </div>
          <div className="flex items-center text-gray-600 text-sm" style={{ display: 'flex', alignItems: 'center', color: '#4b5563', fontSize: '0.875rem' }}>
            <MapPin size={18} className="mr-2 text-gray-400 opacity-0" style={{ marginRight: '8px', color: '#9ca3af', opacity: 0 }} /> {/* Spacer icon */}
            120 km
          </div>
          <div className="flex items-center text-gray-600 text-sm" style={{ display: 'flex', alignItems: 'center', color: '#4b5563', fontSize: '0.875rem' }}>
            <Clock size={18} className="mr-2 text-gray-400" style={{ marginRight: '8px', color: '#9ca3af' }} />
            4h 30m
          </div>
          <div className="flex items-center text-gray-600 text-sm" style={{ display: 'flex', alignItems: 'center', color: '#4b5563', fontSize: '0.875rem' }}>
            <Calendar size={18} className="mr-2 text-gray-400" style={{ marginRight: '8px', color: '#9ca3af' }} />
            Tạo ngày: 12/05/2024
          </div>
        </div>

        <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => router.push('/driver/routes/navigate')}
            className="w-full py-3.5 px-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform"
            style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 'bold', fontSize: '1.125rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(47, 128, 255, 0.3)' }}
          >
            Bắt đầu giao hàng
          </button>
          
          <button 
            className="w-full py-3.5 px-4 rounded-xl border border-gray-200 text-gray-700 font-bold bg-white active:bg-gray-50 transition-colors"
            style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e5e7eb', color: '#374151', fontWeight: 'bold', backgroundColor: 'white' }}
          >
            Chỉnh sửa tuyến
          </button>

          <button 
            className="w-full py-3.5 px-4 rounded-xl text-gray-500 font-medium bg-white active:bg-gray-50 transition-colors"
            style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', color: '#6b7280', fontWeight: 500, backgroundColor: 'white', border: 'none' }}
          >
            Xóa tuyến
          </button>
        </div>
      </div>
    </div>
  );
}
