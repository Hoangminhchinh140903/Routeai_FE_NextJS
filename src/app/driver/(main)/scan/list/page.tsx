"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, GripVertical, Sparkles } from 'lucide-react';

export default function ScanListPage() {
  const router = useRouter();
  
  const items = [
    { id: 1, name: 'Nguyễn Thị Lan', address: '72 Nguyễn Trãi, P. Bến Thành, Q.1, TP.HCM' },
    { id: 2, name: 'Trần Văn An', address: '15 Phan Đăng Lưu, P.3, Q. Phú Nhuận, TP.HCM' },
    { id: 3, name: 'Lê Hoàng Nam', address: '88 Cách Mạng Tháng 8, P.6, Q.3, TP.HCM' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col pb-40">
      {/* Header */}
      <div className="bg-white flex justify-between items-center px-4 py-4 border-b border-gray-100 sticky top-0 z-10" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Danh sách điểm giao (3)</h1>
        <button className="p-2 -mr-2 text-primary font-medium text-sm">
          Sửa
        </button>
      </div>

      <div className="p-4" style={{ padding: '16px' }}>
        <div className="flex justify-between items-center mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className="text-sm text-gray-500" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Sắp xếp theo: <span className="font-semibold text-gray-800" style={{ fontWeight: 600, color: '#1f2937' }}>Mặc định ▾</span></div>
        </div>

        {/* Address List */}
        <div className="space-y-3 relative" style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
          {/* Vertical connection line */}
          <div className="absolute left-[19px] top-8 bottom-8 w-[2px] bg-gray-200 z-0" style={{ position: 'absolute', left: '19px', top: '32px', bottom: '32px', width: '2px', backgroundColor: '#e5e7eb', zIndex: 0 }}></div>
          
          {items.map((item, index) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center relative z-10" style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 10 }}>
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold mr-4 shrink-0 shadow-[0_0_0_4px_white]" style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', marginRight: '16px', flexShrink: 0, boxShadow: '0 0 0 4px white' }}>
                {index + 1}
              </div>
              <div className="flex-1 pr-4" style={{ flex: 1, paddingRight: '16px' }}>
                <h3 className="font-bold text-gray-800 text-base mb-1" style={{ fontWeight: 'bold', fontSize: '1rem', color: '#1f2937', margin: 0, marginBottom: '4px' }}>{item.name}</h3>
                <p className="text-gray-500 text-sm leading-snug" style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0, lineHeight: 1.4 }}>{item.address}</p>
              </div>
              <button className="text-gray-300 p-2 shrink-0 active:text-gray-500" style={{ color: '#d1d5db', padding: '8px', flexShrink: 0 }}>
                <GripVertical size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Optimization Box */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white p-4 border-t border-gray-100 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] z-20" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', backgroundColor: 'white', padding: '16px', borderTop: '1px solid #f3f4f6', boxShadow: '0 -10px 20px rgba(0,0,0,0.03)', zIndex: 20 }}>
        <div className="bg-primary/5 rounded-2xl p-4 mb-4 border border-primary/20" style={{ backgroundColor: 'rgba(47, 128, 255, 0.05)', borderRadius: '16px', padding: '16px', marginBottom: '16px', border: '1px solid rgba(47, 128, 255, 0.2)' }}>
          <div className="flex items-center text-primary font-bold mb-1" style={{ display: 'flex', alignItems: 'center', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '4px' }}>
            <Sparkles size={18} className="mr-2" style={{ marginRight: '8px' }} />
            Tối ưu tuyến
          </div>
          <p className="text-gray-500 text-sm" style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>Tìm thứ tự giao hàng tối ưu nhất, tiết kiệm thời gian và nhiên liệu.</p>
        </div>
        
        <button 
          onClick={() => router.push('/driver/scan/optimizing')}
          className="w-full py-3.5 px-4 rounded-xl bg-primary text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform"
          style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 'bold', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: '0 10px 15px -3px rgba(47, 128, 255, 0.3)' }}
        >
          Tối ưu ngay
        </button>
      </div>
    </div>
  );
}
