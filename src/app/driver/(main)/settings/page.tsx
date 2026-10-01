"use client";
import React from 'react';
import { User, Crown, Map, Bell, HelpCircle, LogOut, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const userName = user?.full_name || user?.email?.split('@')[0] || 'Nguyễn Văn A';

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white flex items-center justify-center px-4 py-4 border-b border-gray-100 sticky top-0 z-10" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 10 }}>
        <h1 className="text-lg font-bold text-gray-800" style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>Cài đặt</h1>
      </div>

      <div className="p-4 space-y-6" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Profile Card */}
        <div onClick={() => router.push('/driver/profile')} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center active:bg-gray-50 cursor-pointer transition-colors" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center' }}>
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mr-4 border-2 border-primary/20" style={{ width: '64px', height: '64px', backgroundColor: '#e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginRight: '16px', border: '2px solid rgba(47, 128, 255, 0.2)' }}>
            <User size={32} className="text-gray-400 mt-2" style={{ color: '#9ca3af', marginTop: '8px' }} />
          </div>
          <div className="flex-1" style={{ flex: 1 }}>
            <h2 className="text-xl font-bold text-gray-800 mb-1" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>{userName}</h2>
            <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded flex items-center" style={{ backgroundColor: 'rgba(47, 128, 255, 0.1)', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                <Crown size={12} className="mr-1" style={{ marginRight: '4px' }} />
                Tài khoản Pro
              </span>
            </div>
          </div>
          <ChevronRight className="text-gray-300" style={{ color: '#d1d5db' }} />
        </div>

        {/* Current Plan */}
        <div>
          <h3 className="font-bold text-gray-800 text-base mb-3 ml-1" style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '1rem', marginBottom: '12px', marginLeft: '4px' }}>Gói cước hiện tại</h3>
          <div className="bg-gradient-to-br from-primary to-teal-500 rounded-2xl p-5 shadow-lg shadow-primary/20 text-white" style={{ background: 'linear-gradient(to bottom right, var(--color-primary), #0B1F3B)', borderRadius: '16px', padding: '20px', boxShadow: '0 10px 15px -3px rgba(47, 128, 255, 0.2)', color: 'white' }}>
            <div className="flex justify-between items-start mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div className="flex items-center text-white/80 text-sm font-medium mb-1" style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '4px' }}>
                  <Crown size={16} className="mr-1.5" style={{ marginRight: '6px' }} />
                  Gói Cao Cấp
                </div>
                <h4 className="text-2xl font-bold" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>R:t Pro</h4>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm" style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 'bold', backdropFilter: 'blur(4px)' }}>
                Đang hoạt động
              </div>
            </div>
            
            <ul className="space-y-2 mb-6" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <li className="flex items-center text-sm text-white/90" style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: 'rgba(255,255,255,0.9)' }}>
                <CheckCircle2 size={16} className="mr-2 text-green-300" style={{ marginRight: '8px', color: '#86efac' }} />
                Tối ưu lên đến 100 điểm giao
              </li>
              <li className="flex items-center text-sm text-white/90" style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: 'rgba(255,255,255,0.9)' }}>
                <CheckCircle2 size={16} className="mr-2 text-green-300" style={{ marginRight: '8px', color: '#86efac' }} />
                Báo cáo & Thống kê chi tiết
              </li>
            </ul>

            <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-sm text-white/80" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>Gia hạn: 12/06/2024</span>
              <button className="bg-white text-primary font-bold px-4 py-2 rounded-xl text-sm shadow-sm" style={{ backgroundColor: 'white', color: 'var(--color-primary)', fontWeight: 'bold', padding: '8px 16px', borderRadius: '12px', fontSize: '0.875rem', border: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                Nâng cấp gói
              </button>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div>
          <h3 className="font-bold text-gray-800 text-base mb-3 ml-1" style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '1rem', marginBottom: '12px', marginLeft: '4px' }}>Hệ thống</h3>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f9fafb', backgroundColor: 'transparent', border: 'none' }}>
              <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mr-3" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
                  <Map size={18} />
                </div>
                <span className="font-medium text-gray-700" style={{ fontWeight: 500, color: '#374151' }}>Cài đặt dẫn đường</span>
              </div>
              <ChevronRight size={20} className="text-gray-300" style={{ color: '#d1d5db' }} />
            </button>

            <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 active:bg-gray-50 transition-colors" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f9fafb', backgroundColor: 'transparent', border: 'none' }}>
              <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mr-3" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
                  <Bell size={18} />
                </div>
                <span className="font-medium text-gray-700" style={{ fontWeight: 500, color: '#374151' }}>Thông báo</span>
              </div>
              <ChevronRight size={20} className="text-gray-300" style={{ color: '#d1d5db' }} />
            </button>

            <button className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'transparent', border: 'none' }}>
              <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center mr-3" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f3f4f6', color: '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
                  <HelpCircle size={18} />
                </div>
                <span className="font-medium text-gray-700" style={{ fontWeight: 500, color: '#374151' }}>Hỗ trợ & Góp ý</span>
              </div>
              <ChevronRight size={20} className="text-gray-300" style={{ color: '#d1d5db' }} />
            </button>

          </div>
        </div>

        <button onClick={() => logout()} className="w-full bg-red-50 text-red-500 font-bold py-4 rounded-xl flex items-center justify-center active:bg-red-100 transition-colors" style={{ width: '100%', backgroundColor: '#fef2f2', color: '#ef4444', fontWeight: 'bold', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
          <LogOut size={20} className="mr-2" style={{ marginRight: '8px' }} />
          Đăng xuất
        </button>

      </div>
    </div>
  );
}
