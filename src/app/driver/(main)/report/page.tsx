"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';

export default function DailyReportPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white flex items-center px-4 py-4 border-b border-gray-100 sticky top-0 z-10" style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-lg font-bold text-center mr-6">Báo cáo</h1>
      </div>

      <div className="p-4 space-y-6" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1" style={{ display: 'flex', backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '4px' }}>
          <button className="flex-1 py-2 text-sm font-bold bg-white text-gray-800 rounded-lg shadow-sm" style={{ flex: 1, padding: '8px 0', fontSize: '0.875rem', fontWeight: 'bold', backgroundColor: 'white', color: '#1f2937', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: 'none' }}>
            Ngày
          </button>
          <button className="flex-1 py-2 text-sm font-medium text-gray-500 rounded-lg" style={{ flex: 1, padding: '8px 0', fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', borderRadius: '8px', backgroundColor: 'transparent', border: 'none' }}>
            Tuần
          </button>
          <button className="flex-1 py-2 text-sm font-medium text-gray-500 rounded-lg" style={{ flex: 1, padding: '8px 0', fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', borderRadius: '8px', backgroundColor: 'transparent', border: 'none' }}>
            Tháng
          </button>
        </div>

        {/* Date Selector */}
        <div className="flex justify-between items-center bg-white rounded-xl p-3 border border-gray-100 shadow-sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: '12px', padding: '12px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <button className="p-1 text-gray-400" style={{ padding: '4px', color: '#9ca3af', border: 'none', backgroundColor: 'transparent' }}>
            <ChevronLeft size={20} />
          </button>
          <span className="font-bold text-gray-800" style={{ fontWeight: 'bold', color: '#1f2937' }}>12/05/2024</span>
          <button className="p-1 text-gray-400" style={{ padding: '4px', color: '#9ca3af', border: 'none', backgroundColor: 'transparent' }}>
            <ChevronRightIcon size={20} />
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <span className="text-gray-500 text-xs font-medium mb-2" style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500, marginBottom: '8px' }}>Tổng đơn</span>
            <span className="text-2xl font-bold text-gray-800" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>25</span>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <span className="text-gray-500 text-xs font-medium mb-2" style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500, marginBottom: '8px' }}>Hoàn thành</span>
            <span className="text-2xl font-bold text-primary" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>23</span>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <span className="text-gray-500 text-xs font-medium mb-2" style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500, marginBottom: '8px' }}>Tỷ lệ nhận</span>
            <span className="text-2xl font-bold text-primary" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>92%</span>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex justify-between items-center" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="flex flex-col gap-1" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span className="text-gray-500 text-xs font-medium" style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500 }}>Doanh thu</span>
            <span className="text-gray-800 font-bold" style={{ color: '#1f2937', fontWeight: 'bold' }}>1.250.000 đ</span>
          </div>
          <div className="w-px h-8 bg-gray-200" style={{ width: '1px', height: '32px', backgroundColor: '#e5e7eb' }}></div>
          <div className="flex flex-col gap-1" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span className="text-gray-500 text-xs font-medium" style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500 }}>Quãng đường</span>
            <span className="text-gray-800 font-bold" style={{ color: '#1f2937', fontWeight: 'bold' }}>120 km</span>
          </div>
          <div className="w-px h-8 bg-gray-200" style={{ width: '1px', height: '32px', backgroundColor: '#e5e7eb' }}></div>
          <div className="flex flex-col gap-1" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span className="text-gray-500 text-xs font-medium" style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 500 }}>Thời gian</span>
            <span className="text-gray-800 font-bold" style={{ color: '#1f2937', fontWeight: 'bold' }}>4h 30m</span>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <div className="flex justify-between items-center mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 className="font-bold text-gray-800 text-base" style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '1rem', margin: 0 }}>Số đơn theo khung giờ</h3>
            <button onClick={() => router.push('/driver/report/detailed')} className="text-primary text-sm font-medium" style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 500, backgroundColor: 'transparent', border: 'none' }}>
              Chi tiết
            </button>
          </div>
          
          <div className="flex items-end justify-between h-40 pt-4" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '160px', paddingTop: '16px' }}>
            {[
              { label: '06h', h: '30%' },
              { label: '08h', h: '60%' },
              { label: '10h', h: '40%' },
              { label: '12h', h: '90%' },
              { label: '14h', h: '50%' },
              { label: '16h', h: '70%' },
              { label: '18h', h: '40%' },
              { label: '20h', h: '20%' },
            ].map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '24px' }}>
                <div className="w-5 bg-primary/20 rounded-t-sm" style={{ width: '20px', height: '120px', backgroundColor: 'rgba(47, 128, 255, 0.1)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px', position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
                  <div className="w-full bg-primary rounded-t-sm" style={{ width: '100%', height: bar.h, backgroundColor: 'var(--color-primary)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}></div>
                </div>
                <span className="text-xs text-gray-400" style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
