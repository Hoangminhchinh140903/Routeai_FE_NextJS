"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Search, ChevronRight, Plus, MapPin, Route as RouteIcon } from 'lucide-react';
import Link from 'next/link';

export default function SavedRoutesPage() {
  const router = useRouter();

  const routes = [
    { id: 1, name: 'Tuyến sáng 12/05', points: 25, distance: 120, color: 'bg-blue-500' },
    { id: 2, name: 'Tuyến chiều 11/05', points: 18, distance: 85, color: 'bg-orange-500' },
    { id: 3, name: 'Tuyến đi Gò Vấp', points: 15, distance: 68, color: 'bg-green-500' },
    { id: 4, name: 'Tuyến Megacity', points: 30, distance: 150, color: 'bg-purple-500' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white flex items-center px-4 py-4 border-b border-gray-100 sticky top-0 z-10" style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-lg font-bold text-center mr-6">Tuyến đã lưu</h1>
      </div>

      <div className="p-4" style={{ padding: '16px' }}>
        {/* Search Bar */}
        <div className="relative mb-6" style={{ position: 'relative', marginBottom: '24px' }}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, paddingLeft: '12px', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <Search size={20} className="text-gray-400" style={{ color: '#9ca3af' }} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Tìm kiếm tuyến..."
            style={{ width: '100%', paddingLeft: '40px', paddingRight: '12px', paddingTop: '12px', paddingBottom: '12px', border: '1px solid #e5e7eb', borderRadius: '12px', backgroundColor: 'white', outline: 'none' }}
          />
        </div>

        {/* Routes List */}
        <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {routes.map(route => (
            <Link key={route.id} href={`/driver/routes/${route.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center active:bg-gray-50 transition-colors text-inherit decoration-none" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center shrink-0 mr-4 ${route.color}`} style={{ width: '48px', height: '48px', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px', flexShrink: 0, backgroundColor: route.color === 'bg-blue-500' ? '#3b82f6' : route.color === 'bg-orange-500' ? '#f97316' : route.color === 'bg-green-500' ? '#22c55e' : '#a855f7' }}>
                <RouteIcon size={24} />
              </div>
              <div className="flex-1" style={{ flex: 1 }}>
                <h3 className="font-bold text-gray-800 text-base mb-1" style={{ fontWeight: 'bold', fontSize: '1rem', color: '#1f2937', margin: 0, marginBottom: '4px' }}>{route.name}</h3>
                <div className="flex items-center text-sm text-gray-500" style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
                  <MapPin size={14} className="mr-1" style={{ marginRight: '4px' }} /> {route.points} điểm giao
                  <span className="mx-2" style={{ margin: '0 8px' }}>•</span> {route.distance} km
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300 shrink-0" style={{ color: '#d1d5db', flexShrink: 0 }} />
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 left-0 right-0 max-w-[480px] mx-auto px-4 z-20 pointer-events-none" style={{ position: 'fixed', bottom: '96px', left: 0, right: 0, maxWidth: '480px', margin: '0 auto', padding: '0 16px', zIndex: 20, pointerEvents: 'none' }}>
        <button 
          onClick={() => router.push('/driver/scan')}
          className="w-full py-4 px-4 rounded-xl bg-primary text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform pointer-events-auto"
          style={{ width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 'bold', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: '0 10px 15px -3px rgba(47, 128, 255, 0.3)', pointerEvents: 'auto' }}
        >
          <Plus size={24} className="mr-2" style={{ marginRight: '8px' }} />
          Tạo tuyến mới
        </button>
      </div>
    </div>
  );
}
