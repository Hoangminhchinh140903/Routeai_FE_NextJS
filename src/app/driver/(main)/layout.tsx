"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Route, ScanLine, BarChart3, Settings } from 'lucide-react';

export default function DriverMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="driver-content">
        {children}
      </div>
      <nav className="driver-bottom-nav">
        <Link href="/driver/home" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: pathname === '/driver/home' ? 'var(--color-primary)' : 'var(--color-text-muted)', textDecoration: 'none' }}>
          <Home size={24} strokeWidth={pathname === '/driver/home' ? 2.5 : 2} />
          <span style={{ fontSize: '0.65rem', marginTop: '4px', fontWeight: pathname === '/driver/home' ? 600 : 500 }}>Trang chủ</span>
        </Link>
        <Link href="/driver/routes" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: pathname?.includes('/driver/routes') ? 'var(--color-primary)' : 'var(--color-text-muted)', textDecoration: 'none' }}>
          <Route size={24} strokeWidth={pathname?.includes('/driver/routes') ? 2.5 : 2} />
          <span style={{ fontSize: '0.65rem', marginTop: '4px', fontWeight: pathname?.includes('/driver/routes') ? 600 : 500 }}>Tuyến của tôi</span>
        </Link>
        
        <div style={{ position: 'relative', top: '-15px' }}>
          <Link href="/driver/scan" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', boxShadow: '0 4px 10px rgba(47, 128, 255, 0.4)', textDecoration: 'none' }}>
            <ScanLine size={28} />
          </Link>
          <div style={{ textAlign: 'center', fontSize: '0.65rem', marginTop: '4px', color: 'var(--color-primary)', fontWeight: 600 }}>Quét đơn</div>
        </div>

        <Link href="/driver/report" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: pathname?.includes('/driver/report') ? 'var(--color-primary)' : 'var(--color-text-muted)', textDecoration: 'none' }}>
          <BarChart3 size={24} strokeWidth={pathname?.includes('/driver/report') ? 2.5 : 2} />
          <span style={{ fontSize: '0.65rem', marginTop: '4px', fontWeight: pathname?.includes('/driver/report') ? 600 : 500 }}>Báo cáo</span>
        </Link>
        <Link href="/driver/settings" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: pathname?.includes('/driver/settings') ? 'var(--color-primary)' : 'var(--color-text-muted)', textDecoration: 'none' }}>
          <Settings size={24} strokeWidth={pathname?.includes('/driver/settings') ? 2.5 : 2} />
          <span style={{ fontSize: '0.65rem', marginTop: '4px', fontWeight: pathname?.includes('/driver/settings') ? 600 : 500 }}>Cài đặt</span>
        </Link>
      </nav>
    </>
  );
}
