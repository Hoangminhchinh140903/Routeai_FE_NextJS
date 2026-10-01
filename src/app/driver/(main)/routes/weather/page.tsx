"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Cloud, CloudRain, Droplets, Wind, Sun } from 'lucide-react';

export default function WeatherInfoPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white flex items-center px-4 py-4 border-b border-gray-100 sticky top-0 z-10" style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-lg font-bold text-center mr-6">Thông tin tuyến</h1>
      </div>

      <div className="p-4 space-y-6" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Overview Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
          <h2 className="text-gray-500 font-medium text-sm mb-4 uppercase" style={{ color: '#6b7280', fontWeight: 500, fontSize: '0.875rem', marginBottom: '16px', textTransform: 'uppercase' }}>Tổng quan</h2>
          
          <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="flex items-center text-gray-600" style={{ display: 'flex', alignItems: 'center', color: '#4b5563' }}>
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mr-3 text-xs" style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', fontSize: '0.75rem' }}>A</span>
                Tổng quãng đường
              </div>
              <span className="font-bold text-gray-800" style={{ fontWeight: 'bold', color: '#1f2937' }}>120 km</span>
            </div>
            
            <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="flex items-center text-gray-600" style={{ display: 'flex', alignItems: 'center', color: '#4b5563' }}>
                <span className="w-6 h-6 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mr-3 text-xs" style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', fontSize: '0.75rem' }}>B</span>
                Tổng thời gian
              </div>
              <span className="font-bold text-gray-800" style={{ fontWeight: 'bold', color: '#1f2937' }}>4h 30m</span>
            </div>
            
            <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="flex items-center text-gray-600" style={{ display: 'flex', alignItems: 'center', color: '#4b5563' }}>
                <span className="w-6 h-6 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mr-3 text-xs" style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#faf5ff', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', fontSize: '0.75rem' }}>N</span>
                Số điểm giao
              </div>
              <span className="font-bold text-gray-800" style={{ fontWeight: 'bold', color: '#1f2937' }}>25</span>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-gray-100" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #f3f4f6' }}>
              <div className="flex items-center text-gray-600" style={{ display: 'flex', alignItems: 'center', color: '#4b5563' }}>
                Chi phí ước tính
              </div>
              <span className="font-bold text-lg text-primary" style={{ fontWeight: 'bold', fontSize: '1.125rem', color: 'var(--color-primary)' }}>150.000 đ</span>
            </div>
          </div>
        </div>

        {/* Weather Forecast */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
          <div className="flex justify-between items-center mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="text-gray-800 font-bold" style={{ color: '#1f2937', fontWeight: 'bold' }}>Dự báo thời tiết</h2>
            <button className="text-gray-400" style={{ color: '#9ca3af' }}>
              <ChevronLeft className="rotate-[-90deg]" size={20} style={{ transform: 'rotate(-90deg)' }} />
            </button>
          </div>

          <div className="flex items-center justify-between mb-8" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
              <Cloud size={64} className="text-gray-400 mr-4" style={{ color: '#9ca3af', marginRight: '16px' }} />
              <div>
                <div className="text-4xl font-bold text-gray-800 leading-none mb-1" style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', lineHeight: 1, marginBottom: '4px' }}>28°</div>
                <div className="text-gray-500 font-medium" style={{ color: '#6b7280', fontWeight: 500 }}>Có mây</div>
              </div>
            </div>
            <div className="flex gap-4" style={{ display: 'flex', gap: '16px' }}>
              <div className="flex flex-col items-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Droplets size={20} className="text-blue-400 mb-1" style={{ color: '#60a5fa', marginBottom: '4px' }} />
                <span className="text-gray-600 font-bold text-sm" style={{ color: '#4b5563', fontWeight: 'bold', fontSize: '0.875rem' }}>30%</span>
              </div>
              <div className="flex flex-col items-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Wind size={20} className="text-teal-400 mb-1" style={{ color: '#2dd4bf', marginBottom: '4px' }} />
                <span className="text-gray-600 font-bold text-sm" style={{ color: '#4b5563', fontWeight: 'bold', fontSize: '0.875rem' }}>30%</span>
              </div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="flex flex-col items-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="text-gray-500 text-sm mb-2" style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '8px' }}>09h</span>
              <Cloud size={24} className="text-gray-400 mb-2" style={{ color: '#9ca3af', marginBottom: '8px' }} />
              <span className="font-bold text-gray-800" style={{ fontWeight: 'bold', color: '#1f2937' }}>28°</span>
            </div>
            <div className="flex flex-col items-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="text-gray-500 text-sm mb-2" style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '8px' }}>10h</span>
              <Cloud size={24} className="text-gray-400 mb-2" style={{ color: '#9ca3af', marginBottom: '8px' }} />
              <span className="font-bold text-gray-800" style={{ fontWeight: 'bold', color: '#1f2937' }}>29°</span>
            </div>
            <div className="flex flex-col items-center bg-blue-50 px-3 py-2 rounded-xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#eff6ff', padding: '8px 12px', borderRadius: '12px' }}>
              <span className="text-blue-500 font-bold text-sm mb-2" style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '0.875rem', marginBottom: '8px' }}>11h</span>
              <CloudRain size={24} className="text-blue-400 mb-2" style={{ color: '#60a5fa', marginBottom: '8px' }} />
              <span className="font-bold text-blue-600" style={{ fontWeight: 'bold', color: '#2F80FF' }}>30°</span>
            </div>
            <div className="flex flex-col items-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="text-gray-500 text-sm mb-2" style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '8px' }}>12h</span>
              <Sun size={24} className="text-orange-400 mb-2" style={{ color: '#fb923c', marginBottom: '8px' }} />
              <span className="font-bold text-gray-800" style={{ fontWeight: 'bold', color: '#1f2937' }}>31°</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
