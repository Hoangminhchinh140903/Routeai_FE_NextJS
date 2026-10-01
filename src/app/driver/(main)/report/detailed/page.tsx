"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronDown, CheckCircle2, TrendingUp, Route } from 'lucide-react';

export default function DetailedReportPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header */}
      <div className="bg-white flex items-center px-4 py-4 border-b border-gray-100 sticky top-0 z-10" style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-lg font-bold text-center mr-6">Thống kê chi tiết</h1>
      </div>

      <div className="p-4 space-y-6" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Month Filter */}
        <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-xl font-bold text-gray-800" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Tháng 5/2024</h2>
          <button className="flex items-center text-primary font-medium bg-primary/10 px-3 py-1.5 rounded-lg" style={{ display: 'flex', alignItems: 'center', color: 'var(--color-primary)', fontWeight: 500, backgroundColor: 'rgba(47, 128, 255, 0.1)', padding: '6px 12px', borderRadius: '8px', border: 'none' }}>
            Tháng này <ChevronDown size={16} className="ml-1" style={{ marginLeft: '4px' }} />
          </button>
        </div>

        {/* Line Chart Area */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 className="text-gray-500 font-medium text-sm mb-4" style={{ color: '#6b7280', fontWeight: 500, fontSize: '0.875rem', marginBottom: '16px', margin: 0 }}>Doanh thu (triệu đồng)</h3>
          
          <div className="h-48 relative w-full" style={{ height: '192px', position: 'relative', width: '100%' }}>
            {/* SVG Line Chart Mockup */}
            <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="0" x2="400" y2="0" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="#f3f4f6" strokeWidth="1" />
              
              {/* Data Area */}
              <path d="M0,150 L0,120 L50,80 L100,100 L150,50 L200,70 L250,20 L300,40 L350,10 L400,30 L400,150 Z" fill="url(#chartGradient)" />
              
              {/* Data Line */}
              <path d="M0,120 L50,80 L100,100 L150,50 L200,70 L250,20 L300,40 L350,10 L400,30" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Data Points */}
              <circle cx="50" cy="80" r="4" fill="white" stroke="var(--color-primary)" strokeWidth="2" />
              <circle cx="150" cy="50" r="4" fill="white" stroke="var(--color-primary)" strokeWidth="2" />
              <circle cx="250" cy="20" r="4" fill="white" stroke="var(--color-primary)" strokeWidth="2" />
              <circle cx="350" cy="10" r="4" fill="white" stroke="var(--color-primary)" strokeWidth="2" />
            </svg>
            
            {/* X Axis */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-400" style={{ position: 'absolute', bottom: '-24px', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9ca3af' }}>
              <span>1</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <h3 className="font-bold text-gray-800 text-lg mb-1" style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '1.125rem', marginBottom: '4px' }}>Thống kê</h3>
        <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div className="bg-white rounded-xl p-4 flex items-center shadow-sm border border-gray-100" style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center mr-4" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f0fdf4', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
              <CheckCircle2 size={20} />
            </div>
            <div className="flex-1" style={{ flex: 1 }}>
              <div className="text-gray-500 text-sm font-medium" style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 500 }}>Đơn hoàn thành</div>
              <div className="text-gray-800 font-bold text-lg" style={{ color: '#1f2937', fontWeight: 'bold', fontSize: '1.125rem' }}>450</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 flex items-center shadow-sm border border-gray-100" style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mr-4" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
              <TrendingUp size={20} />
            </div>
            <div className="flex-1" style={{ flex: 1 }}>
              <div className="text-gray-500 text-sm font-medium" style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 500 }}>Tổng doanh thu</div>
              <div className="text-gray-800 font-bold text-lg" style={{ color: '#1f2937', fontWeight: 'bold', fontSize: '1.125rem' }}>25.400.000 đ</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 flex items-center shadow-sm border border-gray-100" style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mr-4" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
              <Route size={20} />
            </div>
            <div className="flex-1" style={{ flex: 1 }}>
              <div className="text-gray-500 text-sm font-medium" style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 500 }}>Tổng quãng đường</div>
              <div className="text-gray-800 font-bold text-lg" style={{ color: '#1f2937', fontWeight: 'bold', fontSize: '1.125rem' }}>2,150 km</div>
            </div>
          </div>

        </div>

        {/* Transaction History */}
        <h3 className="font-bold text-gray-800 text-lg mt-6 mb-1" style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '1.125rem', marginTop: '24px', marginBottom: '4px' }}>Lịch sử giao dịch</h3>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div className="flex justify-between items-center pb-4 border-b border-gray-50" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #f9fafb' }}>
              <div>
                <div className="font-bold text-gray-800 text-base" style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '1rem' }}>Tuyến sáng 12/05</div>
                <div className="text-gray-500 text-sm" style={{ color: '#6b7280', fontSize: '0.875rem' }}>12/05/2024 - 12:30</div>
              </div>
              <div className="font-bold text-primary" style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>+ 250.000 đ</div>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-50" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #f9fafb' }}>
              <div>
                <div className="font-bold text-gray-800 text-base" style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '1rem' }}>Tuyến chiều 11/05</div>
                <div className="text-gray-500 text-sm" style={{ color: '#6b7280', fontSize: '0.875rem' }}>11/05/2024 - 18:00</div>
              </div>
              <div className="font-bold text-primary" style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>+ 180.000 đ</div>
            </div>

            <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="font-bold text-gray-800 text-base" style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '1rem' }}>Tuyến sáng 11/05</div>
                <div className="text-gray-500 text-sm" style={{ color: '#6b7280', fontSize: '0.875rem' }}>11/05/2024 - 12:00</div>
              </div>
              <div className="font-bold text-primary" style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>+ 320.000 đ</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
