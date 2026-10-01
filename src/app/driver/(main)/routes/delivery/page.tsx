"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Check, Phone, XCircle, MoreHorizontal } from 'lucide-react';

export default function DeliveryStatusPage() {
  const router = useRouter();

  const handleSuccess = () => {
    alert("Cập nhật thành công!");
    router.back();
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col pb-10">
      {/* Header */}
      <div className="bg-white flex items-center justify-between px-4 py-4 border-b border-gray-100 sticky top-0 z-10" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Giao hàng</h1>
        <button className="p-2 -mr-2 text-gray-700">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        
        {/* Progress Pill */}
        <div className="bg-gray-100 text-gray-600 font-bold px-4 py-1.5 rounded-full text-sm mb-12" style={{ backgroundColor: '#f3f4f6', color: '#4b5563', fontWeight: 'bold', padding: '6px 16px', borderRadius: '999px', fontSize: '0.875rem', marginBottom: '48px' }}>
          Điểm 5/25
        </div>

        {/* Status Icon */}
        <div className="relative mb-8" style={{ position: 'relative', marginBottom: '32px' }}>
          <div className="w-24 h-24 bg-green-100 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" style={{ width: '96px', height: '96px', backgroundColor: '#dcfce7', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
          <div className="w-20 h-20 bg-green-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center relative z-10" style={{ width: '80px', height: '80px', backgroundColor: '#22c55e', borderRadius: '50%', border: '4px solid white', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
            <Check size={40} className="text-white" strokeWidth={3} />
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes ping {
            75%, 100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
          }
        `}} />

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '8px' }}>Đã đến nơi</h2>
        <p className="text-gray-500 max-w-[250px] leading-relaxed mb-12" style={{ color: '#6b7280', maxWidth: '250px', lineHeight: 1.5, margin: 0, marginBottom: '48px' }}>
          72 Nguyễn Trãi, P. Bến Thành, Q.1, TP.HCM
        </p>

        {/* Actions */}
        <div className="w-full space-y-4" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button 
            onClick={handleSuccess}
            className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform"
            style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 'bold', fontSize: '1.125rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(47, 128, 255, 0.3)' }}
          >
            Đã giao thành công
          </button>

          <button 
            className="w-full py-4 rounded-xl border border-gray-200 text-gray-700 font-bold bg-white flex items-center justify-center gap-2 active:bg-gray-50 transition-colors"
            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb', color: '#374151', fontWeight: 'bold', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <XCircle size={20} className="text-red-500" style={{ color: '#ef4444' }} />
            Khách chưa nhận
          </button>

          <button 
            className="w-full py-4 rounded-xl border border-gray-200 text-gray-700 font-bold bg-white flex items-center justify-center gap-2 active:bg-gray-50 transition-colors"
            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb', color: '#374151', fontWeight: 'bold', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Phone size={20} className="text-primary" style={{ color: 'var(--color-primary)' }} />
            Gọi khách hàng
          </button>
        </div>
      </div>
    </div>
  );
}
